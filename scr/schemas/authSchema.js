import joi from "joi";

export const signUpSchema = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.ref("password"),
    urlpicture: joi.string().required()
})

export const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})