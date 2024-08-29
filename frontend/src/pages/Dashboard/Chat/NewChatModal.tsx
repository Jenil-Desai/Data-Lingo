import axios from "axios";

import ModalForm from "../../../components/ModalForm";
import NewChatForm from "./NewChatForm";
import { useAuth } from "../../../hooks/UseAuth";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { errrorAlert, newChatModal, newChatName, newConnectionName } from "../../../store/atoms";

export default function NewChatModal() {
  const auth = useAuth();
  const chatName = useRecoilValue(newChatName);
  const connectionName = useRecoilValue(newConnectionName);
  const setModal = useSetRecoilState(newChatModal);
  const setErrorAlert = useSetRecoilState(errrorAlert);

  return (
    <ModalForm
      modalHeading="New Chat"
      modalSubHeading="Keep your records up-to-date and organized."
      modalBodyForm={<NewChatForm />}
      modalSubmitBtnText="Add Chat"
      modalState={newChatModal}
      modalSubmitBtnAction={function (): void {
        axios
          .post(
            import.meta.env.VITE_REACT_BASE_URL + "/chat",
            {
              chatName,
              connectionName,
            },
            {
              headers: { Authorization: auth.user, "Content-Type": "application/json" },
            }
          )
          .then(() => setModal(false))
          .catch((error) => {
            setModal(false);
            setErrorAlert({ vis: true, msg: error.response.data.error });
          });
      }}
    />
  );
}
