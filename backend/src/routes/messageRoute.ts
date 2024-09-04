import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { validateMessageNewBody } from "../middlewares/messageMiddleware";
import { messageDestroy, messageNew } from "../controllers/messageController";
import { wrapAsync } from "../utils/wrapAsync";

const router = Router();

router.post("/", verifyToken, validateMessageNewBody, messageNew);
router.delete("/:messageId", verifyToken, messageDestroy);

export default router;
