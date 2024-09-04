import { Button, Card, Menu, MenuHandler, MenuItem, MenuList, Typography } from "@material-tailwind/react";
import { createElement, useEffect, useState } from "react";
import axios from "axios";

import { useAuth } from "../../../hooks/UseAuth";
import { EllipsisHorizontalIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useSetRecoilState } from "recoil";
import { editConnectionModal, errrorAlert } from "../../../store/atoms";
import { useNavigate } from "react-router-dom";

const TABLE_HEAD = ["Name", "Type", "String", "Action"];

export default function Connections() {
  const [connections, SetConnections] = useState([{ id: 0, connectionName: "", connectionString: "", connectionType: "" }]);
  const [isMenuOpen, setIsMenuOpen] = useState<number | null>(null);
  const setErrorAlert = useSetRecoilState(errrorAlert);
  const setModal = useSetRecoilState(editConnectionModal);
  const navigate = useNavigate();
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
  }, []);

  const handleMenuToggle = (index: number) => {
    setIsMenuOpen((prev) => (prev === index ? null : index));
  };

  return (
    <div className="w-full h-auto mt-4 md:mt-0">
      <Card className="h-full w-full overflow-scroll border border-blue-gray-100 rounded-xl" placeholder={undefined}>
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70" placeholder={undefined}>
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {connections.map((connection, index) => (
              <tr key={connection.id} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal" placeholder={undefined}>
                    {connection.connectionName}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal" placeholder={undefined}>
                    {connection.connectionType}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal" placeholder={undefined}>
                    {connection.connectionString}
                  </Typography>
                </td>
                <td className="p-4">
                  <Menu open={isMenuOpen === index} handler={() => handleMenuToggle(index)} placement="bottom-start" allowHover>
                    <MenuHandler>
                      <Button variant="text" color="blue-gray" className="flex items-center rounded-full lg:ml-auto" placeholder={undefined}>
                        <EllipsisHorizontalIcon className="h-6 w-6" />
                      </Button>
                    </MenuHandler>
                    <MenuList className="p-1" placeholder={undefined}>
                      <MenuItem onClick={() => setModal(true)} className="flex items-center gap-2 rounded" placeholder={undefined}>
                        <PencilIcon className="h-4 w-4" strokeWidth={2} />
                        <Typography as="span" variant="small" className="font-normal" color="inherit" placeholder={undefined}>
                          Edit
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        onClick={async () => {
                          axios
                            .delete(import.meta.env.VITE_REACT_BASE_URL + `/database/${connection.id}`, {
                              headers: {
                                Authorization: auth.user,
                              },
                            })
                            .then(() => {
                              window.location.reload();
                              setErrorAlert({ vis: true, msg: "Connection Deleted" });
                            })
                            .catch((error) => setErrorAlert({ vis: true, msg: error.response.data.error }));
                        }}
                        className="flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                        placeholder={undefined}
                      >
                        <TrashIcon className="h-4 w-4 text-red-500" />
                        <Typography as="span" variant="small" className="font-normal" color="red" placeholder={undefined}>
                          Delete
                        </Typography>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
