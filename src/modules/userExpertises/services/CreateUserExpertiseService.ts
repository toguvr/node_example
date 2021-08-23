import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IExpertiseRepository from '@modules/expertises/repositories/IExpertiseRepository';
import IUserExpertiseRepository from '../repositories/IUserExpertiseRepository';
import Expertise from '../infra/typeorm/entities/UserExpertise';

interface IRequest {
  user_id: string;
  owner_expertise_id: string;
  expertise_id: string;
}

interface IUpdateRequest {
  user_id: string;
  user_expertise_id: string;
  owner_expertise_id: string;
  expertise_id: string;
}

@injectable()
class CreateUserExpertiseService {
  constructor(
    @inject('ExpertiseRepository')
    private expertiseRepository: IExpertiseRepository,

    @inject('UserExpertiseRepository')
    private userExpertiseRepository: IUserExpertiseRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async delete({
    user_id,
    user_expertise_id,
  }: {
    user_id: string;
    user_expertise_id: string;
  }): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não existente.');
    }

    if (user.role === 'admin') {
      throw new AppError('Usuário não é admin.', 401);
    }

    const item = await this.userExpertiseRepository.findById(user_expertise_id);

    if (!item) {
      throw new AppError('Especialidade do usuário não existente.');
    }

    await this.userExpertiseRepository.delete(item);
  }

  public async showAll(): Promise<Expertise[]> {
    const hospitals = await this.userExpertiseRepository.findAll();

    return hospitals;
  }

  public async showById(
    user_expertise_id: string,
  ): Promise<Expertise | undefined> {
    const userExpertise = await this.userExpertiseRepository.findById(
      user_expertise_id,
    );

    if (!userExpertise) {
      throw new AppError('Usuário com esta especialidade não existente.');
    }

    return userExpertise;
  }

  public async execute({
    owner_expertise_id,
    expertise_id,
    user_id,
  }: IRequest): Promise<Expertise> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Admin não existente.');
    }

    if (user.role === 'admin') {
      throw new AppError('Usuário não é admin.', 401);
    }

    const owner_expertise = await this.usersRepository.findById(
      owner_expertise_id,
    );

    if (!owner_expertise) {
      throw new AppError('Usuário da especialidade não existente.');
    }

    const expertise = await this.expertiseRepository.findById(expertise_id);

    if (!expertise) {
      throw new AppError('Especialidade não existente.');
    }

    const existItem = await this.userExpertiseRepository.findByExpertiseIdAndUserId(
      expertise_id,
      owner_expertise_id,
    );

    if (existItem) {
      throw new AppError(
        'Já existe cadastrada esta especialidade neste usuario.',
      );
    }

    const userExpertise = await this.userExpertiseRepository.create({
      expertise_id,
      user_id: owner_expertise_id,
    });

    return userExpertise;
  }

  public async update({
    owner_expertise_id,
    expertise_id,
    user_id,
    user_expertise_id,
  }: IUpdateRequest): Promise<Expertise> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não existente.');
    }

    if (user.role === 'admin') {
      throw new AppError('Usuário não é admin.', 401);
    }

    const owner_expertise = await this.usersRepository.findById(
      owner_expertise_id,
    );

    if (!owner_expertise) {
      throw new AppError('Usuário da especialidade não existente.');
    }

    const expertise = await this.expertiseRepository.findById(expertise_id);

    if (!expertise) {
      throw new AppError('Especialidade não existente.');
    }

    const existUserExpertise = await this.userExpertiseRepository.findById(
      user_expertise_id,
    );

    if (!existUserExpertise) {
      throw new AppError('Este usuário não tem esta especialidade.');
    }

    const userExpertiseAlreadyExistsToThisUser = await this.userExpertiseRepository.findByExpertiseIdAndUserId(
      expertise_id,
      owner_expertise_id,
    );

    if (userExpertiseAlreadyExistsToThisUser) {
      throw new AppError(
        'Já existe cadastrada esta especialidade neste usuario.',
      );
    }

    existUserExpertise.expertise_id = expertise_id;
    existUserExpertise.user_id = owner_expertise_id;

    const hospital = await this.userExpertiseRepository.save(
      existUserExpertise,
    );

    return hospital;
  }
}

export default CreateUserExpertiseService;
