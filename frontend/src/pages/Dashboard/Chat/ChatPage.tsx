import { Typography } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAuth } from "../../../hooks/UseAuth";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { ErrorAlert } from "../../../components/ErrorAlert";
import EditChatModal from "./EditChatModal";
import ChatHeader from "./ChatHeader";
import InputArea from "./InputArea";
import MessageArea from "./MessageArea";
import { errrorAlert } from "../../../store/atoms";

export default function ChatPage() {
  const [chat, setChat] = useState({ id: 0, chatEmoji: "", chatName: "", dbConnection: { connectionName: "", connectionType: "" }, messages: [{ id: 0, sender: "", messageText: "", sqlQuery: "", queryResult: "", timestamp: "" }] });
  const setErrorAlert = useSetRecoilState(errrorAlert);
  let { chatId } = useParams();
  const auth = useAuth();

  useEffect(() => {
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
      .catch((error) => setErrorAlert({ vis: true, msg: error.response.data.error }));
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

  return (
    <div className="w-full h-full mt-4 md:mt-0 flex flex-col">
      <ErrorAlert />
      <div className="h-full flex flex-col border border-blue-gray-100 rounded-xl">
        <ChatHeader chat={chat} chatId={chatId} />
        <MessageArea chat={chat} />
        <InputArea chat={chat} chatId={chatId} />
        <Typography placeholder={undefined} className="text-center mt-0 p-0" variant="small" color="gray">
          Data Lingo can make mistakes. Check important info.
        </Typography>
      </div>
      <EditChatModal CurrentChat={chat} />
    </div>
  );
}
