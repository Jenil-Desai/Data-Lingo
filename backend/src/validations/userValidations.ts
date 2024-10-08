import { z } from "zod";

export const userRegisterSchema = z.object({
  fname: z.string().min(3, { message: "fname's Minimum length should be 3" }),
  lname: z.string().min(3, { message: "lname's Minimum length should be 3" }),
  username: z.string().min(6, { message: "username's Minimum length should be 6" }),
  email: z.string().min(12, { message: "email's Minimum length should be 12" }),
  password: z.string().min(8, { message: "password's Minimum lenght should be 8" }),
});

export const userLoginSchema = z.object({
  username: z.string().min(6, { message: "username's Minimum length should be 6" }),
  password: z.string().min(8, { message: "password's Minimum lenght should be 8" }),
});
