import React from "react";
import Search from "./Search";
import Sidebar from "../Sidebar/Sidebar";
import HeaderMinimizedRight from "./HeaderMinimizedRight";
import Profile from "./Profile";
import CompanyLogo from "./CompanyLogo";
export default () => {
  return (
    <>
      <header className="d-flex align-items-center">
        <HeaderMinimizedRight />
        <div
          className="container-fluid d-grid gap-0 align-items-center"
          style={{ gridTemplateColumns: "1fr 5fr" }}
        >
          <CompanyLogo />
          <div className="d-flex align-items-center justify-content-between">
            <Search />

            <Profile />
          </div>
        </div>
      </header>
    </>
  );
};
