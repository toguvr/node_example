import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import SessionsController from '../controllers/SessionsController';
import RefreshTokenController from '../controllers/RefreshTokenController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();
const refreshTokenController = new RefreshTokenController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
);

sessionsRouter.post('/refresh-token', refreshTokenController.handle);

export default sessionsRouter;
