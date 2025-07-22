import Joi from "joi";
import { Languages } from "./language.contants";

export const languageSchema = Joi.object().keys({
    lang: Joi.string().valid(...Object.values(Languages))
});
