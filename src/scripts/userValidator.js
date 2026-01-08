import { body } from "express-validator";

const userValidator = [
    body("email")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("email mustn't be empty")
        .isEmail()
        .withMessage("email is not an email")
        .toLowerCase(),
    body("username")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("username mustn't be empty")
        .isLength({ min: 2, max: 64 })
        .withMessage("username length should be between 2 and 64 characters"),
    body("password")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("password mustn't be empty")
        // Minimum size to be increased
        .isLength({ min: 4, max: 64 })
        .withMessage("password length should be between 4 and 64 characters"),
    body("public_key")
        .trim()
        .escape()
        .optional({
            values: "falsy",
        })
        .isString()
        .isLength({ max: 4096 })
        .withMessage("public_key is too long (4096 characters maximum)"),
    body("name")
        .trim()
        .escape()
        .optional({
            values: "falsy",
        })
        .isString()
        .isLength({ max: 32 })
        .withMessage("name is too long (32 characters maximum)"),
    body("surname")
        .trim()
        .escape()
        .optional({
            values: "falsy",
        })
        .isString()
        .isLength({ max: 32 })
        .withMessage("surname is too long (32 characters maximum)"),
    body("description")
        .trim()
        .escape()
        .optional({
            values: "falsy",
        })
        .isString()
        .isLength({ max: 512 })
        .withMessage("description is too long (512 characters maximum)"),
    body("birth_date")
        .trim()
        .escape()
        .optional({
            values: "falsy",
        })
        .isDate()
        .withMessage("birth_date is not a date"),
];

const updateUserValidator = [userValidator[1], userValidator.slice(3)];

const updateUserPublicKeyValidator = userValidator[3].default("");

export { userValidator, updateUserValidator, updateUserPublicKeyValidator };
