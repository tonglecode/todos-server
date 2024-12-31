import express from "express";
import authRouter from "./routes/authRouter";
import AppDataSource from "./data-source";
import { connectRedis } from "./redisClient";
import { authenticateUser } from "./middleWare/authenticateUser";

const cors = require("cors");

const app = express();
const port = process.env.PORT || 8000;

// 데이터베이스 연결
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

connectRedis()
  .then(() => {
    console.log("Redis client connected!");
  })
  .catch((err) => {
    console.error("Error connecting to Redis:", err);
  });

app.use(cors({ origin: "http://localhost:3003" }));

app.get("/protected", authenticateUser, (req, res) => {
  res.json(req.user);
});

app.use(express.json());

app.use(authRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
