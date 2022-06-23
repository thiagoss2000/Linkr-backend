import { Router } from "express";
<<<<<<< HEAD

import { search } from "../controllers/usersController.js";
import { verifyJWT } from "../middlewares/tokenMiddleware.js";
=======
import { getUsers } from "../repositories/usersRepository.js";
import { validateToken } from "../middlewares/tokenMiddleware.js";
>>>>>>> main

const usersRouter = Router();

<<<<<<< HEAD
usersRouter.get('/search/:user', verifyJWT,  search );
=======
usersRouter.get('/users', validateToken, getUsers);
>>>>>>> main

export default usersRouter;