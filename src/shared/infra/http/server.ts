import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import Youch from 'youch';
import helmet from 'helmet';
import { errors } from 'celebrate';
import 'express-async-errors';

import sentryConfig from '@config/sentry';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import socketio from 'socket.io';
import http from 'http';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import rateLimiter from './middlewares/rateLimiter';
import routes from './routes';
import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: sentryConfig.dns,
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
  });
}

const server = http.createServer(app);

const io = socketio(server);

const connectedUsers = {} as { [key: string]: any };

io.on('connection', socket => {
  const { user_id } = socket.handshake.query;
  connectedUsers[user_id] = socket.id;

  socket.on('disconnect', () => {
    delete connectedUsers[user_id];
  });
});

app.use((request: Request, res: Response, next: NextFunction) => {
  request.io = io;
  request.connectedUsers = connectedUsers;

  return next();
});

app.use(
  cors({
    origin: [
      process.env.APP_WEB_URL as string,
      'http://localhost:3000',
      'http://localhost:3333',
      'http://pallydb.herokuapp.com/',
      'https://pallydb.herokuapp.com/',
    ],
  }),
);
app.use(helmet());
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(rateLimiter);
app.use(routes);

app.use(
  Sentry.Handlers.errorHandler({
    serverName: false,
    user: ['email'],
  }),
);
app.use(errors());

app.use(
  async (err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    // if (process.env.NODE_ENV === 'development') {
    const youcherrors = await new Youch(err, request).toJSON();

    return response.status(500).json(youcherrors);
    // }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

server.listen(process.env.PORT || 3333, () => {
  console.log(
    `🦾 Server started on http://localhost:${process.env.PORT || 3333}`,
  );
});
