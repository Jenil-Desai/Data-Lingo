import { BrowserRouter, Route, Routes } from "react-router-dom";

import NotFound from "./components/NotFound";
import Layout from "./components/Layout";
import Home from "./pages/Home/Home";
import { AuthProvider } from "./hooks/UseAuth";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import AboutUs from "./pages/About Us/AboutUs";
import ContactUs from "./pages/Contact Us/ContactUs";
import Pricing from "./pages/Pricing/Pricing";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
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
            path="/pricing"
            element={
              <Layout>
                <Pricing />
              </Layout>
            }
          />
          <Route
            path="/about-us"
            element={
              <Layout>
                <AboutUs />
              </Layout>
            }
          />
          <Route
            path="/contact-us"
            element={
              <Layout>
                <ContactUs />
              </Layout>
            }
          />
          <Route
            path="/signup"
            element={
              <Layout>
                <SignUp />
              </Layout>
            }
          />
          <Route
            path="login"
            element={
              <Layout>
                <Login />
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
      </AuthProvider>
    </BrowserRouter>
  );
}
