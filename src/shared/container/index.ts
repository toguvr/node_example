import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IUserRefreshTokensRepository from '@modules/users/repositories/IUserRefreshTokensRepository';
import UserRefreshTokensRepository from '@modules/users/infra/typeorm/repositories/UserRefreshTokensRepository';

import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

import IPriceRepository from '@modules/prices/repositories/IPriceRepository';
import PriceRepository from '@modules/prices/infra/typeorm/repositories/PriceRepository';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';

import IAppointmentSolicitationRepository from '@modules/appointmentSolicitation/repositories/IAppointmentSolicitationRepository';
import AppointmentSolicitationRepository from '@modules/appointmentSolicitation/infra/typeorm/repositories/AppointmentSolicitationRepository';

import IHospitalRepository from '@modules/hospitals/repositories/IHospitalRepository';
import HospitalRepository from '@modules/hospitals/infra/typeorm/repositories/HospitalRepository';

import IExpertiseRepository from '@modules/expertises/repositories/IExpertiseRepository';
import ExpertiseRepository from '@modules/expertises/infra/typeorm/repositories/ExpertiseRepository';

import IUserExpertiseRepository from '@modules/userExpertises/repositories/IUserExpertiseRepository';
import UserExpertiseRepository from '@modules/userExpertises/infra/typeorm/repositories/UserExpertiseRepository';

import IUserDocumentRepository from '@modules/userDocuments/repositories/IUserDocumentRepository';
import UserDocumentRepository from '@modules/userDocuments/infra/typeorm/repositories/UserDocumentRepository';

container.registerSingleton<IExpertiseRepository>(
  'ExpertiseRepository',
  ExpertiseRepository,
);

container.registerSingleton<IUserExpertiseRepository>(
  'UserExpertiseRepository',
  UserExpertiseRepository,
);

container.registerSingleton<IUserDocumentRepository>(
  'UserDocumentRepository',
  UserDocumentRepository,
);

container.registerSingleton<IHospitalRepository>(
  'HospitalRepository',
  HospitalRepository,
);

container.registerSingleton<IAppointmentRepository>(
  'AppointmentRepository',
  AppointmentRepository,
);

container.registerSingleton<IAppointmentSolicitationRepository>(
  'AppointmentSolicitationRepository',
  AppointmentSolicitationRepository,
);

container.registerSingleton<IPriceRepository>(
  'PriceRepository',
  PriceRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IUserRefreshTokensRepository>(
  'UserRefreshTokensRepository',
  UserRefreshTokensRepository,
);

container.registerSingleton<INotificationRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);
