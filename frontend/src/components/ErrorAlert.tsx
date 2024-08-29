import { Alert } from "@material-tailwind/react";
import { useRecoilState } from "recoil";

import { errrorAlert } from "../store/atoms";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

export function ErrorAlert() {
  const [open, setOpen] = useRecoilState(errrorAlert);
  return (
    <>
      <Alert open={open.vis} onClose={() => setOpen({ vis: false, msg: "" })} className="mb-2" icon={<ExclamationCircleIcon />} variant="gradient">
        {open.msg}
      </Alert>
    </>
  );
}
