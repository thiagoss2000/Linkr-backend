import { Router } from "express";
import { sendPostsTimeline } from "../repositories/timelineRepositories.js";

const timelineRouter = Router();

timelineRouter.post("/post");
timelineRouter.get("/timeline", sendPostsTimeline);

export default timelineRouter;
