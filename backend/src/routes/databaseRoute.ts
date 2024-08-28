import { Router } from "express";

import { verifyToken } from "../middlewares/verifyToken";
import { databaseCheck, databaseDestroy, databaseEdit, databaseList, databaseNew } from "../controllers/databaseController";
import { ValidateDatabaseCheckBody, ValidateDatabaseDestroyBody, ValidateDatabaseEditBody, ValidateDatabaseNewBody } from "../middlewares/databaseMiddleware";
import { wrapAsync } from "../utils/wrapAsync";

const router = Router();

router.post("/test-connection", verifyToken, ValidateDatabaseCheckBody, wrapAsync(databaseCheck));
router.post("/", verifyToken, ValidateDatabaseNewBody, wrapAsync(databaseNew));
router.delete("/", verifyToken, ValidateDatabaseDestroyBody, wrapAsync(databaseDestroy));
router.patch("/", verifyToken, ValidateDatabaseEditBody, wrapAsync(databaseEdit));
router.get("/", verifyToken, wrapAsync(databaseList));

export default router;
