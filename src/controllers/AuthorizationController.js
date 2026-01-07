import { validationResult } from "express-validator";

import prisma from "../db/prisma.js";
import * as argon2 from "argon2";

class AuthorizationController {
    async login(req, res) {
        return res.status(204).send();
    }

    async signUp(req, res) {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }

        const {
            email,
            username,
            password,
            public_key,
            name,
            surname,
            description,
            birth_date,
        } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser !== null) {
            return res.status(409).json(false);
        }

        try {
            const hashedPassword = await argon2.hash(password);

            const newUser = await prisma.user.create({
                data: {
                    email,
                    username,
                    hashedPassword,
                    publicKey: public_key,
                },
            });

            // console.log(newUser);
            if (newUser !== null) {
                await prisma.userProfile.create({
                    data: {
                        userId: newUser.id,
                        name,
                        surname,
                        description,
                        birthDate: birth_date,
                    },
                });

                return res.status(200).json(true);
            }
        } catch {
            return res.status(500).json(false);
        }
    }
}

export default new AuthorizationController();
