import { Request, Response } from 'express';

import { container } from 'tsyringe';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import { classToClass } from 'class-transformer';

export default class ProfileController {
  async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    return response.json(classToClass(user));
  }

  async updateAdmin(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      old_password,
      cellphone,
      number,
      role,
      rg,
      street,
      sus,
      uf,
      agency,
      account,
      bairro,
      bank,
      birthday,
      cep,
      cidade,
      cpf,
      crm,
      doctor_id,
    } = request.body;
    const user_id = request.user.id;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.executeAdmin({
      user_id,
      name,
      email,
      cellphone,
      password,
      old_password,
      number,
      role,
      rg,
      street,
      sus,
      uf,
      agency,
      account,
      bairro,
      bank,
      birthday,
      cep,
      cidade,
      cpf,
      crm,
      doctor_id,
    });

    return response.json(classToClass(user));
  }

  async update(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      old_password,
      cellphone,
      number,
      role,
      rg,
      street,
      sus,
      uf,
      agency,
      account,
      bairro,
      bank,
      birthday,
      cep,
      cidade,
      cpf,
      crm,
    } = request.body;
    const user_id = request.user.id;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      cellphone,
      password,
      old_password,
      number,
      role,
      rg,
      street,
      sus,
      uf,
      agency,
      account,
      bairro,
      bank,
      birthday,
      cep,
      cidade,
      cpf,
      crm,
    });

    return response.json(classToClass(user));
  }
}
