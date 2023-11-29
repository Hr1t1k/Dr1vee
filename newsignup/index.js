const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.createUserDocument = functions.auth.user().onCreate((user) => {
  const root_folders={"my-drive":"My Drive",
  "shared-drives": "Shared drives" ,
  "computers": "Computers",
  "shared-with-me":  "Shared with me",
  "recent": "Recent" ,
  "starred":"Starred",
  "spam":  "Spam",
  "trash": "Trash",
}
const batch = admin.firestore().batch();
for (const [key, value] of Object.entries(root_folders)) {
    const docRef = admin.firestore().collection('Folders').doc();
    batch.set(docRef,{
      files: [],
      folders: [],
      name: value,
      owner: user.uid,
      id: key,
      path: [{id:key,name:value}],
    })
    
}
const userRef=admin.firestore().collection("users").doc(user.uid);
    batch.set(userRef,{
      id:user.uid,
      name:user.displayName
    })
return batch.commit();
  
 
});