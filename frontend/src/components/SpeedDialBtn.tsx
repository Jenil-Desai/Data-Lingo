import { useLocation, useNavigate } from "react-router-dom";
import { IconButton, SpeedDial, SpeedDialHandler, SpeedDialContent, SpeedDialAction, Typography } from "@material-tailwind/react";
import { PlusIcon, HomeIcon, Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil";
import { modalState } from "../store/atoms";
import { LinkIcon } from "@heroicons/react/24/solid";

interface classNameinterface {
  className: string;
}

interface optionsInterface {
  icon: JSX.Element;
  label: string;
  onClick: () => void;
}

export function SpeedDialBtn(className: classNameinterface) {
  const [modal, setModal] = useRecoilState(modalState);
  const location = useLocation();
  const navigation = useNavigate();
  const labelProps = {
    variant: "small",
    color: "blue-gray",
    className: "absolute top-2/4 -left-2/4 -translate-y-2/4 -translate-x-3/4 font-normal",
  };

  let options: optionsInterface[] = [];

  switch (location.pathname) {
    case "/dashboard":
      options = [
        {
          icon: <LinkIcon className="h-5 w-5" />,
          label: "Connections",
          onClick: () => navigation("connections"),
        },
      ];
      break;
    case "/dashboard/connections":
      options = [
        {
          icon: <HomeIcon className="h-5 w-5" />,
          label: "Home",
          onClick: () => navigation("/dashboard"),
        },
        {
          icon: <Square3Stack3DIcon className="h-5 w-5" />,
          label: "Add",
          onClick: () => setModal(true),
        },
      ];
      break;
    default:
      options = [
        {
          icon: <HomeIcon className="h-5 w-5" />,
          label: "Home",
          onClick: () => navigation("/dashboard"),
        },
      ];
  }

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
