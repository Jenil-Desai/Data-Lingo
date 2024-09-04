import { ArrowDownIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { Button, IconButton, Input } from "@material-tailwind/react";
import { useSetRecoilState } from "recoil";
import { errrorAlert } from "../../../store/atoms";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../../hooks/UseAuth";

interface InputAreaProps {
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

export default function InputArea({ chat, chatId }: InputAreaProps) {
  const setErrorAlert = useSetRecoilState(errrorAlert);
  const [message, setMessage] = useState("");
  const auth = useAuth();

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

  return (
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
      <Input type="text" placeholder="Type your message..." className="flex-1" containerProps={{ className: "w-full" }} crossOrigin={undefined} onChange={(e) => setMessage(e.target.value)} value={message} autoFocus />
      <Button variant="gradient" color="teal" className="flex items-center" placeholder={undefined} onClick={handleSubmit}>
        <PaperAirplaneIcon className="h-5 w-5 mr-2" />
        Send
      </Button>
    </div>
  );
}
