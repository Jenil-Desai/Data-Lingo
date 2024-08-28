import { Route, Routes } from "react-router-dom";

import { SpeedDialBtn } from "../../components/SpeedDialBtn";
import { SideBar } from "../../components/SideBar";
import Layout from "../../components/Layout";
import NotFound from "../../components/NotFound";
import Home from "./Home/Home";
import Connections from "./Connections/Connections";

export default function Dashboard() {
  return (
    <div className="md:flex justify-start m-4 gap-4">
      <SideBar />
      <div className="flex justify-center items-start w-full max-h-[97vh] overflow-x-auto z-10" style={{ msOverflowStyle: "none", scrollbarWidth: "none", WebkitScrollbar: "none" }}>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/connections"
            element={
              <Layout>
                <Connections />
              </Layout>
            }
          />
          <Route
            path="*"
            element={
              <Layout>
                <NotFound />
              </Layout>
            }
          />
        </Routes>
      </div>
      <SpeedDialBtn className="absolute bottom-4 right-4" />
    </div>
  );
}
