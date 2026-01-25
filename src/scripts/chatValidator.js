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

export { limitOffset };
