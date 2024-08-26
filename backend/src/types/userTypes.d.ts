import { number, z } from "zod";

import { userRegisterSchema, userLoginSchema } from "../validations/userValidations";

export type userRegisterBody = z.infer<typeof userRegisterSchema>;
export type userLoginBody = z.infer<typeof userLoginSchema>;
