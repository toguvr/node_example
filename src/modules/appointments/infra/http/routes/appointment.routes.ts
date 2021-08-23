import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import AppointmentController from '../controllers/AppointmentController';

const appointmentRouter = Router();
const appointmentController = new AppointmentController();

appointmentRouter.get('/', appointmentController.all);

appointmentRouter.use(ensureAuthenticated);

appointmentRouter.get('/mynext', appointmentController.showMyNext);

appointmentRouter.get('/:appointment_id', appointmentController.showById);

appointmentRouter.get(
  '/:expertise_id',
  appointmentController.showByExpertiseAdvert,
);

appointmentRouter.delete('/:appointment_id', appointmentController.delete);

appointmentRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      user_appointment_id: Joi.string().required(),
      hospital_id: Joi.string().required(),
      expertise_id: Joi.string().required(),
      title: Joi.string().required(),
      date: Joi.date().required(),
    },
  }),
  appointmentController.create,
);

appointmentRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      appointment_id: Joi.string().required(),
      user_appointment_id: Joi.string().required(),
      hospital_id: Joi.string().required(),
      expertise_id: Joi.string().required(),
      title: Joi.string().required(),
      date: Joi.date().required(),
    },
  }),
  appointmentController.update,
);

export default appointmentRouter;
