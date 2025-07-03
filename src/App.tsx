import { Outlet } from "react-router";
import Header from "./layout/header";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <main className="container-fluid h-100">
        <Outlet />
      </main>
    </>
  );
}

export default App;
