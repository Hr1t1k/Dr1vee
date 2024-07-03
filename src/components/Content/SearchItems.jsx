import React, { useEffect, useState } from "react";
import NoContent from "./NoContent";
import "./content.css";
import Files from "../Files/Files";
import Folder from "../Folder/Folder";
import useLayout from "../../context/LayoutContext";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  onSnapshot,
  and,
  or,
  orderBy,
} from "firebase/firestore";
import auth, { db } from "../../../firebasecofig";
import usePath from "../../context/PathContext";
import ROOT_FOLDER from "../RootFolders";
import Breadcrumb from "./Breadcrumb";
import Layout from "./Layout";

import { useHits, useInstantSearch, useSearchBox } from "react-instantsearch";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, Configure, Index } from "react-instantsearch";
import CustomHits from "./CustomHits";

const searchClient = algoliasearch(
  "LWBUR1VPEF",
  "c7d4d0ac141a7733a525f1db6827eeb9"
);

const SearchItems = () => {
  const { grid, setGrid } = useLayout();
  console.log(1);
  var data = [];
  const [done, setDone] = useState(false);
  const currentUser = auth.currentUser.uid;
  const transformItems = (items) => {
    return items.map((item) => ({
      ...item,
      label: item.name.toUpperCase(),
    }));
    function CustomHits(props) {
      const { hits, results, sendEvent } = useHits(props);
      return <Folder folder={hits} key={hits.id} grid={grid} />;
    }
  };
  return (
    <>
      <div className="py-2 px-2 px-md-0 me-md-4 d-flex justify-content-between">
        <h4>Search Results</h4>
        <Layout />
      </div>
      <div className="content-body overflow-scroll overflow-x-hidden pe-md-3 px-1 px-md-3 ">
        <InstantSearch searchClient={searchClient} indexName="Folders">
          {() => {
            console.log(2);
            const { query, refine } = useSearchBox();
            refine(params.search);
            setDone(true);
          }}
          <Configure filters={`owner:${currentUser} `} />
          <div
            className={` ${
              grid
                ? "container-fluid d-grid gap-md-3 gap-2 align-items-center content p-0 m-0"
                : ""
            }`}
          >
            <CustomHits />
          </div>
        </InstantSearch>
      </div>
    </>
  );
};

export default SearchItems;
