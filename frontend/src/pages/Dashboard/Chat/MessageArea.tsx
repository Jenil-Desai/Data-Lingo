import { Avatar, Card, Typography } from "@material-tailwind/react";
import { Emoji } from "emoji-picker-react";
import { useSetRecoilState } from "recoil";
import { errrorAlert } from "../../../store/atoms";
import axios from "axios";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../../../hooks/UseAuth";

interface MessageAreaProps {
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
}

export default function MessageArea({ chat }: MessageAreaProps) {
  const setErrorAlert = useSetRecoilState(errrorAlert);
  const auth = useAuth();

  const formatTimestamp = (timestamp: string) => {
    const dateObject = new Date(timestamp);
    let hour = dateObject.getHours();
    const minute = dateObject.getMinutes();
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    hour = hour ? hour : 12; // 12 hour format
    return `${dateObject.toLocaleDateString()} ${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
  };

  return (
    <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-br from-gray-100 to-gray-200">
      {chat.messages.map((msg) => {
        return msg.sender == "user" ? (
          <div className="mb-4 flex justify-end items-end" id={`message-${msg.id}`} key={msg.id}>
            <div className="mr-2">
              <Card className="bg-[#bee9e8] text-black p-3 max-w-xs md:max-w-md rounded-br-none shadow-md" placeholder={undefined}>
                <Typography variant="small" placeholder={undefined}>
                  {msg.messageText}
                </Typography>
                <Typography variant="small" color="gray" className="mt-1 flex justify-between" placeholder={undefined}>
                  {formatTimestamp(msg.timestamp)}
                  <TrashIcon
                    className="h-4 w-4 text-center p-0 opacity-90 hover:opacity-60"
                    onClick={async () => {
                      axios
                        .delete(import.meta.env.VITE_REACT_BASE_URL + `/message/${msg.id}`, {
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
                  />
                </Typography>
              </Card>
            </div>
            <Avatar size="sm" src="https://via.placeholder.com/150" alt="Admin Avatar" variant="circular" placeholder={undefined} />
          </div>
        ) : (
          <div className="mb-4 flex justify-start items-end" id={`message-${msg.id}`} key={msg.id}>
            <Typography variant="h3" className="mr-2" placeholder={undefined}>
              <Emoji unified="1f916" size={25} />
            </Typography>
            <Card className="bg-white p-3 max-w-xs md:max-w-md rounded-bl-none shadow-md" placeholder={undefined}>
              <Typography variant="small" color="blue-gray" placeholder={undefined}>
                {msg.sqlQuery}
              </Typography>
              {msg.queryResult && msg.queryResult !== "[]" && (
                <div className="overflow-x-auto mb-2 mt-2">
                  <Card className="h-full w-full overflow-scroll border border-blue-gray-100 rounded" placeholder={undefined}>
                    <table className="w-full min-w-max table-auto text-left">
                      <thead>
                        <tr>
                          {(() => {
                            try {
                              const parsedResult = JSON.parse(msg.queryResult);
                              if (parsedResult.length > 0) {
                                return Object.keys(parsedResult[0]).map((heading, index) => (
                                  <th key={index} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70" placeholder={undefined}>
                                      {heading.charAt(0).toUpperCase() + heading.slice(1)}
                                    </Typography>
                                  </th>
                                ));
                              }
                            } catch (error) {
                              console.error("Failed to parse query result:", error);
                              // setErrorAlert({ vis: true, msg: "Failed to parse query result" });
                            }
                            return null;
                          })()}
                        </tr>
                      </thead>
                      <tbody>
                        {(() => {
                          try {
                            const parsedResult = JSON.parse(msg.queryResult);
                            return parsedResult.map((row: any, rowIndex: any) => (
                              <tr key={rowIndex} className="even:bg-blue-gray-50/50">
                                {Object.values(row).map((value, colIndex) => (
                                  <td key={colIndex} className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal" placeholder={undefined}>
                                      {String(value)}
                                    </Typography>
                                  </td>
                                ))}
                              </tr>
                            ));
                          } catch (error) {
                            console.error("Failed to parse query result:", error);
                            // setErrorAlert({ vis: true, msg: "Failed to parse query result" });
                            return null;
                          }
                        })()}
                      </tbody>
                    </table>
                  </Card>
                </div>
              )}
              <Typography variant="small" color="gray" className="mt-1 flex justify-between" placeholder={undefined}>
                <TrashIcon
                  className="h-4 w-4 text-center p-0 opacity-90 hover:opacity-60"
                  onClick={async () => {
                    axios
                      .delete(import.meta.env.VITE_REACT_BASE_URL + `/message/${msg.id}`, {
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
                />
                {formatTimestamp(msg.timestamp)}
              </Typography>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
