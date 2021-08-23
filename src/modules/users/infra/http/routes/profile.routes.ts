import { Router } from 'express';

import { Joi, Segments, celebrate } from 'celebrate';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      doctor_id: Joi.string().required(),
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      cellphone: Joi.string(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
      number: Joi.optional(),
      role: Joi.optional(),
      rg: Joi.optional(),
      street: Joi.optional(),
      sus: Joi.optional(),
      uf: Joi.optional(),
      agency: Joi.optional(),
      account: Joi.optional(),
      bairro: Joi.optional(),
      bank: Joi.optional(),
      birthday: Joi.optional(),
      cep: Joi.optional(),
      cidade: Joi.optional(),
      cpf: Joi.optional(),
      crm: Joi.optional(),
    },
  }),
  profileController.updateAdmin,
);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      cellphone: Joi.string(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
      number: Joi.optional(),
      role: Joi.optional(),
      rg: Joi.optional(),
      street: Joi.optional(),
      sus: Joi.optional(),
      uf: Joi.optional(),
      agency: Joi.optional(),
      account: Joi.optional(),
      bairro: Joi.optional(),
      bank: Joi.optional(),
      birthday: Joi.optional(),
      cep: Joi.optional(),
      cidade: Joi.optional(),
      cpf: Joi.optional(),
      crm: Joi.optional(),
    },
  }),
  profileController.update,
);

export default profileRouter;
