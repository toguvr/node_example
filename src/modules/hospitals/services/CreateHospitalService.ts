import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHospitalRepository from '../repositories/IHospitalRepository';
import Hospital from '../infra/typeorm/entities/Hospital';

interface IRequest {
  user_id: string;
  name: string;
  logradouro: string;
  numero: string;
  cep: string;
  bairro: string;
  cidade: string;
  uf: string;
}

interface IUpdateRequest {
  user_id: string;
  hospital_id: string;
  name: string;
  logradouro: string;
  numero: string;
  cep: string;
  bairro: string;
  cidade: string;
  uf: string;
}

@injectable()
class CreateHospitalService {
  constructor(
    @inject('HospitalRepository')
    private hospitalRepository: IHospitalRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async delete({
    user_id,
    hospital_id,
  }: {
    user_id: string;
    hospital_id: string;
  }): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não existente.');
    }

    if (user.role === 'admin') {
      throw new AppError('Usuário não é admin.');
    }

    const hospital = await this.hospitalRepository.findById(hospital_id);

    if (!hospital) {
      throw new AppError('Hospital não existente.');
    }

    await this.hospitalRepository.delete(hospital);
  }

  public async showAll(): Promise<Hospital[]> {
    const hospitals = await this.hospitalRepository.findAllHospitals();

    return hospitals;
  }

  public async showById(hospital_id: string): Promise<Hospital | undefined> {
    const hospital = await this.hospitalRepository.findById(hospital_id);

    if (!hospital) {
      throw new AppError('Hospital não existente.');
    }

    return hospital;
  }

  public async execute({
    user_id,
    name,
    logradouro,
    numero,
    cep,
    bairro,
    cidade,
    uf,
  }: IRequest): Promise<Hospital> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não existente.');
    }

    if (user.role === 'admin') {
      throw new AppError('Usuário não é admin.');
    }

    const existHospitalName = await this.hospitalRepository.findByName(name);

    if (existHospitalName) {
      throw new AppError('Já existe um hospital com este nome cadastrado.');
    }

    const hospital = await this.hospitalRepository.create({
      name,
      logradouro,
      numero,
      cep,
      bairro,
      cidade,
      uf,
    });

    return hospital;
  }

  public async update({
    user_id,
    hospital_id,
    name,
    logradouro,
    numero,
    cep,
    bairro,
    cidade,
    uf,
  }: IUpdateRequest): Promise<Hospital> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não existente.');
    }

    if (user.role === 'admin') {
      throw new AppError('Usuário não é admin.');
    }

    const existHospital = await this.hospitalRepository.findById(hospital_id);

    if (!existHospital) {
      throw new AppError('Hospital não existe.');
    }

    if (name !== existHospital.name) {
      const existHospitalName = await this.hospitalRepository.findByName(name);

      if (existHospitalName) {
        throw new AppError('Já existe um hospital com este nome cadastrado.');
      }
    }

    existHospital.name = name;
    existHospital.bairro = bairro;
    existHospital.cep = cep;
    existHospital.cidade = cidade;
    existHospital.logradouro = logradouro;
    existHospital.numero = numero;
    existHospital.uf = uf;

    const hospital = await this.hospitalRepository.save(existHospital);

    return hospital;
  }
}

export default CreateHospitalService;
