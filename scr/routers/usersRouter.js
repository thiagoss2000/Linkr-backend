import { Router } from "express";
import { getUsers } from "../repositories/usersRepository.js";
import { validateToken } from "../middlewares/tokenMiddleware.js";

const usersRouter = Router();

usersRouter.get('/users', validateToken, getUsers);

export default usersRouter;