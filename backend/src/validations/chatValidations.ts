import { z } from "zod";

export const chatNewSchema = z.object({
  chatName: z.string().min(5, { message: "Minimum Lenght Should Be 5" }),
  connectionName: z.string().min(5, { message: "Minimum length should be 5" }),
});

export const chatEditSchema = z.object({
  chatName: z.string().min(5, { message: "Minimum Lenght Should Be 5" }),
  chatId: z.number(),
});
