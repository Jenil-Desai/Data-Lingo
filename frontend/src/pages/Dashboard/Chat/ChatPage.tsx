import { Card, Typography, Input, Button, Avatar, Menu, MenuHandler, MenuItem, MenuList, IconButton } from "@material-tailwind/react";
import { PaperAirplaneIcon, EllipsisHorizontalIcon, TrashIcon, PencilIcon, ArrowDownIcon } from "@heroicons/react/24/solid";
import { useNavigate, useParams } from "react-router-dom";
import React, { ReactNode, useEffect, useState } from "react";

import { useAuth } from "../../../hooks/UseAuth";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { errrorAlert } from "../../../store/atoms";
import { ErrorAlert } from "../../../components/ErrorAlert";

export default function ChatPage() {
  const [chat, setChat] = useState({ id: 0, chatName: "", dbConnection: { connectionName: "", connectionType: "" }, messages: [{ id: 0, sender: "", messageText: "", sqlQuery: "", queryResult: "", timestamp: "" }] });
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const setErrorAlert = useSetRecoilState(errrorAlert);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  let { chatId } = useParams();
  const auth = useAuth();

  useEffect(() => {
    setIsDisable(true);
    axios
      .post(
        import.meta.env.VITE_REACT_BASE_URL + "/chat/histroy",
        { chatId: (chatId as any) * 1 },
        {
          headers: {
            Authorization: auth.user,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setChat(res.data);
        console.log(res.data);
      })
      .catch((error) => setErrorAlert({ vis: true, msg: error.response.data.error }))
      .finally(() => setIsDisable(false));
  }, [chatId]);

  useEffect(() => {
    if (chat.messages.length > 0) {
      const latestMessage = chat.messages[chat.messages.length - 1];
      const messageContainer = document.getElementById(`message-${latestMessage.id}`);
      if (messageContainer) {
        messageContainer.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [chat.messages]);

  function handleSubmit() {
    if (message.length < 5) {
      return setErrorAlert({ vis: true, msg: "Message Length Less than 5 isn't allowed" });
    }

    axios
      .post(
        import.meta.env.VITE_REACT_BASE_URL + "/message",
        {
          chatId: (chatId as any) * 1,
          messageText: message,
        },
        {
          headers: {
            Authorization: auth.user,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        window.location.reload();
        setMessage("");
      })
      .catch((error) => {
        setErrorAlert({ vis: true, msg: error.response.data.error });
      });
  }

  const formatTimestamp = (timestamp: string) => {
    const dateObject = new Date(timestamp);
    let hour = dateObject.getHours();
    const minute = dateObject.getMinutes();
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    hour = hour ? hour : 12; // 12 hour format
    return `${dateObject.toLocaleDateString()} ${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
  };

  const profileMenuItems = [
    {
      label: "Edit Chat",
      icon: PencilIcon,
      action: () => navigate("/contact-us"),
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
            console.log(res);
            navigate("/dashboard");
          })
          .catch((error) => setErrorAlert({ vis: true, msg: error.response.data.error }));
      },
    },
  ];
  return (
    <div className="w-full h-full mt-4 md:mt-0 flex flex-col">
      <ErrorAlert />
      <div className="h-full flex flex-col border border-blue-gray-100 rounded-xl">
        <div className="flex items-center justify-between p-4 bg-blue-gray-50 rounded-xl">
          <div className="flex items-center">
            <Avatar size="lg" src="https://via.placeholder.com/150" alt="User Avatar" variant="circular" className="mr-4" placeholder={undefined} />
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
                    {React.createElement(icon, {
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

        {/* Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-br from-gray-100 to-gray-200">
          {chat.messages.map((msg) => {
            return msg.sender == "user" ? (
              <div className="mb-4 flex justify-end items-end" id={`message-${msg.id}`}>
                <div className="mr-2">
                  <Card className="bg-[#bee9e8] text-black p-3 max-w-xs md:max-w-md rounded-br-none shadow-md" placeholder={undefined}>
                    <Typography variant="small" placeholder={undefined}>
                      {msg.messageText}
                    </Typography>
                    <Typography variant="small" color="black" className="mt-1" placeholder={undefined}>
                      {formatTimestamp(msg.timestamp)}
                    </Typography>
                  </Card>
                </div>
                <Avatar size="sm" src="https://via.placeholder.com/150" alt="Admin Avatar" variant="circular" placeholder={undefined} />
              </div>
            ) : (
              <div className="mb-4 flex justify-start items-end" id={`message-${msg.id}`}>
                <Avatar size="sm" src="https://via.placeholder.com/150" alt="User Avatar" variant="circular" className="mr-2" placeholder={undefined} />
                <Card className="bg-white p-3 max-w-xs md:max-w-md rounded-bl-none shadow-md" placeholder={undefined}>
                  <Typography variant="small" color="blue-gray" placeholder={undefined}>
                    {msg.sqlQuery}
                  </Typography>
                  {msg.queryResult && msg.queryResult !== "[]" && (
                    <div className="overflow-x-auto mb-2 mt-2">
                      <Card className="h-full w-full overflow-scroll border border-blue-gray-100 rounded" placeholder={undefined}>
                        <table className="w-full min-w-max table-auto text-left">
                          <thead>
                            <tr>
                              {msg.queryResult &&
                                JSON.parse(msg.queryResult).length > 0 &&
                                Object.keys(JSON.parse(msg.queryResult)[0]).map((heading, index) => (
                                  <th key={index} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70" placeholder={undefined}>
                                      {heading.charAt(0).toUpperCase() + heading.slice(1)}
                                    </Typography>
                                  </th>
                                ))}
                            </tr>
                          </thead>
                          <tbody>
                            {msg.queryResult &&
                              JSON.parse(msg.queryResult).length > 0 &&
                              JSON.parse(msg.queryResult).map((row: any, rowIndex: any) => (
                                <tr key={rowIndex} className="even:bg-blue-gray-50/50">
                                  {Object.values(row).map((value, colIndex) => (
                                    <td key={colIndex} className="p-4">
                                      <Typography variant="small" color="blue-gray" className="font-normal" placeholder={undefined}>
                                        {value as ReactNode}
                                      </Typography>
                                    </td>
                                  ))}
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </Card>
                    </div>
                  )}
                  <Typography variant="small" color="gray" className="mt-1" placeholder={undefined}>
                    {formatTimestamp(msg.timestamp)}
                  </Typography>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-blue-gray-100 flex items-center space-x-4 rounded-xl">
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => {
              const latestMessage = chat.messages[chat.messages.length - 1];
              const messageContainer = document.getElementById(`message-${latestMessage.id}`);
              if (messageContainer) {
                messageContainer.scrollIntoView({ behavior: "smooth" });
              }
            }}
            placeholder={undefined}
          >
            <ArrowDownIcon className="h-6 w-6" />
          </IconButton>
          <Input type="text" placeholder="Type your message..." className="flex-1" containerProps={{ className: "w-full" }} crossOrigin={undefined} onChange={(e) => setMessage(e.target.value)} value={message} />
          <Button variant="gradient" color="teal" className="flex items-center" placeholder={undefined} onClick={handleSubmit} disabled={isDisable}>
            <PaperAirplaneIcon className="h-5 w-5 mr-2" />
            Send
          </Button>
        </div>
        <Typography placeholder={undefined} className="text-center mt-0 p-0" variant="small" color="gray">
          Data Lingo can make mistakes. Check important info.
        </Typography>
      </div>
    </div>
  );
}
