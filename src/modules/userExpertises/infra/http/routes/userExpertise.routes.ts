import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import UserExpertiseController from '../controllers/UserExpertiseController';

const userExpertiseRouter = Router();
const userExpertiseController = new UserExpertiseController();

userExpertiseRouter.get('/', userExpertiseController.all);

userExpertiseRouter.use(ensureAuthenticated);

userExpertiseRouter.get(
  '/:user_expertise_id',
  userExpertiseController.showById,
);

userExpertiseRouter.delete(
  '/:user_expertise_id',
  userExpertiseController.delete,
);

userExpertiseRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      expertise_id: Joi.string().required(),
      owner_expertise_id: Joi.string().required(),
    },
  }),
  userExpertiseController.create,
);

userExpertiseRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      user_expertise_id: Joi.string().required(),
      expertise_id: Joi.string().required(),
      owner_expertise_id: Joi.string().required(),
    },
  }),
  userExpertiseController.update,
);

export default userExpertiseRouter;
