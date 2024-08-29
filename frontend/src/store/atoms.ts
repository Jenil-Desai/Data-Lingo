import { atom } from "recoil";

export const newChatModal = atom({
  key: "newChatModal",
  default: false,
});

export const newChatName = atom({
  key: "newChatName",
  default: "",
});

export const newConnectionName = atom({
  key: "newConnectionName",
  default: "",
});

export const newConnectionModal = atom({
  key: "newConnectionModal",
  default: false,
});

export const newConnectionType = atom({
  key: "newConnectionType",
  default: "",
});

export const newConnectionString = atom({
  key: "newConnectionString",
  default: "",
});

export const errrorAlert = atom({
  key: "errorAlert",
  default: {
    vis: false,
    msg: "",
  },
});
