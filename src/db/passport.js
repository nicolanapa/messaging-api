import * as argon2 from "argon2";
import passport from "passport";
import { Strategy } from "passport-local";

import prisma from "./prisma.js";

passport.use(
    new Strategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email, password, done) => {
            try {
                const user = await prisma.user.findUnique({
                    where: {
                        email: email,
                    },
                    include: {
                        userProfile: true,
                    },
                    omit: {
                        hashedPassword: false,
                    },
                });

                if (!user || user === null) {
                    return done(null, false);
                } else if (
                    !(await argon2.verify(user.hashedPassword, password))
                ) {
                    return done(null, false);
                }

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        },
    ),
);

passport.serializeUser((user, cb) => {
    return cb(null, user.id);
});

passport.deserializeUser((user, cb) => {
    return cb(null, user);
});

export default passport;
