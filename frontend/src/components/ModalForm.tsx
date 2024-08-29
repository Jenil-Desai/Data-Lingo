import { Input, Option, Select, Button, Dialog, Textarea, IconButton, Typography, DialogBody, DialogHeader, DialogFooter } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { RecoilState, useRecoilState } from "recoil";

interface modalFormInterface {
  modalHeading: string;
  modalSubHeading: string;
  modalBodyForm: JSX.Element;
  modalSubmitBtnText: string;
  modalSubmitBtnAction: () => void;
  modalState: RecoilState<any>;
}

export default function ModalForm({ modalHeading, modalSubHeading, modalBodyForm, modalSubmitBtnText, modalSubmitBtnAction, modalState }: modalFormInterface) {
  const [open, setOpen] = useRecoilState(modalState);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Dialog size="sm" open={open} handler={handleOpen} className="p-4" placeholder={undefined}>
        <DialogHeader className="relative m-0 block" placeholder={undefined}>
          <Typography variant="h4" color="blue-gray" placeholder={undefined} children={modalHeading} />
          <Typography className="mt-1 font-normal text-gray-600" children={modalSubHeading} placeholder={undefined}></Typography>
          <IconButton size="sm" variant="text" className="!absolute right-3.5 top-3.5" onClick={handleOpen} children={<XMarkIcon className="h-4 w-4 stroke-2" />} placeholder={undefined}></IconButton>
        </DialogHeader>
        <DialogBody className="space-y-4 pb-6" placeholder={undefined} children={modalBodyForm} />
        <DialogFooter placeholder={undefined}>
          <Button className="ml-auto" type="submit" onClick={modalSubmitBtnAction} placeholder={undefined} children={modalSubmitBtnText} />
        </DialogFooter>
      </Dialog>
    </>
  );
}
