import configDotenv from "dotenv";
import express from "express";

import userRoute from "./routes/userRoute";
import databaseRoute from "./routes/databaseRoute";
import chatRoute from "./routes/chatRoute";
import messageRoute from "./routes/messageRoute";
import { errorHandler } from "./middlewares/errorHandler";

configDotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/database", databaseRoute);
app.use("/api/chat", chatRoute);
app.use("/api/message", messageRoute);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server Listening On Port ${PORT}`);
});
