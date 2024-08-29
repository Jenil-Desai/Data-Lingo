import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { validateChatEditBody, validateChatHistroyBody, validateChatNewBody } from "../middlewares/chatMiddleware";
import { chatDestroy, chatEdit, chatHistroy, chatList, chatNew } from "../controllers/chatController";
import { wrapAsync } from "../utils/wrapAsync";

const router = Router();

router.post("/", verifyToken, validateChatNewBody, wrapAsync(chatNew));
router.patch("/", verifyToken, validateChatEditBody, wrapAsync(chatEdit));
router.delete("/:chatId", verifyToken, wrapAsync(chatDestroy));
router.get("/", verifyToken, wrapAsync(chatList));
router.post("/histroy", verifyToken, validateChatHistroyBody, wrapAsync(chatHistroy));

export default router;
