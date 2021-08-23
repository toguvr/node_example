import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import HospitalController from '../controllers/HospitalController';

const hospitalRouter = Router();
const hospitalController = new HospitalController();

hospitalRouter.get('/', hospitalController.all);

hospitalRouter.use(ensureAuthenticated);

hospitalRouter.get('/:hospital_id', hospitalController.showById);

hospitalRouter.delete('/:hospital_id', hospitalController.delete);

hospitalRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      logradouro: Joi.optional(),
      numero: Joi.optional(),
      cep: Joi.optional(),
      bairro: Joi.optional(),
      cidade: Joi.optional(),
      uf: Joi.optional(),
    },
  }),
  hospitalController.create,
);

hospitalRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      hospital_id: Joi.string().required(),
      name: Joi.string().required(),
      logradouro: Joi.optional(),
      numero: Joi.optional(),
      cep: Joi.optional(),
      bairro: Joi.optional(),
      cidade: Joi.optional(),
      uf: Joi.optional(),
    },
  }),
  hospitalController.update,
);

export default hospitalRouter;
