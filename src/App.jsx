import HeaderDrive from "./components/HeaderDrive";
import Sidebar from "./components/Sidebar";
import "./App.css";
import Content from "./components/Content";
function App() {
  return (
    <div className="p-0 body">
      <HeaderDrive />
      <div className="d-inline-flex w-100">
        <Sidebar />
        <Content />
      </div>
    </div>
  );
}

export default App;
