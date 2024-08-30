import { z } from "zod";

export const chatNewSchema = z.object({
  chatName: z.string().min(5, { message: "Chat Name Minimum Lenght Should Be 5" }),
  connectionName: z.string().min(5, { message: "Connection Name Minimum length should be 5" }),
  chatEmoji: z.string().min(3, { message: "Emoji Unified Code should be atleast 3" }),
});

export const chatEditSchema = z.object({
  chatName: z.string().min(5, { message: "Chat Name Minimum Lenght Should Be 5" }).optional(),
  chatId: z.number().positive(),
  chatEmoji: z.string().min(5, { message: "Emoji Unified Code should be atleast 3" }).optional(),
});

export const chatHistroySchema = z.object({
  chatId: z.number().positive(),
});
