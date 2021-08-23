import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateUserExpertiseService from '../../../services/CreateUserExpertiseService';

export default class UserExpertiseController {
  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { user_expertise_id } = request.params;

    const hospitalService = container.resolve(CreateUserExpertiseService);

    await hospitalService.delete({ user_id, user_expertise_id });

    return response.status(204).send();
  }

  public async all(request: Request, response: Response): Promise<Response> {
    const hospitalService = container.resolve(CreateUserExpertiseService);

    const hospital = await hospitalService.showAll();

    return response.json(classToClass(hospital));
  }

  public async showById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { user_expertise_id } = request.params;

    const hospitalService = container.resolve(CreateUserExpertiseService);

    const hospital = await hospitalService.showById(user_expertise_id);

    return response.json(classToClass(hospital));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { expertise_id, owner_expertise_id } = request.body;

    const hospitalService = container.resolve(CreateUserExpertiseService);

    const hospital = await hospitalService.execute({
      user_id,
      expertise_id,
      owner_expertise_id,
    });

    return response.json(classToClass(hospital));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const {
      user_expertise_id,
      expertise_id,
      owner_expertise_id,
    } = request.body;

    const hospitalService = container.resolve(CreateUserExpertiseService);

    const hospital = await hospitalService.update({
      owner_expertise_id,
      expertise_id,
      user_id,
      user_expertise_id,
    });

    return response.json(classToClass(hospital));
  }
}
