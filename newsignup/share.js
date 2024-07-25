const admin = require("firebase-admin");
const db = admin.firestore();

const shareFolder = async (folderId, userEmailAdded, userEmailRemoved) => {
  const batch = db.batch();

  const shareRecursively = async (folderId) => {
    const folderRef = db.collection("Folders").doc(folderId);
    const folderDoc = await folderRef.get();
    let sharedWith = folderDoc.data().sharedWith || [];
    sharedWith = Array.from(new Set([...sharedWith, ...userEmailAdded]));
    sharedWith = sharedWith.filter(
      (email) => !userEmailRemoved.includes(email)
    );
    batch.update(folderRef, { sharedWith });

    const childFoldersSnapshot = await db
      .collection("Folders")
      .where("parent", "==", folderId)
      .get();
    const childFilesSnapshot = await db
      .collection("Files")
      .where("parent", "==", folderId)
      .get();
    if (!childFoldersSnapshot.empty) {
      const childFolderPromises = childFoldersSnapshot.docs.map(
        (childFolder) => {
          return shareRecursively(childFolder.id);
        }
      );
      await Promise.all(childFolderPromises);
    }

    if (!childFilesSnapshot.empty) {
      const childFilePromises = childFilesSnapshot.docs.map(
        async (childFile) => {
          const fileRef = db.collection("Files").doc(childFile.id);
          const fileDoc = await fileRef.get();
          let sharedWith = fileDoc.data().sharedWith || [];
          sharedWith = Array.from(new Set([...sharedWith, ...userEmails]));
          batch.update(fileRef, { sharedWith });
        }
      );
      await Promise.all(childFilePromises);
    }
  };

  await shareRecursively(folderId);
  await batch.commit();
};

module.exports = { shareFolder};
