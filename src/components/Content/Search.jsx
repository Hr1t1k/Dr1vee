import algoliasearch from "algoliasearch/lite";
import auth from "../../../firebasecofig";
const client = algoliasearch("LWBUR1VPEF", "c7d4d0ac141a7733a525f1db6827eeb9");
export default ({ setFolder, setFile, searchParam }) => {
  const index = client.initIndex("Folders");
  index
    .search(searchParam, {
      filters: `owner:${auth.currentUser.uid} `,
    })
    .then(({ hits }) => {
      setFolder(hits);
    });
  const fileIndex = client.initIndex("Files");
  fileIndex
    .search(searchParam, {
      filters: `owner:${auth.currentUser.uid} `,
    })
    .then(({ hits }) => {
      setFile(hits);
    });
};
