import { z } from "zod";
import { chatDestroySchema, chatEditSchema, chatHistroySchema, chatNewSchema } from "../validations/chatValidations";

export type chatNewBody = z.infer<typeof chatNewSchema>;
export type chatEditBody = z.infer<typeof chatEditSchema>;
export type chatHistroyBody = z.infer<typeof chatHistroySchema>;
