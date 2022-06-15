import { Router } from "express";

import { signUp, login } from "./../controllers/authController.js";
import { validateSchema } from "./../middlewares/validateSchema.js";
import { signUpSchema, loginSchema} from "../schemas/authSchema.js";



const authRouter = Router();

authRouter.post('/signup', validateSchema(signUpSchema), signUp );
authRouter.post('/login', validateSchema(loginSchema), login );

export default authRouter;