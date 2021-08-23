import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import PriceController from '../controllers/PriceController';

const priceRouter = Router();
const priceController = new PriceController();

priceRouter.get('/', priceController.all);

priceRouter.use(ensureAuthenticated);

priceRouter.get('/:price_id', priceController.showById);

priceRouter.delete('/:price_id', priceController.delete);

priceRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      expertise_id: Joi.string().required(),
      hospital_id: Joi.string().required(),
      doctor_price: Joi.number().required(),
      total_price: Joi.number().required(),
    },
  }),
  priceController.create,
);

priceRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      price_id: Joi.string().required(),
      expertise_id: Joi.string().required(),
      hospital_id: Joi.string().required(),
      doctor_price: Joi.number().required(),
      total_price: Joi.number().required(),
    },
  }),
  priceController.update,
);

export default priceRouter;
