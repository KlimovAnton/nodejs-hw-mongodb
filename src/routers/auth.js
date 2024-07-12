import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { registerUserSchema, loginUserSchema, requestResetEmailSchema } from '../validation/auth.js';
import { registerUserController, loginUserController, logoutUserController, refreshUserSessionController, requestResetEmailController } from '../controllers/auth.js';
import validateBody from "../utils/validateBody.js";

const routerAuth = Router();

routerAuth.post('/register', validateBody(registerUserSchema), ctrlWrapper(registerUserController));
routerAuth.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController));
routerAuth.post('/logout', ctrlWrapper(logoutUserController));
routerAuth.post('/refresh', ctrlWrapper(refreshUserSessionController));
// routerAuth.post('/send-reset-email', );
routerAuth.post('/request-reset-email', validateBody(requestResetEmailSchema), ctrlWrapper(requestResetEmailController));

export default routerAuth;