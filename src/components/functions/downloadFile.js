import { getStorage, ref } from "firebase/storage";
const downloadFile = async (file) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = "blob";
  xhr.onload = (event) => {
    const blob = xhr.response;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = file.name;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  xhr.open("GET", file.downloadURL);
  xhr.send();
  console.log(file.downloadURL);
};
export { downloadFile };
