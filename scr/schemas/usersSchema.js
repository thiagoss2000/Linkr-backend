import joi from 'joi';

export const getUserSchema = joi.object().keys({
    search: joi.string().required()
});
