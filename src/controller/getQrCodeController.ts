import * as venom from 'venom-bot'

venom
  .create(
    'sessionName',
    (base64Qr, asciiQR, attempts, urlCode) => {
      console.log(asciiQR);
    //   var matches:any = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    //   response:any = {};

    //   if (matches.length !== 3) {
    //     return new Error('Invalid input string');
    //   }
    //   response.type = matches[1];
    //   response.data = Buffer.from(matches[2], 'base64');

    //   var imageBuffer = response;
    //   require('fs').writeFile(
    //     'out.png',
    //     imageBuffer['data'],
    //     'binary',
    //     function (err: any) {
    //       if (err != null) {
    //         console.log(err);
    //       }
    //     }
    //   );
    },
    undefined,
    { logQR: false }
  )
  .then((client) => {
    start(client);
  })
  .catch((erro) => {
    console.log(erro);
  });

function start(client: venom.Whatsapp) {
client.onMessage((message: any) => {
    if (message.body === 'Hi' && message.isGroupMsg === false) {
    client
        .sendText(message.from, 'Welcome Venom 🕷')
        .then((result: any) => {
        console.log('Result: ', result);
        })
        .catch((erro: Error) => {
        console.error('Error when sending: ', erro);
        });
    }
});
}