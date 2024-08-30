import { useLocation, useNavigate } from "react-router-dom";
import { IconButton, SpeedDial, SpeedDialHandler, SpeedDialContent, SpeedDialAction, Typography } from "@material-tailwind/react";
import { PlusIcon, HomeIcon, ChatBubbleLeftEllipsisIcon, LifebuoyIcon, LinkIcon } from "@heroicons/react/24/outline";
import { newChatModal, newConnectionModal } from "../store/atoms";
import { useSetRecoilState } from "recoil";

interface classNameinterface {
  className: string;
}

interface optionsInterface {
  icon: JSX.Element;
  label: string;
  onClick: () => void;
}

export function SpeedDialBtn(className: classNameinterface) {
  const setChatModal = useSetRecoilState(newChatModal);
  const setConnectionModal = useSetRecoilState(newConnectionModal);
  const location = useLocation();
  const navigation = useNavigate();
  const labelProps = {
    variant: "small",
    color: "blue-gray",
    className: "absolute top-2/4 -left-2/4 -translate-y-2/4 -translate-x-3/4 font-normal",
  };

  let options: optionsInterface[] = [];

  options = [
    {
      icon: <LinkIcon className="h-5 w-5" />,
      label: "Connection",
      onClick: () => setConnectionModal(true),
    },
    {
      icon: <ChatBubbleLeftEllipsisIcon className="h-5 w-5" />,
      label: "Chat",
      onClick: () => setChatModal(true),
    },
    {
      icon: <LifebuoyIcon className="h-5 w-5" />,
      label: "Help",
      onClick: () => navigation("/contact-us"),
    },
  ];

  return (
    <div className={`fixed bottom-0 right-0 mb-4 mr-4 z-20 ${className}`}>
      <SpeedDial>
        <SpeedDialHandler>
          <IconButton size="lg" className="rounded-full" placeholder={undefined}>
            <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
          </IconButton>
        </SpeedDialHandler>
        <SpeedDialContent placeholder={undefined}>
          {options.map((option, index) => (
            <SpeedDialAction key={index} className="relative" onClick={option.onClick} placeholder={undefined}>
              {option.icon}
              <Typography placeholder={undefined} {...labelProps}>
                {option.label}
              </Typography>
            </SpeedDialAction>
          ))}
        </SpeedDialContent>
      </SpeedDial>
    </div>
  );
}
