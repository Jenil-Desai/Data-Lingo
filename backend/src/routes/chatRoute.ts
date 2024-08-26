import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { validateChatEditBody, validateChatNewBody } from "../middlewares/chatMiddleware";
import { chatEdit, chatNew } from "../controllers/chatController";

const router = Router();

router.post("/", verifyToken, validateChatNewBody, chatNew);
router.patch("/", verifyToken, validateChatEditBody, chatEdit);

export default router;
