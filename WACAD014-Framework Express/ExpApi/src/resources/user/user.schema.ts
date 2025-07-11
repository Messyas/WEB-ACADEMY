import Joi from 'joi';
import { UserTypes } from '../userType/userType.constants';

export const userSchema = Joi.object().keys({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  userTypeId: Joi.string().valid(UserTypes.admin, UserTypes.client).required()
});