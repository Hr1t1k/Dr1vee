import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits, Highlight } from "react-instantsearch";
import CustomSearchBox from "./CustomeSearchBox";
import { useState } from "react";

const searchClient = algoliasearch(
  "LWBUR1VPEF",
  "c7d4d0ac141a7733a525f1db6827eeb9"
);

function Hit({ hit }) {
  return hit.name;
}

export default () => {
  const [focused, setFocused] = useState(false);
  return (
    <div
      className="search-bar d-flex w-100 h-5 input-group input-group-lg "
      style={{ maxWidth: "680px", position: "relative" }}
    >
      <InstantSearch searchClient={searchClient} indexName="Folders">
        <CustomSearchBox focused={focused} setFocused={setFocused} />
        <div
          className={`search-results overflow-y-auto z-3 mx-2 shadow-sm rounded-bottom-5 w-88 ${
            !focused && "d-none"
          }`}
          style={{
            position: "absolute",
            top: "87%",
            left: "0",
            right: "0",
            backgroundColor: "#fff",
            borderTop: "1px solid gray",
            borderBottom: "none",
            maxHeight: "300px",
          }}
        >
          {/* <Hits hitComponent={Hit} /> */}
          <Hits
            hitComponent={({ hit, sendEvent }) => (
              <div
                className="search-items d-flex  align-items-center"
                style={{ height: "40px" }}
                onClick={() => sendEvent("click", hit, "Product Clicked")}
              >
                {/* <h2>{hit && hit.name && <Highlight hit={hit} />}</h2> */}
                <svg
                  height="24px"
                  width="24px"
                  focusable="false"
                  viewBox="0 0 24 24"
                  fill="#5f6368"
                  className=" m-3 mx-2 m-md-3    p-0 "
                  style={{ flexShrink: 0 }}
                >
                  <g>
                    <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path>
                    <path d="M0 0h24v24H0z" fill="none"></path>
                  </g>
                </svg>
                <p className="">{hit.name}</p>
              </div>
            )}
          />
          ;
        </div>
      </InstantSearch>
    </div>
  );
};
