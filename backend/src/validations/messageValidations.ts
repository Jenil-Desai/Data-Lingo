import { z } from "zod";

export const messageNewSchema = z.object({
  chatId: z.number().positive(),
  messageText: z.string().min(10, { message: "Message Should be Atleast 10" }),
});
