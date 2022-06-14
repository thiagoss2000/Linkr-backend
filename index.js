import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";

import helloWorld from "./scr/routers/helloAPI.js";
import authRouter from "./scr/routers/authRouter.js";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());

app.use(helloWorld);
app.use(authRouter);

app.listen(process.env.PORT, () => {
  console.log(chalk.blue("Server running on port 4000"));
});
