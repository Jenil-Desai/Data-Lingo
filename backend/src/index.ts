import configDotenv from "dotenv";
import express from "express";

import userRoute from "./routes/userRoute";
import databaseRoute from "./routes/databaseRoute";
import chatRoute from "./routes/chatRoute";

configDotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/database", databaseRoute);
app.use("/api/chat", chatRoute);

app.listen(PORT, () => {
  console.log(`Server Listening On Port ${PORT}`);
});
