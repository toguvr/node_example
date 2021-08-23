import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import UserDocumentController from '../controllers/UserDocumentController';

const userDocumentRouter = Router();
const upload = multer(uploadConfig.multer);
const userDocumentController = new UserDocumentController();

userDocumentRouter.use(ensureAuthenticated);

userDocumentRouter.delete('/:document_id', userDocumentController.remove);
userDocumentRouter.get('/me', userDocumentController.me);
userDocumentRouter.get(
  '/from/:document_owner_id',
  userDocumentController.getUserDocument,
);

userDocumentRouter.post(
  '/',
  upload.single('document'),
  celebrate({
    [Segments.BODY]: {
      type: Joi.string().required(),
    },
  }),
  userDocumentController.createMyDocument,
);

userDocumentRouter.post(
  '/',
  upload.single('document'),
  celebrate({
    [Segments.BODY]: {
      document_owner_id: Joi.string().uuid().required(),
      type: Joi.string().required(),
    },
  }),
  userDocumentController.create,
);

export default userDocumentRouter;
