import { Router } from "express";

import { validateUserLoginBody, validateUserRegistrationBody } from "../middlewares/userMiddleware";
import { userDestroy, userLogin, userRegister, userStats } from "../controllers/userController";
import { verifyToken } from "../middlewares/verifyToken";
import { wrapAsync } from "../utils/wrapAsync";

const router = Router();

router.post("/register", validateUserRegistrationBody, wrapAsync(userRegister));
router.post("/login", validateUserLoginBody, wrapAsync(userLogin));
router.delete("/", verifyToken, wrapAsync(userDestroy));
router.get("/stats", verifyToken, wrapAsync(userStats));

export default router;
