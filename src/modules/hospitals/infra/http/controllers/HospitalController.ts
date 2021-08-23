import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateHospitalService from '@modules/hospitals/services/CreateHospitalService';
import { classToClass } from 'class-transformer';

export default class HospitalController {
  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { hospital_id } = request.params;

    const hospitalService = container.resolve(CreateHospitalService);

    await hospitalService.delete({ user_id, hospital_id });

    return response.status(204).send();
  }

  public async all(request: Request, response: Response): Promise<Response> {
    const hospitalService = container.resolve(CreateHospitalService);

    const hospital = await hospitalService.showAll();

    return response.json(classToClass(hospital));
  }

  public async showById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { hospital_id } = request.params;

    const hospitalService = container.resolve(CreateHospitalService);

    const hospital = await hospitalService.showById(hospital_id);

    return response.json(classToClass(hospital));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, logradouro, numero, cep, bairro, cidade, uf } = request.body;

    const hospitalService = container.resolve(CreateHospitalService);

    const hospital = await hospitalService.execute({
      user_id,
      name,
      logradouro,
      numero,
      cep,
      bairro,
      cidade,
      uf,
    });

    return response.json(classToClass(hospital));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const {
      hospital_id,
      name,
      logradouro,
      numero,
      cep,
      bairro,
      cidade,
      uf,
    } = request.body;

    const hospitalService = container.resolve(CreateHospitalService);

    const hospital = await hospitalService.update({
      user_id,
      name,
      logradouro,
      numero,
      cep,
      bairro,
      cidade,
      uf,
      hospital_id,
    });

    return response.json(classToClass(hospital));
  }
}
