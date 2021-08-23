interface IMailConfig {
  driver: 'sms';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.SMS_DRIVER || 'sms',

  defaults: {
    from: {
      email: 'contato@nahora.app.br',
      name: 'Augusto do NaHora',
    },
  },
} as IMailConfig;
