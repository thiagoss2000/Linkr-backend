import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";

import authRouter from "./scr/routers/authRouter.js";
import usersRouter from "./scr/routers/usersRouter.js";
import timelineRouter from "./scr/routers/timelineRouter.js";
import hashtagRouter from "./scr/routers/hashtagRouter.js";
import likesRouter from "./scr/routers/likesRouter.js";
import commentsRouter from "./scr/routers/commentsRouter.js";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());

app.use(authRouter);
app.use(usersRouter);
app.use(timelineRouter);
app.use(hashtagRouter);
app.use(likesRouter)
app.use(commentsRouter)

app.listen(process.env.PORT, () => {
  console.log(chalk.blue("Server running on port " + process.env.PORT));
});
