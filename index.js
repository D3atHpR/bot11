const { Client, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal')

const client = new Client({
    puppeteer: {
        args:['--no-sandbox'],
    }
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
});

client.on('message_create', async msg =>{
 if(msg.body == "/gpi"){
    msg.react("🤘")
    //let chat = await message.getChat();
    //if(chat.isGroup){
      /*  message.reply(`
*Detalhes do Grupo*
Nome: ${chat.name}
Descrição: ${chat.description}
Participant count: ${chat.participants.length}
                    `);
    } */
    msg.reply('EM TESTE');      
 }
 });

client.on('message_create', msg =>{
    const command = msg.body.split(' ')[0];
    const sender = msg.from.includes('92484223') ? msg.to : msg.from
    if(command === "/st") generateSticker(msg, sender)
   // if(command === "/GPI") groupinfo(msg, sender)
});

client.initialize();

/*const groupinfo = async(msg, sender) =>{
    
        message.reply(`
        
        Detalhes do Grupo
        Name: ${chat.name}
        Descrição: ${chat.description}
        Participantes: ${chat.participants.length}        
        `)
   
}*/

const generateSticker = async(msg, sender) =>{
    if(msg.type === "image"){
        try{
            const mediaObj = await msg.downloadMedia();   
            msg.react("🤘")           
      msg.reply(mediaObj, undefined, {
        sendMediaAsSticker: true,
        stickerAuthor: "By D3",
        stickerName: "Sticker",
        stickerCategories: ["St"],
      });
        }catch(e){
            msg.reply("Erro: Não foi possível processar essa Imagem!")
        }
    }   
}
