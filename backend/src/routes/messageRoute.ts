import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { validateMessageNewBody } from "../middlewares/messageMiddleware";
import { messageNew } from "../controllers/messageController";

const router = Router();

router.post("/", verifyToken, validateMessageNewBody, messageNew);

export default router;
