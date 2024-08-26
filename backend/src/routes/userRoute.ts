import { Router } from "express";

import { validateUserLoginBody, validateUserRegistrationBody } from "../middlewares/userMiddleware";
import { userDestroy, userLogin, userRegister } from "../controllers/userController";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

router.post("/register", validateUserRegistrationBody, userRegister);
router.post("/login", validateUserLoginBody, userLogin);
router.delete("/", verifyToken, userDestroy);

export default router;
