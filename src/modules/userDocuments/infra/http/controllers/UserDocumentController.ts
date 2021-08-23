import { Request, Response } from 'express';

import { container } from 'tsyringe';
import UserDocumentService from '@modules/userDocuments/services/UserDocumentService';
import { classToClass } from 'class-transformer';

export default class UserDocumentController {
  public async me(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const trainingPlan = container.resolve(UserDocumentService);

    const training = await trainingPlan.showMe(user_id);

    return response.json(classToClass(training));
  }

  public async getUserDocument(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;
    const { document_owner_id } = request.params;

    const trainingPlan = container.resolve(UserDocumentService);

    const training = await trainingPlan.showUserDocuments({
      user_id,
      document_owner_id,
    });

    return response.json(classToClass(training));
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { document_id } = request.params;

    const documentPlan = container.resolve(UserDocumentService);

    await documentPlan.deleteDocument({
      user_id,
      document_id,
    });

    return response.status(204).send();
  }

  public async createMyDocument(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;

    const documentFilename = request.file.filename;

    const { type } = request.body;

    const userDocumentService = container.resolve(UserDocumentService);

    const document = await userDocumentService.createOwner({
      type,
      user_id,
      documentFilename,
    });

    return response.json(classToClass(document));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const documentFilename = request.file.filename;

    const { document_owner_id, type } = request.body;

    const userDocumentService = container.resolve(UserDocumentService);

    const document = await userDocumentService.execute({
      document_owner_id,
      type,
      user_id,
      documentFilename,
    });

    return response.json(classToClass(document));
  }
}
