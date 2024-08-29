import { useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios";

import { errrorAlert, newConnectionModal, newConnectionName, newConnectionString, newConnectionType } from "../../../store/atoms";
import NewConnectionForm from "./NewConnectionForm";
import { useAuth } from "../../../hooks/UseAuth";
import ModalForm from "../../../components/ModalForm";

export default function NewConnectionModal() {
  const auth = useAuth();
  const connectionName = useRecoilValue(newConnectionName);
  const connectionType = useRecoilValue(newConnectionType);
  const connectionString = useRecoilValue(newConnectionString);
  const setModal = useSetRecoilState(newConnectionModal);
  const setErrorAlert = useSetRecoilState(errrorAlert);

  return (
    <ModalForm
      modalHeading="New Connection"
      modalSubHeading="Keep your records up-to-date and organized."
      modalBodyForm={<NewConnectionForm />}
      modalSubmitBtnText="Add Connection"
      modalState={newConnectionModal}
      modalSubmitBtnAction={function (): void {
        axios
          .post(
            import.meta.env.VITE_REACT_BASE_URL + "/database",
            { connectionName, connectionString, connectionType },
            {
              headers: { Authorization: auth.user, "Content-Type": "application/json" },
            }
          )
          .then(() => setModal(false))
          .catch((error: any) => {
            setModal(false);
            setErrorAlert({ vis: true, msg: error.response.data.error });
          });
      }}
    />
  );
}
