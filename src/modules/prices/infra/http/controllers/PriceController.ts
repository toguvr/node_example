import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateUserExpertiseService from '../../../services/CreatePriceService';

export default class PriceController {
  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { price_id } = request.params;

    const hospitalService = container.resolve(CreateUserExpertiseService);

    await hospitalService.delete({ user_id, price_id });

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
    const { price_id } = request.params;

    const hospitalService = container.resolve(CreateUserExpertiseService);

    const hospital = await hospitalService.showById(price_id);

    return response.json(classToClass(hospital));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const {
      expertise_id,
      hospital_id,
      doctor_price,
      total_price,
    } = request.body;

    const hospitalService = container.resolve(CreateUserExpertiseService);

    const hospital = await hospitalService.execute({
      user_id,
      expertise_id,
      hospital_id,
      doctor_price,
      total_price,
    });

    return response.json(classToClass(hospital));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const {
      price_id,
      expertise_id,
      hospital_id,
      doctor_price,
      total_price,
    } = request.body;

    const hospitalService = container.resolve(CreateUserExpertiseService);

    const hospital = await hospitalService.update({
      expertise_id,
      hospital_id,
      doctor_price,
      total_price,
      user_id,
      price_id,
    });

    return response.json(classToClass(hospital));
  }
}
