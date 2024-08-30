import { Typography, Select, Input, Option } from "@material-tailwind/react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { errrorAlert, newConnectionModal, newConnectionName, newConnectionString, newConnectionType } from "../../../store/atoms";
import axios from "axios";
import { useAuth } from "../../../hooks/UseAuth";

export default function NewConnectionForm() {
  const [connectionName, setConnectionName] = useRecoilState(newConnectionName);
  const [connectionType, setConnectionType] = useRecoilState(newConnectionType);
  const [connectionString, setConnectionString] = useRecoilState(newConnectionString);
  const setModal = useSetRecoilState(newConnectionModal);
  const setErrorAlert = useSetRecoilState(errrorAlert);
  const auth = useAuth();

  function handleSubmit() {
    axios
      .post(
        import.meta.env.VITE_REACT_BASE_URL,
        {
          connectionName,
          connectionType,
          connectionString,
        },
        {
          headers: {
            Authorization: auth.user,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        setModal(false);
        window.location.reload();
        setErrorAlert({ vis: true, msg: "Connection Created" });
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
            Connection Name
          </Typography>
          <Input
            color="gray"
            size="lg"
            placeholder="eg. White Shoes"
            name="name"
            className="placeholder:opacity-100 focus:!border-t-gray-900"
            containerProps={{
              className: "!min-w-full",
            }}
            labelProps={{
              className: "hidden",
            }}
            crossOrigin={undefined}
            onChange={(e) => setConnectionName(e.target.value)}
          />
        </div>
        <div>
          <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium" placeholder={undefined}>
            Database Type
          </Typography>
          <Select
            className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
            placeholder="1"
            labelProps={{
              className: "hidden",
            }}
            onChange={(value) => setConnectionType(value as string)}
          >
            <Option value="mysql">MySQL</Option>
            <Option value="postgres">PostgreSQL</Option>
            <Option value="oracle">Oracle</Option>
          </Select>
        </div>
        <div>
          <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium" placeholder={undefined}>
            Database Connection String
          </Typography>
          <Input
            color="gray"
            size="lg"
            placeholder="mysql://username:password@127.0.0.1:3306/database"
            name="ConnectionString"
            className="placeholder:opacity-100 focus:!border-t-gray-900"
            containerProps={{
              className: "!min-w-full",
            }}
            labelProps={{
              className: "hidden",
            }}
            crossOrigin={undefined}
            onChange={(e) => setConnectionString(e.target.value)}
          />
        </div>
      </form>
    </>
  );
}
