import "./App.css";
import HeaderDrive from "./components/HeaderDrive";
import Sidebar from "./components/Sidebar";
import ThemeToggler from "./components/ThemeToggler";

function App() {
  return (
    <div className="p-0 body">
      <HeaderDrive />
      <div className="d-inline-flex">
        <Sidebar />
        <div
          className="bg-dark rounded-4 content"
          style={{
            width: "calc(100vw - 270px)",
            height: "calc(100vh - 72.6px)",
          }}
        ></div>
      </div>
    </div>
  );
}

export default App;
