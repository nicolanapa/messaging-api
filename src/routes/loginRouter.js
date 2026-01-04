import { Router } from "express";

import passport from "../db/passport.js";
import authorizationController from "../controllers/AuthorizationController.js";

const loginRouter = Router();

loginRouter.post(
    "/",
    passport.authenticate("local"),
    authorizationController.login,
);

export default loginRouter;
