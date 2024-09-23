import express from "express";
import cors from "cors";
import authRoute from "./routes/authRoutes";
import todoRoute from "./routes/todoRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/todos", todoRoute);

export default app;
