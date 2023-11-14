import React from "react";
import Sidebar from "./Sidebar";
import NavbarSearch from "./NavbarSearch";
import ThemeToggler from "./ThemeToggler";
import HeaderMinimizedRight from "./HeaderMinimizedRight";
export default () => {
  return (
    <>
      <header
        className="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow"
        data-bs-theme="dark"
      >
        <a
          className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white"
          href="#"
        >
          Company nameee
        </a>
        <HeaderMinimizedRight />
        <NavbarSearch />
      </header>

      <div className="container-fluid">
        <div className="row">
          {/* <Sidebar /> */}
          {/* <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4"> */}
        </div>
      </div>
      {/* <script src="/docs/5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js@4.3.2/dist/chart.umd.js" integrity="sha384-eI7PSr3L1XLISH8JdDII5YN/njoSsxfbrkCTnJrzXt+ENP5MOVBxD+l6sEG4zoLp" crossOrigin="anonymous"></script><script src="dashboard.js"></script> */}
    </>
  );
};
