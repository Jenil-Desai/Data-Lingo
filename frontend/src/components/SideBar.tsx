import React from "react";
import { Card, Typography, Drawer, IconButton, Navbar } from "@material-tailwind/react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

import SideBarCTA from "./SideBarCTA";
import SideBarList from "./SideBarList";

export function SideBar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      {/* Hamburger Icon for small screens */}
      <Navbar className="md:hidden flex justify-between p-4 mx-auto max-w-screen-2xl items-center border border-blue-gray-100 rounded-xl" placeholder={undefined}>
        <Link to="/">
          <Typography as="a" href="#" variant="h6" className="mr-4 cursor-pointer py-1.5 lg:ml-2 text-blue-gray-900" placeholder={undefined}>
            Data Lingo
          </Typography>
        </Link>
        <IconButton onClick={toggleDrawer} placeholder={undefined}>
          <Bars3Icon className="h-6 w-6" />
        </IconButton>
      </Navbar>

      {/* Drawer for small screens */}
      <Drawer open={drawerOpen} onClose={toggleDrawer} className="p-4 md:hidden" placement="left" placeholder={undefined}>
        <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5" placeholder={undefined}>
          <div className="mb-2 p-4">
            <Typography variant="h5" color="blue-gray" placeholder={undefined}>
              Data Lingo
            </Typography>
            <SideBarList />
          </div>
        </Card>
      </Drawer>

      {/* Sidebar for larger screens */}
      <div className="hidden md:block border border-blue-gray-100 rounded-xl h-full">
        <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5" placeholder={undefined}>
          <div className="mb-2 p-4 text-center">
            <Typography variant="h5" color="blue-gray" placeholder={undefined}>
              Data Lingo
            </Typography>
          </div>
          <SideBarList />
          <SideBarCTA heading="Upgrade to PRO" descp="Upgrade to Data Lingo PRO and get even more advanced features and premium." />
        </Card>
      </div>
    </>
  );
}
