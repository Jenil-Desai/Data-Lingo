import { Typography, Select, Input, Option } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/UseAuth";
import { useRecoilState, useSetRecoilState } from "recoil";
import { emojiCode, errrorAlert, newChatModal, newChatName, newConnectionName } from "../../../store/atoms";
import EmojiPicker from "emoji-picker-react";

export default function NewChatForm() {
  const [databaseConnectionList, setDatabaseConnectionList] = useState([{ id: 0, connectionName: "", connectionString: "", connectionType: "" }]);
  const [chatName, setChatName] = useRecoilState(newChatName);
  const [connectionName, setConnectionName] = useRecoilState(newConnectionName);
  const [emoji, setEmoji] = useRecoilState(emojiCode);
  const setModal = useSetRecoilState(newChatModal);
  const setErrorAlert = useSetRecoilState(errrorAlert);
  const auth = useAuth();

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_REACT_BASE_URL + "/database", {
        headers: {
          Authorization: auth.user,
        },
      })
      .then((res) => {
        setDatabaseConnectionList(res.data.result);
      })
      .catch((error) => console.log(error));
  }, []);

  function handleSubmit() {
    axios
      .post(
        import.meta.env.VITE_REACT_BASE_URL + "/chat",
        {
          chatName,
          connectionName,
          chatEmoji: emoji,
        },
        {
          headers: {
            Authorization: auth.user,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setModal(false);
        window.location.reload();
        setErrorAlert({ vis: true, msg: "Chat Created" });
      })
      .catch((error) => {
        setModal(false);
        setErrorAlert({ vis: true, msg: error.response.data.error });
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
        <div>
          <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium" placeholder={undefined}>
            Database Connection
          </Typography>
          <Select
            className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
            placeholder="0"
            labelProps={{
              className: "hidden",
            }}
            onChange={(value) => setConnectionName(value as string)}
          >
            {databaseConnectionList.map((connection) => {
              return (
                <Option value={connection.connectionName} key={connection.id}>
                  {connection.connectionName}
                </Option>
              );
            })}
          </Select>
        </div>
      </form>
    </>
  );
}
