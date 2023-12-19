export default (file) => {
  const fileExtension = file.name.split(".").pop().toLowerCase();

  switch (fileExtension) {
    case "jpg":
    case "jpeg":
    case "png":
      return {
        type: "img",
        url: "https://drive-thirdparty.googleusercontent.com/32/type/image/jpeg",
      };
      break;
    case "mp4":
    case "avi":
    case "mov":
      return {
        type: "vid",
        url: "https://drive-thirdparty.googleusercontent.com/32/type/video/mp4",
      };
      break;
    case "doc":
    case "docx":
      return {
        type: "application/doc",
        url: "https://drive-thirdparty.googleusercontent.com/32/type/application/vnd.google-apps.document",
      };
      break;
    case "pdf":
      return {
        type: "application/pdf",
        url: "https://drive-thirdparty.googleusercontent.com/32/type/application/pdf",
      };
      break;
    case "xls":
    case "xlsx":
      return {
        type: "excel",
        url: "https://drive-thirdparty.googleusercontent.com/32/type/application/vnd.google-apps.spreadsheet",
      };
      break;
    case "ppt":
    case "pptx":
      return {
        type: "ppt",
        url: "https://drive-thirdparty.googleusercontent.com/32/type/application/vnd.google-apps.presentation",
      };
      break;
    default:
      return "other";
  }
};
