import AWS from 'aws-sdk';
import * as zenvia from '@zenvia/sdk';

// Função para envio da mensagem
async function sendSMS({ Message, PhoneNumber }) {
  // Initialization with your API token (x-api-token)
  const client = new zenvia.Client('iKmGfXrCvgnRPNGImalVV2oszpHPQv3Gp-KJ');

  // Choosing the channel
  const whatsapp = client.getChannel('sms');

  // Creating a text content
  const content = new zenvia.TextContent('teste doido!');

  // ES6
  whatsapp
    .sendMessage('ember-trail', '5524998169141', content)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
}

export default sendSMS;
