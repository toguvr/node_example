import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateAppointmentService from '../../../services/CreateAppointmentService';

export default class AppointmentController {
  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { appointment_id } = request.params;

    const appointmentService = container.resolve(CreateAppointmentService);

    await appointmentService.delete({ user_id, appointment_id });

    return response.status(204).send();
  }

  public async all(request: Request, response: Response): Promise<Response> {
    const appointmentService = container.resolve(CreateAppointmentService);

    const hospital = await appointmentService.showAll();

    return response.json(classToClass(hospital));
  }

  public async showById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { appointment_id } = request.params;

    const appointmentService = container.resolve(CreateAppointmentService);

    const hospital = await appointmentService.showById(appointment_id);

    return response.json(classToClass(hospital));
  }

  public async showMyNext(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;

    const appointmentService = container.resolve(CreateAppointmentService);

    const hospital = await appointmentService.showMyNext(user_id);

    return response.json(classToClass(hospital));
  }

  public async showByExpertiseAdvert(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { expertise_id } = request.params;

    const appointmentService = container.resolve(CreateAppointmentService);

    const hospital = await appointmentService.showByExpertisesAdverts(
      expertise_id,
    );

    return response.json(classToClass(hospital));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const {
      user_appointment_id,
      hospital_id,
      expertise_id,
      title,
      date,
    } = request.body;

    const appointmentService = container.resolve(CreateAppointmentService);

    const hospital = await appointmentService.execute({
      user_id,
      user_appointment_id,
      hospital_id,
      expertise_id,
      title,
      date,
    });

    return response.json(classToClass(hospital));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const {
      appointment_id,
      user_appointment_id,
      hospital_id,
      expertise_id,
      title,
      date,
    } = request.body;

    const appointmentService = container.resolve(CreateAppointmentService);

    const hospital = await appointmentService.update({
      user_id,
      user_appointment_id,
      hospital_id,
      expertise_id,
      title,
      date,
      appointment_id,
    });

    return response.json(classToClass(hospital));
  }
}
