import Joi from 'joi'

export const productSchema = Joi.object().keys({
    name: Joi.string().min(3).max(50).required(),
    price: Joi.number().min(0).required(),
    stockQuantity: Joi.number().min(0).integer().required()
});

const phone = {
    name: "Redmi Note 11",
    price: 3830.53,
    stockQuantity: 192
};

const result = productSchema.validate(phone);
console.log(result);