import Joi from "joi";

const productShema = Joi.object().keys({
    name: Joi.string().min(3).max(50).required(),
    price: Joi.number().min(0).required(),
    stockQuantity: Joi.number().min(0).integer().required()
});