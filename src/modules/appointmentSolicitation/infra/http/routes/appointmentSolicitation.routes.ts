import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import AppointmentSolicitationController from '../controllers/AppointmentSolicitationController';

const appointmentSolicitationRouter = Router();
const appointmentSolicitationController = new AppointmentSolicitationController();

appointmentSolicitationRouter.get('/', appointmentSolicitationController.all);

appointmentSolicitationRouter.use(ensureAuthenticated);

appointmentSolicitationRouter.get(
  '/:appointmentSolicitation_id',
  appointmentSolicitationController.showById,
);

appointmentSolicitationRouter.delete(
  '/:appointmentSolicitation_id',
  appointmentSolicitationController.delete,
);

appointmentSolicitationRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      appointment_id: Joi.string().required(),
      user_to_appointment_id: Joi.string().required(),
    },
  }),
  appointmentSolicitationController.create,
);

appointmentSolicitationRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      appointmentSolicitation_id: Joi.string().required(),
      appointment_id: Joi.string().required(),
      user_to_appointment_id: Joi.string().required(),
      doctor_price: Joi.number().required(),
      total_price: Joi.number().required(),
    },
  }),
  appointmentSolicitationController.update,
);

export default appointmentSolicitationRouter;
