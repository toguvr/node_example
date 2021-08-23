import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import RefreshTokenService from '@modules/users/services/RefreshTokenService';

export default class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const current_refresh_token =
      request.body.current_refresh_token ||
      request.headers['x-access-token'] ||
      request.query.current_refresh_token;

    const refreshTokenService = container.resolve(RefreshTokenService);
    const refreshToken = await refreshTokenService.execute(
      current_refresh_token,
    );

    return response.json(classToClass(refreshToken));
  }
}
