import { EllipsisHorizontalIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Button, Menu, MenuHandler, MenuList, MenuItem, Typography } from "@material-tailwind/react";
import { Emoji } from "emoji-picker-react";
import { createElement, useState } from "react";
import { useSetRecoilState } from "recoil";
import { editChatModal, errrorAlert } from "../../../store/atoms";
import axios from "axios";
import { useAuth } from "../../../hooks/UseAuth";
import { useNavigate } from "react-router-dom";

interface chatHeaderProps {
  chat: {
    id: number;
    chatEmoji: string;
    chatName: string;
    dbConnection: {
      connectionName: string;
      connectionType: string;
    };
    messages: {
      id: number;
      sender: string;
      messageText: string;
      sqlQuery: string;
      queryResult: string;
      timestamp: string;
    }[];
  };
  chatId: string | undefined;
}

export default function ChatHeader({ chat, chatId }: chatHeaderProps) {
  const setErrorAlert = useSetRecoilState(errrorAlert);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const setModal = useSetRecoilState(editChatModal);
  const navigate = useNavigate();
  const auth = useAuth();

  const profileMenuItems = [
    {
      label: "Edit Chat",
      icon: PencilIcon,
      action: () => setModal(true),
    },
    {
      label: "Delete Chat",
      icon: TrashIcon,
      action: async () => {
        axios
          .delete(import.meta.env.VITE_REACT_BASE_URL + `/chat/${Number(chatId)}`, {
            headers: {
              Authorization: auth.user,
            },
          })
          .then((res) => {
            setErrorAlert({ vis: true, msg: "Chat Deleted" });
            navigate("/dashboard");
            window.location.reload();
          })
          .catch((error) => setErrorAlert({ vis: true, msg: error.response.data.error }));
      },
    },
  ];

  return (
    <div className="flex items-center justify-between p-4 bg-blue-gray-50 rounded-xl">
      <div className="flex items-center">
        <Typography variant="h1" className="mr-4" placeholder={undefined}>
          <Emoji unified={chat.chatEmoji} size={50} />
        </Typography>
        <div>
          <Typography variant="h6" color="blue-gray" placeholder={undefined}>
            {chat.chatName}
          </Typography>
          <Typography variant="small" color="green" className="font-normal" placeholder={undefined}>
            {chat.dbConnection.connectionName} | {chat.dbConnection.connectionType}
          </Typography>
        </div>
      </div>
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-start" allowHover>
        <MenuHandler>
          <Button variant="text" color="blue-gray" className="flex items-center rounded-full lg:ml-auto" placeholder={undefined}>
            <EllipsisHorizontalIcon className="h-6 w-6" />
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
