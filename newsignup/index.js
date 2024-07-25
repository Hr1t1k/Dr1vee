const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { v4 } = require("uuid");
const {
  onDocumentUpdated,
  onDocumentDeleted,
} = require("firebase-functions/v2/firestore");
const { onRequest } = require("firebase-functions/v2/https");

const Counter = require("./distributed_counter");
const { deleteObject, ref } = require("firebase/storage");
const { storage } = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.createUserDocument = functions.auth.user().onCreate((user) => {
  const root_folders = {
    "my-drive": "My Drive",
    "shared-drives": "Shared drives",
    computers: "Computers",
    "shared-with-me": "Shared with me",
  };

  const batch = admin.firestore().batch();
  for (const [key, value] of Object.entries(root_folders)) {
    var id = v4();
    const docRef = admin.firestore().collection("Folders").doc(id);
    batch.set(docRef, {
      name: value,
      parent: null,
      owner: user.uid,
      id: key,
      path: [{ id: id, name: value }],
    });
  }
  const userRef = admin.firestore().collection("users").doc(user.uid);
  batch.set(userRef, {
    id: user.uid,
    name: user.displayName,
  });
  return batch.commit();
});

exports.addToTrashFolder = onDocumentUpdated(
  "Folders/{folderId}",
  async (event) => {
    const newValue = event.data.after.data();
    const batch = db.batch();
    const folderId = event.params.folderId;
    if (newValue.deleted) {
      const folderRef = db.collection("Folders");
      const folderSnapshot = await folderRef
        .where("parent", "==", folderId)
        .where("deleted", "==", false)
        .get();

      folderSnapshot.forEach((doc) => {
        const ref = folderRef.doc(doc.id);
        batch.update(ref, {
          deleted: true,
          rootDeleted: false,
          starred: false,
        });
      });
      const fileRef = db.collection("Files");
      const fileSnapshot = await fileRef
        .where("parent", "==", folderId)
        .where("deleted", "==", false)
        .get();

      fileSnapshot.forEach((doc) => {
        const ref = fileRef.doc(doc.id);
        batch.update(ref, {
          deleted: true,
          rootDeleted: false,
          starred: false,
        });
      });
      batch.commit();
    }
  }
);

exports.restoreFolder = onDocumentUpdated(
  "Folders/{folderId}",
  async (event) => {
    const newValue = event.data.after.data();
    const oldValue = event.data.before.data();
    const batch = db.batch();
    const folderId = event.params.folderId;
    if (newValue.deleted != oldValue.deleted && newValue.deleted == false) {
      const folderRef = db.collection("Folders");
      const folderSnapshot = await folderRef
        .where("parent", "==", folderId)
        .where("rootDeleted", "==", false)
        .get();

      folderSnapshot.forEach((doc) => {
        const ref = folderRef.doc(doc.id);
        batch.update(ref, { deleted: false });
      });
      const fileRef = db.collection("Files");
      const fileSnapshot = await fileRef
        .where("parent", "==", folderId)
        .where("rootDeleted", "==", false)
        .get();

      fileSnapshot.forEach((doc) => {
        const ref = fileRef.doc(doc.id);
        batch.update(ref, { deleted: false });
      });
      batch.commit();
    }
  }
);

exports.addToTrashFile = onDocumentUpdated("Files/{fileId}", async (event) => {
  const newValue = event.data.after.data();
  const fileSize = new Counter(db.collection("users").doc(owner), "fileSize");
  if (newValue.deleted) {
    fileSize.incrementBy(newValue.filesize * -1);
  }
});

exports.restoreFile = onDocumentUpdated("Files/{fileId}", async (event) => {
  const newValue = event.data.after.data();
  const oldValue = event.data.before.data();
  const fileSize = new Counter(db.collection("users").doc(owner), "fileSize");

  if (newValue.deleted != oldValue.deleted && newValue.deleted == false) {
    fileSize.incrementBy(newValue.filesize);
  }
});

exports.deletePermFolder = onDocumentDeleted(
  "Folders/{folderId}",
  async (event) => {
    const folderId = event.params.folderId;
    const folderRef = db.collection("Folders");
    const folderSnapshot = await folderRef
      .where("parent", "==", folderId)
      .where("rootDeleted", "==", false)
      .get();

    folderSnapshot.forEach((doc) => {
      const ref = folderRef.doc(doc.id);
      batch.delete(ref);
    });
    const fileRef = db.collection("Files");
    const fileSnapshot = await fileRef
      .where("parent", "==", folderId)
      .where("rootDeleted", "==", false)
      .get();

    fileSnapshot.forEach((doc) => {
      const ref = fileRef.doc(doc.id);
      batch.delete(ref);
    });
    batch.commit();
  }
);
exports.deletePermFile = onDocumentDeleted("Files/{fileId}", async (event) => {
  const fileRef = ref(storage, event.data.data().fileRef);
  deleteObject(fileRef);
});

exports.shareFolder = onRequest({ cors: true }, async (req, res) => {
  try {
    const { folderId, userEmailAdded, userEmailRemoved } = req.body;
    await shareFolder(folderId, userEmailAdded, userEmailRemoved);
    res
      .status(200)
      .send({ success: true, message: "Folder shared successfully" });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error sharing folder",
      error: error.message,
    });
  }
});

const app = require("./downloadFolder");
const { shareFolder } = require("./share");
const { log } = require("firebase-functions/logger");
exports.downloadFolder = functions.https.onRequest(app);
