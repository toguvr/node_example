import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateExpertiseService from '../../../services/CreateExpertiseService';

export default class ExpertiseController {
  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { expertise_id } = request.params;

    const hospitalService = container.resolve(CreateExpertiseService);

    await hospitalService.delete({ user_id, expertise_id });

    return response.status(204).send();
  }

  public async all(request: Request, response: Response): Promise<Response> {
    const hospitalService = container.resolve(CreateExpertiseService);

    const hospital = await hospitalService.showAll();

    return response.json(classToClass(hospital));
  }

  public async showById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { expertise_id } = request.params;

    const hospitalService = container.resolve(CreateExpertiseService);

    const hospital = await hospitalService.showById(expertise_id);

    return response.json(classToClass(hospital));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name } = request.body;

    const hospitalService = container.resolve(CreateExpertiseService);

    const hospital = await hospitalService.execute({
      user_id,
      name,
    });

    return response.json(classToClass(hospital));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { expertise_id, name } = request.body;

    const hospitalService = container.resolve(CreateExpertiseService);

    const hospital = await hospitalService.update({
      user_id,
      name,
      expertise_id,
    });

    return response.json(classToClass(hospital));
  }
}
