import { useLocation } from "react-router-dom";
import { NavBar } from "./NavigationBar/NavBar";
import { Footer } from "./Footer";

interface LayoutInterface {
  children: JSX.Element;
}

const Layout = ({ children }: LayoutInterface) => {
  const location = useLocation();

  const noNavbarFooterPaths = ["/", "/pricing", "/about-us", "/contact-us", "/login", "/signup"];

  const showNavbarFooter = noNavbarFooterPaths.includes(location.pathname);

  return (
    <>
      {showNavbarFooter && <NavBar />}
      {children}
      {showNavbarFooter && <Footer />}
    </>
  );
};

export default Layout;
