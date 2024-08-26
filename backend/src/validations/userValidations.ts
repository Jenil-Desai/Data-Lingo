import { z } from "zod";

export const userRegisterSchema = z.object({
  fname: z.string().min(3, { message: "Minimum length should be 3" }),
  lname: z.string().min(3, { message: "Minimum length should be 3" }),
  username: z.string().min(6, { message: "Minimum length should be 6" }),
  email: z.string().min(12, { message: "Minimum length should be 12" }),
  password: z.string().min(8, { message: "Minimum lenght should be 8" }),
});

export const userLoginSchema = z.object({
  username: z.string().min(6, { message: "Minimum length should be 6" }),
  password: z.string().min(8, { message: "Minimum lenght should be 8" }),
});
