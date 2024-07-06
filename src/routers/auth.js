import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { registerUserSchema } from '../validation/auth.js';
import { registerUserController } from '../controllers/auth.js';
import validateBody from "../utils/validateBody.js";

const routerAuth = Router();

routerAuth.post('/', validateBody(registerUserSchema), ctrlWrapper(registerUserController));

export default routerAuth;