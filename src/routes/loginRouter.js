import { Router } from "express";

import authorizationController from "../controllers/AuthorizationController.js";

const loginRouter = Router();

loginRouter.post("/", authorizationController.login);

export default loginRouter;
