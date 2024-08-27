import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { validateChatDestroyBody, validateChatEditBody, validateChatNewBody } from "../middlewares/chatMiddleware";
import { chatDestroy, chatEdit, chatNew } from "../controllers/chatController";
import { wrapAsync } from "../utils/wrapAsync";

const router = Router();

router.post("/", verifyToken, validateChatNewBody, wrapAsync(chatNew));
router.patch("/", verifyToken, validateChatEditBody, wrapAsync(chatEdit));
router.delete("/", verifyToken, validateChatDestroyBody, wrapAsync(chatDestroy));

export default router;
