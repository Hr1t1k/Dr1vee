export default async (id) => {
  var startTime = performance.now();

  const url = `https://us-central1-dr1vee.cloudfunctions.net/downloadFolder/downloadFolder/${id}`;
  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = "folder.zip";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  var endTime = performance.now();
  console.log(`Call to doSomething took ${endTime - startTime} milliseconds`);
};
