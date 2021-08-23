import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IUserDocumentRepository from '../repositories/IUserDocumentRepository';
import UserDocument from '../infra/typeorm/entities/UserDocument';

interface IRequest {
  document_owner_id: string;
  type: string;
  user_id: string;
  documentFilename: string;
}

interface IShowRequest {
  type: string;
  user_id: string;
  documentFilename: string;
}

@injectable()
class CreateInvitedService {
  constructor(
    @inject('UserDocumentRepository')
    private userDocumentRepository: IUserDocumentRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async showMe(user_id: string): Promise<UserDocument[]> {
    const documentOwner = await this.usersRepository.findById(user_id);

    if (!documentOwner) {
      throw new AppError('Usuário não existente.');
    }

    const documents = await this.userDocumentRepository.findAllByUserId(
      user_id,
    );

    return documents;
  }

  public async showUserDocuments({
    document_owner_id,
    user_id,
  }: {
    user_id: string;
    document_owner_id: string;
  }): Promise<UserDocument[]> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não existente.');
    }

    if (user.role !== 'admin') {
      throw new AppError('Usuário não é administrador.', 401);
    }

    const documentOwner = await this.usersRepository.findById(
      document_owner_id,
    );

    if (!documentOwner) {
      throw new AppError('Usuário não existente.');
    }

    const documents = await this.userDocumentRepository.findAllByUserId(
      document_owner_id,
    );

    return documents;
  }

  public async deleteDocument({
    user_id,
    document_id,
  }: {
    user_id: string;
    document_id: string;
  }): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não existente.');
    }

    if (user.role !== 'admin') {
      throw new AppError('Usuário não é administrador.', 401);
    }

    const document = await this.userDocumentRepository.findById(document_id);

    if (!document) {
      throw new AppError('Documento não existente.');
    }

    if (document.document) {
      // Deletar documento do storage antes de deletar do bd

      await this.storageProvider.deleteFile(document.document);
    }

    await this.userDocumentRepository.delete(document);
  }

  public async createOwner({
    type,
    user_id,
    documentFilename,
  }: IShowRequest): Promise<UserDocument> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não existente.');
    }

    const filename = await this.storageProvider.saveFile(documentFilename);

    const document = await this.userDocumentRepository.create({
      type,
      user_id,
      document: filename,
    });

    return document;
  }

  public async execute({
    document_owner_id,
    type,
    user_id,
    documentFilename,
  }: IRequest): Promise<UserDocument> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não existente.');
    }

    if (user.role !== 'admin') {
      throw new AppError('Usuário não é administrador.', 401);
    }

    const document_owner = await this.usersRepository.findById(
      document_owner_id,
    );

    if (!document_owner) {
      throw new AppError('Dono do documento não existente.');
    }

    const filename = await this.storageProvider.saveFile(documentFilename);

    const document = await this.userDocumentRepository.create({
      type,
      user_id: document_owner_id,
      document: filename,
    });

    return document;
  }
}

export default CreateInvitedService;
