import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import sendSms from '@shared/container/providers/SmsProvider';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  user_id: string;
  name: string;
  cellphone: string;
  email: string;
  old_password?: string;
  password?: string;
  number?: string;
  role?: string;
  rg?: string;
  street?: string;
  sus?: string;
  uf?: string;
  agency?: string;
  account?: string;
  bairro?: string;
  bank?: string;
  birthday?: string;
  cep?: string;
  cidade?: string;
  cpf?: string;
  crm?: string;
}

interface IRequestAdm {
  user_id: string;
  doctor_id: string;
  name: string;
  cellphone: string;
  email: string;
  old_password?: string;
  password?: string;
  number?: string;
  role?: string;
  rg?: string;
  street?: string;
  sus?: string;
  uf?: string;
  agency?: string;
  account?: string;
  bairro?: string;
  bank?: string;
  birthday?: string;
  cep?: string;
  cidade?: string;
  cpf?: string;
  crm?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async executeAdmin({
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
  }: IRequestAdm): Promise<User> {
    const admin = await this.usersRepository.findById(user_id);

    if (!admin) {
      throw new AppError('Admin não encontrado.');
    }

    if (admin.role !== 'admin') {
      throw new AppError('Você não é admin.');
    }

    const user = await this.usersRepository.findById(doctor_id);

    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('Email já está sendo usado.');
    }

    const userWithThisCellphone = await this.usersRepository.findByCellphone(
      cellphone,
    );

    if (userWithThisCellphone && userWithThisCellphone.id !== user_id) {
      throw new AppError('Celular já está sendo usado.');
    }

    user.name = name;
    user.email = email;
    user.cellphone = cellphone;
    user.number = number;
    user.role = role;
    user.rg = rg;
    user.street = street;
    user.sus = sus;
    user.uf = uf;
    user.agency = agency;
    user.account = account;
    user.bairro = bairro;
    user.bank = bank;
    user.birthday = birthday;
    user.cep = cep;
    user.cidade = cidade;
    user.cpf = cpf;
    user.crm = crm;

    if (password && !old_password) {
      throw new AppError(
        'Você precisa informar a senha antiga para trocar por uma nova.',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Senha antiga incorreta.');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }

  public async execute({
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
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('Email já está sendo usado.');
    }

    const userWithThisCellphone = await this.usersRepository.findByCellphone(
      cellphone,
    );

    if (userWithThisCellphone && userWithThisCellphone.id !== user_id) {
      throw new AppError('Celular já está sendo usado.');
    }

    user.name = name;
    user.email = email;
    user.cellphone = cellphone;
    user.number = number;
    user.role = role;
    user.rg = rg;
    user.street = street;
    user.sus = sus;
    user.uf = uf;
    user.agency = agency;
    user.account = account;
    user.bairro = bairro;
    user.bank = bank;
    user.birthday = birthday;
    user.cep = cep;
    user.cidade = cidade;
    user.cpf = cpf;
    user.crm = crm;

    if (password && !old_password) {
      throw new AppError(
        'Você precisa informar a senha antiga para trocar por uma nova.',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Senha antiga incorreta.');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}
export default UpdateProfileService;
