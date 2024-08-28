import { Card, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/UseAuth";
import ModalForm from "../../../components/ModalForm";
import NewConnectionForm from "./NewConnectionForm";

const TABLE_HEAD = ["Name", "Type", "String", "Action"];

export default function Connections() {
  const [connections, SetConnections] = useState([{ id: 0, connectionName: "", connectionString: "", connectionType: "" }]);
  const auth = useAuth();

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_REACT_BASE_URL + "/database", {
        headers: {
          Authorization: auth.user,
        },
      })
      .then((res) => SetConnections(res.data.result))
      .catch((error) => {
        console.log(error);
      });
  }, [connections]);

  return (
    <div className="w-full h-auto mt-4 md:mt-0">
      <Card className="h-full w-full overflow-scroll border border-blue-gray-100 rounded-xl">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {connections.map((connection) => (
              <tr key={name} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {connection.connectionName}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {connection.connectionType}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {connection.connectionString}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                    Edit
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <ModalForm
        modalHeading="New Connection"
        modalSubHeading="Keep your records up-to-date and organized."
        modalBodyForm={<NewConnectionForm />}
        modalSubmitBtnText="Add Connection"
        modalSubmitBtnAction={function (): void {
          axios.post(
            import.meta.env.VITE_REACT_BASE_URL + "/database",
            {},
            {
              headers: { Authorization: auth.user, "Content-Type": "application/json" },
            }
          );
        }}
      />
    </div>
  );
}
