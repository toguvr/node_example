import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IExpertiseRepository from '@modules/expertises/repositories/IExpertiseRepository';
import IHospitalRepository from '@modules/hospitals/repositories/IHospitalRepository';
import IPriceRepository from '../repositories/IPriceRepository';
import Price from '../infra/typeorm/entities/Price';

interface IRequest {
  user_id: string;
  hospital_id: string;
  expertise_id: string;
  doctor_price: number;
  total_price: number;
}

interface IUpdateRequest {
  price_id: string;
  user_id: string;
  hospital_id: string;
  expertise_id: string;
  doctor_price: number;
  total_price: number;
}

@injectable()
class CreatePriceService {
  constructor(
    @inject('ExpertiseRepository')
    private expertiseRepository: IExpertiseRepository,

    @inject('priceRepository')
    private priceRepository: IPriceRepository,

    @inject('hospitalRepository')
    private hospitalRepository: IHospitalRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async delete({
    user_id,
    price_id,
  }: {
    user_id: string;
    price_id: string;
  }): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não existente.');
    }

    if (user.role === 'admin') {
      throw new AppError('Usuário não é admin.', 401);
    }

    const item = await this.priceRepository.findById(price_id);

    if (!item) {
      throw new AppError('Especialidade do usuário não existente.');
    }

    await this.priceRepository.delete(item);
  }

  public async showAll(): Promise<Price[]> {
    const prices = await this.priceRepository.findAll();

    return prices;
  }

  public async showById(price_id: string): Promise<Price | undefined> {
    const price = await this.priceRepository.findById(price_id);

    if (!price) {
      throw new AppError('Usuário com esta especialidade não existente.');
    }

    return price;
  }

  public async execute({
    expertise_id,
    hospital_id,
    doctor_price,
    total_price,
    user_id,
  }: IRequest): Promise<Price> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Admin não existente.');
    }

    if (user.role === 'admin') {
      throw new AppError('Usuário não é admin.', 401);
    }

    const hospital = await this.hospitalRepository.findById(hospital_id);

    if (!hospital) {
      throw new AppError('Hospital não existente.');
    }

    const expertise = await this.expertiseRepository.findById(expertise_id);

    if (!expertise) {
      throw new AppError('Especialidade não existente.');
    }

    const existItem = await this.priceRepository.findByExpertiseIdAndHospitalId(
      expertise_id,
      hospital_id,
    );

    if (existItem) {
      throw new AppError(
        'Já existe cadastrado um preço para esta especialidade neste hospital.',
      );
    }

    const userExpertise = await this.priceRepository.create({
      expertise_id,
      hospital_id,
      doctor_price,
      total_price,
    });

    return userExpertise;
  }

  public async update({
    expertise_id,
    hospital_id,
    doctor_price,
    total_price,
    user_id,
    price_id,
  }: IUpdateRequest): Promise<Price> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não existente.');
    }

    if (user.role === 'admin') {
      throw new AppError('Usuário não é admin.', 401);
    }

    const hospital = await this.hospitalRepository.findById(hospital_id);

    if (!hospital) {
      throw new AppError('Hospital não existente.');
    }

    const expertise = await this.expertiseRepository.findById(expertise_id);

    if (!expertise) {
      throw new AppError('Especialidade não existente.');
    }

    const price = await this.priceRepository.findById(price_id);

    if (!price) {
      throw new AppError('Preço não existente.');
    }

    const existItem = await this.priceRepository.findByExpertiseIdAndHospitalId(
      expertise_id,
      hospital_id,
    );

    if (existItem) {
      throw new AppError(
        'Já existe cadastrado um preço para esta especialidade neste hospital.',
      );
    }

    price.expertise_id = expertise_id;
    price.doctor_price = doctor_price;
    price.hospital_id = hospital_id;
    price.total_price = total_price;

    await this.priceRepository.save(price);

    return price;
  }
}

export default CreatePriceService;
