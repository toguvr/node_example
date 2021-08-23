import { Router } from 'express';

import userRouter from '@modules/users/infra/http/routes/users.routes';

import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

import priceRouter from '@modules/prices/infra/http/routes/prices.routes';
import appointmentRouter from '@modules/appointments/infra/http/routes/appointment.routes';
import appointmentSolicitationRouter from '@modules/appointmentSolicitation/infra/http/routes/appointmentSolicitation.routes';
import hospitalRouter from '@modules/hospitals/infra/http/routes/hospital.routes';
import userDocumentRouter from '@modules/userDocuments/infra/http/routes/userDocument.routes';
import expertiseRouter from '@modules/expertises/infra/http/routes/expertise.routes';
import userExpertiseRouter from '@modules/userExpertises/infra/http/routes/userExpertise.routes';

const routes = Router();

routes.use('/userDocument', userDocumentRouter);
routes.use('/price', priceRouter);
routes.use('/appointment', appointmentRouter);
routes.use('/appointmentSolicitation', appointmentSolicitationRouter);
routes.use('/expertise', expertiseRouter);
routes.use('/userExpertise', userExpertiseRouter);
routes.use('/hospital', hospitalRouter);
routes.use('/users', userRouter);

routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

export default routes;
