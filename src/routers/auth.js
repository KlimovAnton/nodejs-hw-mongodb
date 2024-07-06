import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { registerUserSchema, loginUserSchema } from '../validation/auth.js';
import { registerUserController, loginUserController } from '../controllers/auth.js';
import validateBody from "../utils/validateBody.js";

const routerAuth = Router();

routerAuth.post('/register', validateBody(registerUserSchema), ctrlWrapper(registerUserController));
routerAuth.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController));

export default routerAuth;