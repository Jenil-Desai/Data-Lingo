import { z } from "zod";
import { chatDestroySchema, chatEditSchema, chatNewSchema } from "../validations/chatValidations";

export type chatNewBody = z.infer<typeof chatNewSchema>;
export type chatEditBody = z.infer<typeof chatEditSchema>;
export type chatDestroyBoy = z.infer<typeof chatDestroySchema>;
