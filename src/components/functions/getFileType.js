export default (name) => {
  console.log(name);
  const fileExtension = name.split(".").pop().toLowerCase();

  switch (fileExtension) {
    case "jpg":
    case "jpeg":
    case "png":
      return {
        type: "img",
        url: "https://drive-thirdparty.googleusercontent.com/32/type/image/jpeg",
        fileExtension: fileExtension,
      };
      break;
    case "mp4":
    case "avi":
    case "mov":
      return {
        type: "vid",
        url: "https://drive-thirdparty.googleusercontent.com/32/type/video/mp4",
        fileExtension: fileExtension,
      };
      break;
    case "doc":
    case "docx":
      return {
        type: "application/doc",
        url: "https://drive-thirdparty.googleusercontent.com/32/type/application/vnd.google-apps.document",
        fileExtension: fileExtension,
      };
      break;
    case "pdf":
      return {
        type: "application/pdf",
        url: "https://drive-thirdparty.googleusercontent.com/32/type/application/pdf",
        fileExtension: fileExtension,
      };
      break;
    case "xls":
    case "xlsx":
      return {
        type: "excel",
        url: "https://drive-thirdparty.googleusercontent.com/32/type/application/vnd.google-apps.spreadsheet",
        fileExtension: fileExtension,
      };
      break;
    case "ppt":
    case "pptx":
      return {
        type: "ppt",
        url: "https://drive-thirdparty.googleusercontent.com/32/type/application/vnd.google-apps.presentation",
        fileExtension: fileExtension,
      };
      break;
    default:
      return { type: "other", fileExtension: fileExtension };
  }
};
