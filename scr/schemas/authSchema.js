import joi from "joi";

export const signUpSchema = joi.object({
  user_name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  image: joi.string().required(),
});

export const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export const linkSchema = joi.object({
  link: joi.string().uri().required(),
  title: joi.string()
});

export const commentSchema = joi.object({
  post_id: joi.number().integer().required(),
  text: joi.string().required()
});