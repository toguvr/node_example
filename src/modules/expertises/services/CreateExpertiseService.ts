import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IExpertiseRepository from '../repositories/IExpertiseRepository';
import Expertise from '../infra/typeorm/entities/Expertise';

interface IRequest {
  user_id: string;
  name: string;
}

interface IUpdateRequest {
  user_id: string;
  expertise_id: string;
  name: string;
}

@injectable()
class CreateExpertiseService {
  constructor(
    @inject('ExpertiseRepository')
    private expertiseRepository: IExpertiseRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async delete({
    user_id,
    expertise_id,
  }: {
    user_id: string;
    expertise_id: string;
  }): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não existente.');
    }

    if (user.role === 'admin') {
      throw new AppError('Usuário não é admin.', 401);
    }

    const hospital = await this.expertiseRepository.findById(expertise_id);

    if (!hospital) {
      throw new AppError('Hospital não existente.');
    }

    await this.expertiseRepository.delete(hospital);
  }

  public async showAll(): Promise<Expertise[]> {
    const hospitals = await this.expertiseRepository.findAll();

    return hospitals;
  }

  public async showById(expertise_id: string): Promise<Expertise | undefined> {
    const hospital = await this.expertiseRepository.findById(expertise_id);

    if (!hospital) {
      throw new AppError('Hospital não existente.');
    }

    return hospital;
  }

  public async execute({ user_id, name }: IRequest): Promise<Expertise> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não existente.');
    }

    if (user.role === 'admin') {
      throw new AppError('Usuário não é admin.', 401);
    }

    const existItemName = await this.expertiseRepository.findByName(name);

    if (existItemName) {
      throw new AppError('Já existe um hospital com este nome cadastrado.');
    }

    const hospital = await this.expertiseRepository.create({
      name,
    });

    return hospital;
  }

  public async update({
    user_id,
    expertise_id,
    name,
  }: IUpdateRequest): Promise<Expertise> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não existente.');
    }

    if (user.role === 'admin') {
      throw new AppError('Usuário não é admin.', 401);
    }

    const existItem = await this.expertiseRepository.findById(expertise_id);

    if (!existItem) {
      throw new AppError('Hospital não existe.');
    }

    if (name !== existItem.name) {
      const existItemName = await this.expertiseRepository.findByName(name);

      if (existItemName) {
        throw new AppError('Já existe um hospital com este nome cadastrado.');
      }
    }

    existItem.name = name;

    const hospital = await this.expertiseRepository.save(existItem);

    return hospital;
  }
}

export default CreateExpertiseService;
