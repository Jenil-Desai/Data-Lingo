import { Router } from "express";

import { verifyToken } from "../middlewares/verifyToken";
import { databaseCheck, databaseDestroy, databaseNew } from "../controllers/databaseController";
import { ValidateDatabaseCheckBody, ValidateDatabaseDestroyBody, ValidateDatabaseNewBody } from "../middlewares/databaseMiddleware";

const router = Router();

router.post("/test-connection", verifyToken, ValidateDatabaseCheckBody, databaseCheck);
router.post("/", verifyToken, ValidateDatabaseNewBody, databaseNew);
router.delete("/", verifyToken, ValidateDatabaseDestroyBody, databaseDestroy);

export default router;
