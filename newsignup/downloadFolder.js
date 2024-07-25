const functions = require("firebase-functions/v2");
const admin = require("firebase-admin");
const archiver = require("archiver");
const express = require("express");
const { getStorage, getStream } = require("firebase-admin/storage");
const db = admin.firestore();
const {
  log,
  info,
  debug,
  warn,
  error,
  write,
} = require("firebase-functions/logger");
const { ref } = require("firebase/storage");
const cors = require("cors");
const app = express();
const storage = getStorage();
app.use(cors());

// Function to recursively get folder contents
const getFolderContents = async (folderId, currentPath = "app") => {
  const folderContents = { files: [], folders: [] };

  // Get files in the folder
  const filesSnapshot = await db
    .collection("Files")
    .where("parent", "==", folderId)
    .get();
  filesSnapshot.forEach((doc) => {
    const file = doc.data();
    folderContents.files.push({ ...file, path: currentPath + "/" + file.name });
  });

  // Get subfolders in the folder
  const foldersSnapshot = await db
    .collection("Folders")
    .where("parent", "==", folderId)
    .get();
  for (const doc of foldersSnapshot.docs) {
    const subfolder = doc.data();
    const subfolderPath = currentPath + "/" + subfolder.name;
    folderContents.folders.push(subfolder);

    // Recursively get the contents of the subfolder
    const subfolderContents = await getFolderContents(
      subfolder.id,
      subfolderPath
    );
    folderContents.files.push(...subfolderContents.files);
    folderContents.folders.push(...subfolderContents.folders);
  }

  return folderContents;
};

// Cloud Function to download a folder as a ZIP
app.get("/downloadFolder/:folderId", async (req, res) => {
  const folderId = req.params.folderId;

  try {
    const folder = await db.collection("Folders").doc(folderId).get();
    if (!folder.exists) throw new Error("Folder does not exist.");
    const folderContents = await getFolderContents(
      folderId,
      folder.data().name
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${folder.data().name}.zip`
    );
    res.setHeader("Content-Type", "application/zip");

    const archive = archiver("zip", {
      zlib: { level: 9 },
    });

    archive.on("error", (err) => {
      throw err;
    });

    archive.pipe(res);

    // Download files and append to archive
    for (const file of folderContents.files) {
      const fileRef = getStorage().bucket().file(file.filePath);
      const fileStream = fileRef.createReadStream();
      archive.append(fileStream, { name: file.path });
    }

    await archive.finalize();
  } catch (err) {
    console.error("Error creating ZIP:", err);
    error(err);
    res.status(500).send("Error creating ZIP");
  }
});

module.exports = app;
