import { Router } from "express";

import { getUsers } from "../repositories/usersRepository.js";
import { authorization } from "../middlewares/authentication.js";

const usersRouter = Router();

usersRouter.get('/users', authorization, getUsers);

export default usersRouter;