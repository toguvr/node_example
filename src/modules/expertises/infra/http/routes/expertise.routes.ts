import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ExpertiseController from '../controllers/ExpertiseController';

const expertiseRouter = Router();
const expertiseController = new ExpertiseController();

expertiseRouter.get('/', expertiseController.all);

expertiseRouter.use(ensureAuthenticated);

expertiseRouter.get('/:expertise_id', expertiseController.showById);

expertiseRouter.delete('/:expertise_id', expertiseController.delete);

expertiseRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  expertiseController.create,
);

expertiseRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      expertise_id: Joi.string().required(),
      name: Joi.string().required(),
    },
  }),
  expertiseController.update,
);

export default expertiseRouter;
