import { Outlet } from "react-router";
import Header from "./layout/header";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
