import { body } from "express-validator";

const limitOffset = [
    body("limit")
        .optional({
            values: "falsy",
        })
        // To prevent too high payload bodies
        .trim()
        .escape()
        .isInt({
            min: -4096,
            max: 4096,
        })
        .withMessage("limit must be -4096 (x latest messages) <= x <= 4096"),
    body("offset")
        .optional({
            values: "falsy",
        })
        .trim()
        .escape()
        .isInt({
            min: 0,
        })
        .withMessage("offset must be x >= 0"),
];

const messageValidator = [
    body("text")
        .escape()
        .trim()
        .isLength({ min: 1, max: 4096 })
        .withMessage("message length must be 1 <= x <= 4096"),
    body("image").optional(),
];

export { limitOffset, messageValidator };
