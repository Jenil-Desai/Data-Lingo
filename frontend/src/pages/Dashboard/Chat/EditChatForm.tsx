import { Typography, Input } from "@material-tailwind/react";
import axios from "axios";
import { useAuth } from "../../../hooks/UseAuth";
import { useRecoilState, useSetRecoilState } from "recoil";
import { editChatModal, emojiCode, errrorAlert, newChatName } from "../../../store/atoms";
import EmojiPicker from "emoji-picker-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EditChatForm() {
  const [chat, setChat] = useState({ id: 0, chatEmoji: "", chatName: "", dbConnection: { connectionName: "", connectionType: "" }, messages: [{ id: 0, sender: "", messageText: "", sqlQuery: "", queryResult: "", timestamp: "" }] });
  const [chatName, setChatName] = useRecoilState(newChatName);
  const setErrorAlert = useSetRecoilState(errrorAlert);
  const [emoji, setEmoji] = useRecoilState(emojiCode);
  const setModal = useSetRecoilState(editChatModal);
  const auth = useAuth();
  let { chatId } = useParams();

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload: { chatId: number; chatName?: string; chatEmoji?: string } = {
      chatId: (chatId as any) * 1,
    };

    if (chatName && chatName !== chat.chatName) {
      payload.chatName = chatName;
    }

    if (emoji && emoji !== chat.chatEmoji) {
      payload.chatEmoji = emoji;
    }

    axios
      .patch(import.meta.env.VITE_REACT_BASE_URL + "/chat", payload, {
        headers: {
          Authorization: auth.user,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setModal(false);
        window.location.reload();
        setErrorAlert({ vis: true, msg: "Chat Edited" });
      })
      .catch((error) => {
        setErrorAlert({ vis: true, msg: error.response.data.error });
        setModal(false);
      });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium" placeholder={undefined}>
            Chat Name
          </Typography>
          <Input
            color="gray"
            size="lg"
            placeholder="eg. White Shoes"
            name="chatName"
            className="placeholder:opacity-100 focus:!border-t-gray-900"
            containerProps={{
              className: "!min-w-full",
            }}
            labelProps={{
              className: "hidden",
            }}
            crossOrigin={undefined}
            onChange={(e) => setChatName(e.target.value)}
            defaultValue={chat.chatName}
          />
        </div>
        <div className="mb-2 mt-2">
          <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium" placeholder={undefined}>
            Select Chat Emoji
          </Typography>
          <EmojiPicker
            emojiStyle="apple"
            skinTonePickerLocation="PREVIEW"
            reactionsDefaultOpen={true}
            defaultEmoji={chat.chatEmoji}
            height={500}
            className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
            onReactionClick={(emoji) => {
              if (emoji && emoji.unified) {
                console.log(typeof emoji.unified);
                setEmoji(emoji.unified);
              }
            }}
            onEmojiClick={(emoji) => {
              if (emoji && emoji.unified) {
                console.log(typeof emoji.unified);
                setEmoji(emoji.unified);
              }
            }}
          />
        </div>
      </form>
    </>
  );
}
