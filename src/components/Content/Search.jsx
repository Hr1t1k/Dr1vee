import algoliasearch from "algoliasearch/lite";
import instantsearch from "instantsearch.js";
import { searchBox, hits } from "instantsearch.js/es/widgets";
import auth from "../../../firebasecofig";
import React from "react";
import { useParams } from "react-router-dom";
const client = algoliasearch("LWBUR1VPEF", "c7d4d0ac141a7733a525f1db6827eeb9");
export default ({ setFolder, setFile, searchParam }) => {
  const index = client.initIndex("Folders");

  index
    .search(searchParam, {
      filters: `owner:${auth.currentUser.uid} `,
    })
    .then(({ hits }) => {
      console.log(hits);
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
