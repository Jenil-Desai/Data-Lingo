import { CubeTransparentIcon } from "@heroicons/react/24/solid";
import { Alert, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SideBarCTAPropsInterface {
  heading: string;
  descp: string;
}

export default function SideBarCTA({ heading, descp }: SideBarCTAPropsInterface) {
  const [openAlert, setOpenAlert] = useState(true);
  const navigate = useNavigate();

  const handleClick = () => navigate("/pricing");

  return (
    <Alert open={openAlert} className="mt-auto" onClose={() => setOpenAlert(false)}>
      <CubeTransparentIcon className="mb-4 h-12 w-12" />
      <Typography variant="h6" className="mb-1" placeholder={undefined}>
        {heading}
      </Typography>
      <Typography variant="small" className="font-normal opacity-80" placeholder={undefined}>
        {descp}
      </Typography>
      <div className="mt-4 flex gap-3">
        <Typography as="a" href="#" variant="small" className="font-medium opacity-80" onClick={() => setOpenAlert(false)} placeholder={undefined}>
          Dismiss
        </Typography>
        <Typography as="a" href="#" variant="small" className="font-medium" placeholder={undefined} onClick={handleClick}>
          Upgrade Now
        </Typography>
      </div>
    </Alert>
  );
}
