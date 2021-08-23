import Totalvoice from 'totalvoice-node';

interface ISMSContact {
  phone: string;
  newMessage: string;
}

const sendSms = async ({ phone, newMessage }: ISMSContact) => {
  const client = new Totalvoice(process.env.TOKEN_VOICE);

  const resposta_usuario = false;
  const multi_sms = false;
  const data_criacao = '';
  client.sms
    .enviar(phone, newMessage, resposta_usuario, multi_sms, data_criacao)
    .then(function (data) {
      // console.log('numero:', phone);
      // console.log(data);
    })
    .catch(function (error) {
      console.error('numero:', phone);
      console.error('Erro: ', error);
    });
};

export default sendSms;
