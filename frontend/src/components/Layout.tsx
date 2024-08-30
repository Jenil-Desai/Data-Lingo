import { useLocation } from "react-router-dom";
import { NavBar } from "./NavigationBar/NavBar";
import { Footer } from "./Footer";

interface LayoutInterface {
  children: JSX.Element;
}

const Layout = ({ children }: LayoutInterface) => {
  const location = useLocation();

  const noNavbarFooterPaths = ["/", "/features", "/pricing", "/about-us", "/contact-us", "/login", "/signup"];

  const showNavbarFooter = noNavbarFooterPaths.includes(location.pathname.toLowerCase());

  return (
    <>
      {showNavbarFooter && <NavBar />}
      {children}
      {showNavbarFooter && <Footer />}
    </>
  );
};

export default Layout;
