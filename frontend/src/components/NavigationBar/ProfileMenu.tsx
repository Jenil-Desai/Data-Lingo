import { ChevronDownIcon, LifebuoyIcon, PowerIcon, UserCircleIcon, WindowIcon } from "@heroicons/react/24/solid";
import { Menu, MenuHandler, Button, Avatar, MenuList, MenuItem, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { createElement, useEffect, useState } from "react";

import { useAuth } from "../../hooks/UseAuth";
import axios from "axios";
import { Emoji } from "emoji-picker-react";

interface ProfileMenuPropInterface {
  className: string;
  placement: any;
}

export default function ProfileMenu({ className, placement }: ProfileMenuPropInterface) {
  const [userData, setUserData] = useState({ fname: "", lname: "", username: "", email: "", profileEmjoi: "" });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_REACT_BASE_URL + "/user", {
        headers: { Authorization: auth.user },
      })
      .then((res) => {
        setUserData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const profileMenuItems = [
    {
      label: "Dashboard",
      icon: WindowIcon,
      action: () => navigate("/dashboard"),
    },
    {
      label: "My Profile",
      icon: UserCircleIcon,
      action: () => navigate("/dashboard/profile"),
    },
    {
      label: "Help",
      icon: LifebuoyIcon,
      action: () => navigate("/contact-us"),
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
      action: async () => {
        await auth?.logout();
        setIsMenuOpen(false);
      },
    },
  ];

  return (
    <div className={className}>
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement={placement} allowHover>
        <MenuHandler>
          <Button variant="text" color="blue-gray" className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto" placeholder={undefined}>
            <Emoji unified={userData.profileEmjoi} size={30} />
            <ChevronDownIcon strokeWidth={2.5} className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""}`} />
          </Button>
        </MenuHandler>
        <MenuList className="p-1" placeholder={undefined}>
          {profileMenuItems.map(({ label, icon, action }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <MenuItem key={label} onClick={action} className={`flex items-center gap-2 rounded ${isLastItem ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10" : ""}`} placeholder={undefined}>
                {createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}
                <Typography as="span" variant="small" className="font-normal" color={isLastItem ? "red" : "inherit"} placeholder={undefined}>
                  {label}
                </Typography>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </div>
  );
}
