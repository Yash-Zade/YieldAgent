import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";

import AboutPage from "@/pages/about";
import PoolPage from "./pages/pool";
import VaultPage from "./pages/vault";
import Navbar from "./components/navbar";
import AdminPage from "./pages/admin";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<IndexPage />} path="/" />
        <Route element={<DocsPage />} path="/docs" />
        <Route element={<PoolPage />} path="/pools" />
        <Route element={<VaultPage />} path="/vault" />
        <Route element={<AboutPage />} path="/about" />
        <Route element={<AdminPage />} path="/admin" />
      </Routes>
    </>
  );
}

export default App;
