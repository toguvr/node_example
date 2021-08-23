declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  export interface Request {
    user: {
      id: string;
    };
    enterprise: {
      id: string;
    };
    connectedUsers: {
      [key: string]: string;
    };
    io: {
      to: any;
      emit: any;
    };
  }
}
