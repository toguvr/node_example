import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateAppointmentSolicitationService from '../../../services/CreateAppointmentSolicitationService';

export default class AppointmentSolicitationController {
  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { appointmentSolicitation_id } = request.params;

    const appointmentSolicitationService = container.resolve(
      CreateAppointmentSolicitationService,
    );

    await appointmentSolicitationService.delete({
      user_id,
      appointmentSolicitation_id,
    });

    return response.status(204).send();
  }

  public async all(request: Request, response: Response): Promise<Response> {
    const appointmentSolicitationService = container.resolve(
      CreateAppointmentSolicitationService,
    );

    const hospital = await appointmentSolicitationService.showAll();

    return response.json(classToClass(hospital));
  }

  public async showById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { appointmentSolicitation_id } = request.params;

    const appointmentSolicitationService = container.resolve(
      CreateAppointmentSolicitationService,
    );

    const hospital = await appointmentSolicitationService.showById(
      appointmentSolicitation_id,
    );

    return response.json(classToClass(hospital));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { appointment_id, user_to_appointment_id } = request.body;

    const appointmentSolicitationService = container.resolve(
      CreateAppointmentSolicitationService,
    );

    const hospital = await appointmentSolicitationService.execute({
      user_id,
      appointment_id,
      user_to_appointment_id,
    });

    return response.json(classToClass(hospital));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const {
      appointmentSolicitation_id,
      appointment_id,
      user_to_appointment_id,
    } = request.body;

    const appointmentSolicitationService = container.resolve(
      CreateAppointmentSolicitationService,
    );

    const hospital = await appointmentSolicitationService.update({
      appointmentSolicitation_id,
      appointment_id,
      user_to_appointment_id,
      user_id,
    });

    return response.json(classToClass(hospital));
  }
}
