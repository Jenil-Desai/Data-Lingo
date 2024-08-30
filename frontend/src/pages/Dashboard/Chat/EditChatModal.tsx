import axios from "axios";
import ModalForm from "../../../components/ModalForm";
import EditChatForm from "./EditChatForm";
import { useAuth } from "../../../hooks/UseAuth";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { editChatModal, emojiCode, errrorAlert, newChatName } from "../../../store/atoms";
import { useParams } from "react-router-dom";

interface EditChatModalProps {
  CurrentChat: any;
}

export default function EditChatModal({ CurrentChat }: EditChatModalProps) {
  const auth = useAuth();
  const chatName = useRecoilValue(newChatName);
  const setModal = useSetRecoilState(editChatModal);
  const emoji = useRecoilValue(emojiCode);
  const setErrorAlert = useSetRecoilState(errrorAlert);
  const { chatId } = useParams();

  return (
    <ModalForm
      modalHeading={"Edit Chat"}
      modalSubHeading={"Keep your records up-to-date and organized."}
      modalBodyForm={<EditChatForm />}
      modalSubmitBtnText={"Save Changes"}
      modalSubmitBtnAction={function (): void {
        const payload: { chatId: number; chatName?: string; chatEmoji?: string } = {
          chatId: (chatId as any) * 1,
        };

        if (chatName && chatName !== CurrentChat.chatName) {
          payload.chatName = chatName;
        }

        if (emoji && emoji !== CurrentChat.chatEmoji) {
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
          .catch((error) => setErrorAlert({ vis: true, msg: error.response.data.error }));
      }}
      modalState={editChatModal}
    />
  );
}
