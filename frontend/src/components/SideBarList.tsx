import { UserCircleIcon, PowerIcon, ExclamationTriangleIcon, LinkIcon, HomeIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid";
import { List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { useAuth } from "../hooks/UseAuth";
import { useSetRecoilState } from "recoil";
import { errrorAlert } from "../store/atoms";

export default function SideBarList() {
  const setErrorAlert = useSetRecoilState(errrorAlert);
  const [chatList, setChatList] = useState([]);
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_REACT_BASE_URL + "/chat", {
        headers: {
          Authorization: auth.user,
        },
      })
      .then((res) => {
        setChatList(res.data.result);
      })
      .catch((error) => {
        setErrorAlert({ vis: true, msg: error.reponse.data.error });
      });
  }, []);

  function handleChatClick(chatId: number) {
    navigate(`/dashboard/chat/${chatId}`);
  }

  return (
    <List placeholder={undefined}>
      <ListItem placeholder={undefined} onClick={() => navigate("/dashboard")}>
        <ListItemPrefix placeholder={undefined}>
          <HomeIcon className="h-5 w-5" />
        </ListItemPrefix>
        Home
      </ListItem>
      <ListItem placeholder={undefined} onClick={() => navigate("connections")}>
        <ListItemPrefix placeholder={undefined}>
          <LinkIcon className="h-5 w-5" />
        </ListItemPrefix>
        Connections
      </ListItem>
      <hr className="my-2 border-blue-gray-50" />
      {chatList.length > 0 ? (
        chatList.map((chat: any) => {
          return (
            <ListItem placeholder={undefined} key={chat.id} onClick={() => handleChatClick(chat.id)}>
              <ListItemPrefix placeholder={undefined}>
                <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
              </ListItemPrefix>
              {chat.chatName}
            </ListItem>
          );
        })
      ) : (
        <ListItem placeholder={undefined} onClick={() => navigate("")}>
          <ListItemPrefix placeholder={undefined}>
            <ExclamationTriangleIcon className="h-5 w-5" />
          </ListItemPrefix>
          No Chats
        </ListItem>
      )}
      <hr className="my-2 border-blue-gray-50" />
      <ListItem placeholder={undefined} onClick={() => navigate("profile")}>
        <ListItemPrefix placeholder={undefined}>
          <UserCircleIcon className="h-5 w-5" />
        </ListItemPrefix>
        Profile
      </ListItem>
      <ListItem placeholder={undefined} onClick={() => auth?.logout()}>
        <ListItemPrefix placeholder={undefined}>
          <PowerIcon className="h-5 w-5" />
        </ListItemPrefix>
        Log Out
      </ListItem>
    </List>
  );
}
