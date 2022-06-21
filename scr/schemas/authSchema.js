import joi from "joi";

export const signUpSchema = joi.object({
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  urlpicture: joi.string().required(),
});

export const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export const linkSchema = joi.object({
  link: joi.string().uri().required(),
  title: joi.string()
});