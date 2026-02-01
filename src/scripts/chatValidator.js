import { body } from "express-validator";

import customStringArrayValidator from "./customStringArrayValidator.js";

const chatValidator = [
    body("name")
        .optional()
        .isLength({ max: 96 })
        .withMessage("name length must be x <= 96"),
    body("type").custom((value) =>
        customStringArrayValidator(value, ["CHAT", "GROUP_CHAT"]),
    ),
    body("userArray") // test if it works correctly
        .escape()
        .trim()
        .isArray()
        .withMessage("userArray must be an Array")
        .isLength({ min: 1, max: 256 })
        .withMessage("userArray length must be x <= 96"),
];

const addUserValidator = chatValidator[2];

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

export { chatValidator, addUserValidator, limitOffset, messageValidator };
