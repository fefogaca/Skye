// -------------------------------------
//
// Copyright (c) 2003 Skye WhatsApp Services Inc.
// All Rights Reserved
//
// This product is protected by copyright and distributed under
// licenses restricting copying, distribution, and decompilation.
//
// -------------------------------------

const {
    BufferJSON,
    WA_DEFAULT_EPHEMERAL,
    generateWAMessageFromContent,
    downloadContentFromMessage,
    proto,
    generateWAMessageContent,
    generateWAMessage,
    prepareWAMessageMedia,
    areJidsSameUser,
    getContentType
} = require('@whiskeysockets/baileys')
const os = require('os')
const fs = require('fs')
const fsx = require('fs-extra')
const path = require('path')
const qs = require('qs')
const util = require('util')
const chalk = require('chalk')
const cheerio = require("cheerio")
const moment = require('moment-timezone')
const speed = require('performance-now')
const ms = toMs = require('ms')
const axios = require('axios')
const request = require('request');
const fetch = require('node-fetch')
const {
    exec,
    spawn,
    execSync
} = require("child_process")
const {
    performance
} = require('perf_hooks')
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)
const {
    TelegraPh,
    UploadFileUgu,
    webp2mp4File,
    floNime
} = require('./lib/uploader')
const {
    toAudio,
    toPTT,
    toVideo,
    ffmpeg,
    addExifAvatar
} = require('./lib/converter')
const {
    smsg,
    getGroupAdmins,
    formatp,
    jam,
    formatDate,
    getTime,
    isUrl,
    await,
    sleep,
    clockString,
    msToDate,
    sort,
    toNumber,
    enumGetKey,
    runtime,
    fetchJson,
    json,
    delay,
    format,
    logic,
    generateProfilePicture,
    parseMention,
    getRandom,
    pickRandom,
    reSize
} = require('./lib/myfunc')
let afk = require("./lib/afk");
const {
    addPremiumUser,
    getPremiumExpired,
    getPremiumPosition,
    expiredCheck,
    checkPremiumUser,
    getAllPremiumUser
} = require('./lib/premiun')
const {
    fetchBuffer,
    buffergif
} = require("./lib/myfunc2")
const ytdl = require('ytdl-core');
const {
    youtubedl,
    youtubedlv2
} = require('@bochilteam/scraper');
const {
    payment
} = require("./lib/pix_mp/index.js")
const mimetype = require("mime-types")
const getFileBuffer = async (mediakey, MediaType) => {
    const stream = await downloadContentFromMessage(mediakey, MediaType)
    let buffer = Buffer.from([])
    for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk])
    }
    return buffer
}
const getExtension = async (type) => {
    //  return await mimetype.extension(type)
}
const getBuffer = (url, options) => new Promise(async (resolve, reject) => {
    options ? options : {}
    await axios({
        method: "get",
        url,
        headers: {
            "DNT": 1,
            "Upgrade-Insecure-Request": 1
        },
        ...options,
        responseType: "arraybuffer"
    }).then((res) => {
        resolve(res.data)
    }).catch(reject)
})

// Database
let premium = JSON.parse(fs.readFileSync('./database/premium.json'))
function updatePremiumUser(userNumber, duracaoPremium) {
    const path = './database/premium.json';
    const premiumData = JSON.parse(fs.readFileSync(path, 'utf8'));

    // Verifica se o usuário já está na lista
    const existingUserIndex = premiumData.findIndex(user => user.id === userNumber);
    const expirationDate = new Date().getTime() + parseDuration(duracaoPremium); // Calcula a nova data de expiração

    if (existingUserIndex !== -1) {
        // Atualiza a data de expiração se o usuário já estiver na lista
        premiumData[existingUserIndex].expired = expirationDate;
    } else {
        // Adiciona o novo usuário à lista
        premiumData.push({ id: userNumber, expired: expirationDate });
    }

    // Escreve os dados atualizados de volta ao arquivo
    fs.writeFileSync(path, JSON.stringify(premiumData, null, 2), 'utf8');
}

// Função auxiliar para converter a duração em milissegundos
function parseDuration(duration) {
    const match = duration.match(/(\d+)([dhm])/);
    if (!match) return 0;
    
    const value = parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
        case 'd': return value * 24 * 60 * 60 * 1000; // dias
        case 'h': return value * 60 * 60 * 1000; // horas
        case 'm': return value * 60 * 1000; // minutos
        default: return 0;
    }
}

let dono = JSON.parse(fs.readFileSync('./database/dono.json'))
let dono2 = JSON.parse(fs.readFileSync('./database/dono.json'))
let numdev = JSON.parse(fs.readFileSync('./database/numdev.json'))
let _afk = JSON.parse(fs.readFileSync('./database/afk-user.json'))
let hit = JSON.parse(fs.readFileSync('./database/total-hit-user.json'))

// Limite de uso diario dos comandos Tiktok / Twitter / Instagram
const twitterUsageFilePath = './database/twitter_usage.json';
const instagramUsageFilePath = './database/instagram_usage.json';
const usageFilePath = './database/tiktok_usage.json';
const premiumFilePath = './database/premium.json';

function removeFromUsageFile(userId, filePath) {
    if (fs.existsSync(filePath)) {
        let usageData = JSON.parse(fs.readFileSync(filePath));
        delete usageData[userId];
        fs.writeFileSync(filePath, JSON.stringify(usageData, null, 2));
    }
}

function addToUsageFile(userId, filePath) {
    let usageData = {};
    if (fs.existsSync(filePath)) {
        usageData = JSON.parse(fs.readFileSync(filePath));
    }
    usageData[userId] = { date: new Date().toISOString().split('T')[0], count: 0 };
    fs.writeFileSync(filePath, JSON.stringify(usageData, null, 2));
}

function addNewPremiumUser(userId) {
    let premiumData = JSON.parse(fs.readFileSync(premiumFilePath));
    premiumData.push({ id: userId, expired: Date.now() + 30 * 24 * 60 * 60 * 1000 });
    fs.writeFileSync(premiumFilePath, JSON.stringify(premiumData, null, 2));
    removeFromUsageFile(userId, usageFilePath); // Para TikTok
    removeFromUsageFile(userId, instagramUsageFilePath); // Para Instagram
    removeFromUsageFile(userId, twitterUsageFilePath); // Para Twitter
}

function checkPremiumExpiration() {
    let premiumData = JSON.parse(fs.readFileSync(premiumFilePath));
    let now = Date.now();
    let updatedPremiumData = premiumData.filter(user => {
        if (user.expired < now) {
            addToUsageFile(user.id, usageFilePath); // Para TikTok
            addToUsageFile(user.id, instagramUsageFilePath); // Para Instagram
            addToUsageFile(user.id, twitterUsageFilePath); // Para Twitter
            return false;
        }
        return true;
    });
    fs.writeFileSync(premiumFilePath, JSON.stringify(updatedPremiumData, null, 2));
}

setInterval(checkPremiumExpiration, 24 * 60 * 60 * 1000);



// Função para salvar o uso do TikTok
const saveTikTokUsage = (userId, usage) => {
    console.log(`[saveTikTokUsage] Salvando uso para o usuário: ${userId} - Contagem: ${usage.count}, Último reset: ${usage.lastReset}`);
    const usageData = JSON.parse(fs.readFileSync(tiktokUsagePath));
    usageData[userId] = usage;
    fs.writeFileSync(tiktokUsagePath, JSON.stringify(usageData));
};

// Função para resetar contagem diária
const resetDailyUsage = (usage, userId) => {
    const now = moment();
    const lastResetMoment = moment(usage.lastReset);
    const startOfDay = moment().startOf('day');

    console.log(`[resetDailyUsage] Tempo atual: ${now.format()}`);
    console.log(`[resetDailyUsage] Último reset: ${lastResetMoment.format()}`);
    console.log(`[resetDailyUsage] Início do dia: ${startOfDay.format()}`);
    console.log(`[resetDailyUsage] Checando se o último reset é antes do início do dia: ${lastResetMoment.isBefore(startOfDay)}`);

    if (lastResetMoment.isBefore(startOfDay)) {
        console.log(`[resetDailyUsage] Uso resetado. Último reset: ${lastResetMoment.format()}`);
        usage.count = 0;
        usage.lastReset = now.valueOf();
        saveTikTokUsage(userId, usage); // Salva o uso atualizado após o reset
    } else {
        console.log(`[resetDailyUsage] Uso não foi resetado. Último reset: ${lastResetMoment.format()}`);
    }
};



// Notificação de usuário premium

// Função para verificar expiração de premium e enviar notificações
const checkPremiumExpirations = async () => {
    const now = Date.now();
    const reminderDays = 5; // Dias antes da expiração para enviar lembrete
    const reminderMs = reminderDays * 24 * 60 * 60 * 1000; // Converter dias para milissegundos

    const premium = JSON.parse(fs.readFileSync('./database/premium.json'));

    for (const user of premium) {
        const timeLeft = user.expired - now;
        if (timeLeft > 0 && timeLeft <= reminderMs) {
            // Tempo de expiração está dentro do período de lembrete
            await Skye.sendMessage(user.id, {
                text: `🔔 Olá! Seu acesso premium está prestes a expirar em ${Math.ceil(timeLeft / (24 * 60 * 60 * 1000))} dias. Renove para continuar aproveitando os benefícios premium!`
            });
        }
    }
};

// Agende a função para ser executada diariamente
setInterval(checkPremiumExpirations, 24 * 60 * 60 * 1000); // Verifica diariamente

// Executa a verificação imediatamente ao iniciar o bot
checkPremiumExpirations();


// Consts para indicar tempo/hora
const Tempo = moment.tz('America/Sao_Paulo').format('HH:mm:ss')
const Data = moment.tz('America/Sao_Paulo').format('DD/MM/YYYY')
const time2 = moment().tz('America/Sao_Paulo').format('HH:mm:ss')
if (time2 < "00:00:00") {
    var Horas = `Boa Madrugada 🌌`
}
if (time2 < "19:00:00") {
    var Horas = `Boa noite 🌃`
}
if (time2 < "18:00:00") {
    var Horas = `Boa noite 🌃`
}
if (time2 < "15:00:00") {
    var Horas = `Boa tarde 🌅`
}
if (time2 < "11:00:00") {
    var Horas = `Bom dia 🌄`
}
if (time2 < "05:00:00") {
    var Horas = `Bom dia 🌄`
}
module.exports = Skye = async (Skye, m, msg, chatUpdate, store) => {
    try {
        const {
            type,
            quotedMsg,
            mentioned,
            now,
            fromMe
        } = m
        var body = m.message?.conversation || m.message?.viewOnceMessageV2?.message?.imageMessage?.caption || m.message?.viewOnceMessageV2?.message?.videoMessage?.caption || m.message?.imageMessage?.caption || m.message?.videoMessage?.caption || m.message?.extendedTextMessage?.text || m.message?.viewOnceMessage?.message?.videoMessage?.caption || m.message?.viewOnceMessage?.message?.imageMessage?.caption || m.message?.documentWithCaptionMessage?.message?.documentMessage?.caption || m.message?.buttonsMessage?.imageMessage?.caption || m.message?.buttonsResponseMessage?.selectedButtonId || m.message?.listResponseMessage?.singleSelectReply?.selectedRowId || m.message?.templateButtonReplyMessage?.selectedId || m?.text || ""
//        var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectenviar.selectedRowId : (m.mtype == 'templateButtonenviarMessage') ? m.message.templateButtonenviarMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectenviar.selectedRowId || m.text) : ''
        var budy = (typeof m.text == 'string' ? m.text : '')
        var prefix = prefa ? /^[/]/gi.test(body) ? body.match(/^[/]/gi)[0] : "" : prefa ?? global.prefix
        const isCmd = body.startsWith(prefix)
        const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1)
        const full_args = body.replace(command, '').slice(1).trim()
        const pushname = m.pushName || "No Name"
        const botNumber = await Skye.decodeJid(Skye.user.id)
        const itsMe = m.sender == botNumber ? true : false
        const sender = m.sender
        const text = q = args.join(" ")
        const from = m.key.remoteJid
        const fatkuns = (m.quoted || m)
        const quoted = (fatkuns.mtype == 'buttonsMessage') ? fatkuns[Object.keys(fatkuns)[1]] : (fatkuns.mtype == 'templateMessage') ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] : (fatkuns.mtype == 'product') ? fatkuns[Object.keys(fatkuns)[0]] : m.quoted ? m.quoted : m
        const mime = (quoted.msg || quoted).mimetype || ''
        const qmsg = (quoted.msg || quoted)
        const isMedia = /image|video|sticker|audio/.test(mime)
        const isImage = (type == 'imageMessage')
        const isVideo = (type == 'videoMessage')
        const isAudio = (type == 'audioMessage')
        const isText = (type == 'textMessage')
        const isSticker = (type == 'stickerMessage')
        const isQuotedText = type === 'extendexTextMessage' && content.includes('textMessage')
        const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
        const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage')
        const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
        const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
        const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
        const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage')
        const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')
        const sticker = []
        const isAfkOn = afk.checkAfkUser(m.sender, _afk)
        const isGroup = m.key.remoteJid.endsWith('@g.us')
        const groupMetadata = m.isGroup ? await Skye.groupMetadata(m.chat).catch(e => { }) : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''
        const participants = m.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
        const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
        const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
        const groupOwner = m.isGroup ? groupMetadata.dono : ''
        const isGroupOwner = m.isGroup ? (groupOwner ? groupOwner : groupAdmins).includes(m.sender) : false
        const SkyeCreator = [ownernumber, ...dono2].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const SkyePremium = SkyeCreator || SkyeCreator || checkPremiumUser(m.sender, premium);
        expiredCheck(Skye, m, premium);
        // Const para enviar mensagem para os usuários
        const SkyeEnviar = (teks) => {
            Skye.sendMessage(m.chat, {
                text: teks,
                contextInfo: {
                    mentionedJid: [sender],
                    // Formato para mandar selo com imagem customizada, porém não são todos os dispositivos que funcionam essa função
                    /*"externalAdReply": {
                    "showAdAttribution": true,
                    "containsAutoReply": true,
                    "title": ` ${global.botname}`,
                    "body": `${ownername}`,
                    "previewType": "PHOTO",
                    "thumbnailUrl": `https://telegra.ph/file/e1ecc93149ae85ad1b860.jpg`,
                    "thumbnail": fs.readFileSync(`./Medias/Skyethumb.jpg`),
                    "sourceUrl": `${link}`}*/
                }
            }, {
                quoted: m
            })
        }

        if (!Skye.public) {
            if (!SkyeCreator && !m.key.fromMe) return
        }
        if (autoread) {
            Skye.readMessages([m.key])
        }
        if (global.autoTyping) {

            Skye.sendPresenceUpdate('composing', from)


        }

        if (global.autoRecording) {

            Skye.sendPresenceUpdate('recording', from)

        }


        // Status online do número do bot, available = Online, unavailable = Offline
        Skye.sendPresenceUpdate('available', from)

        if (global.autorecordtype) {
            let xeonrecordin = ['recording', 'composing']

            let xeonrecordinfinal = xeonrecordin[Math.floor(Math.random() * xeonrecordin.length)]

            Skye.sendPresenceUpdate(xeonrecordinfinal, from)

        }

        if (autobio) {
            Skye.updateProfileStatus(`BOT Online, desenvolvido por ${ownername}`).catch(_ => _)
        }
        if (m.sender.startsWith('92') && global.anti92 === true) {
            return Skye.updateBlockStatus(m.sender, 'block')
        }
        let list = []
        for (let i of numdev) {
            list.push({
                displayName: await Skye.getName(i),
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await Skye.getName(i)}\nFN:${await Skye.getName(i)}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Click here to chat\nitem2.EMAIL;type=INTERNET:${ytname}\nitem2.X-ABLabel:YouTube\nitem3.URL:${socialm}\nitem3.X-ABLabel:GitHub\nitem4.ADR:;;${location};;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
            })
        }

        // Contador de bate-papo (c/ Registro do console)
        const roxoconsole = chalk.bold.hex("#6a41a3")

        if (m.message && m.isGroup) {
            console.log(chalk.bold.magenta(`GRUPO`) + ' (' + chalk.whiteBright(groupName) + chalk.whiteBright(' | ID: ' + m.chat) + ')')
            console.log(roxoconsole('NOME:'), chalk.whiteBright(pushname) + ' ' + roxoconsole('TELEFONE:'), chalk.whiteBright(m.sender.split("@")[0]))
            console.log(roxoconsole('MENSAGEM:'), (chalk.whiteBright(budy || m.mtype)) + '\n')
        } else {
            console.log(chalk.bold.magenta(`\nPRIVADO`) + ' ' + chalk.whiteBright('(https://wa.me/+' + m.sender.split("@")[0] + ')'))
            console.log(roxoconsole('NOME:'), chalk.whiteBright(pushname) + ' ' + roxoconsole('TELEFONE:'), chalk.whiteBright(m.sender.split("@")[0]))
            console.log(roxoconsole('MENSAGEM:'), (chalk.whiteBright(budy || m.mtype)) + '\n')
        }

        if (command) {
            const cmdadd = () => {
                hit[0].hit_cmd += 1
                fs.writeFileSync('./database/total-hit-user.json', JSON.stringify(hit))
            }
            cmdadd()
            const totalhit = JSON.parse(fs.readFileSync('./database/total-hit-user.json'))[0].hit_cmd
        }

        // Documentação para detecção do usuário quando está AFK em grupo (Lembrando que somente funciona executando um comando para enviar o status para o BOT)
        if (m.isGroup && !m.key.fromMe) {
            let mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
            for (let ment of mentionUser) {
                if (afk.checkAfkUser(ment, _afk)) {
                    let getId2 = afk.getAfkId(ment, _afk)
                    let getReason2 = afk.getAfkReason(getId2, _afk)
                    let getTimee = Date.now() - afk.getAfkTime(getId2, _afk)
                    let heheh2 = ms(getTimee)
                    SkyeEnviar(`❌ Não marque ele, ele está AFK\n*Motivo:* ${getReason2}`)
                }
            }
            if (afk.checkAfkUser(m.sender, _afk)) {
                let getId = afk.getAfkId(m.sender, _afk)
                let getReason = afk.getAfkReason(getId, _afk)
                let getTime = Date.now() - afk.getAfkTime(getId, _afk)
                let heheh = ms(getTime)
                _afk.splice(afk.getAfkPosition(m.sender, _afk), 1)
                fs.writeFileSync('./database/afk-user.json', JSON.stringify(_afk))
                Skye.sendTextWithMentions(m.chat, `@${m.sender.split('@')[0]} Voltei do AFK`, m)
            }
        }

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Inicio das cases
switch (command) {

// Case para adicionar membros premium a database
case 'addprem':
case 'addpremium':
    // Verifica se o usuário que executa o comando é o criador do bot
    if (!SkyeCreator) {
        // Se não for o criador, envia uma mensagem de erro
        return SkyeEnviar(SkyeMensagens.dono);
    }

    // Verifica se foram fornecidos argumentos suficientes
    if (args.length < 2) {
        // Se não, envia uma mensagem com o uso correto do comando
        return SkyeEnviar(`❌ Utilize: *addprem* @\n*addprem* número tempo\n\n❗ Exemplo: addprem @Skye 30d`);
    }

    // Verifica se há usuários mencionados no comando
    if (m.mentionedJid.length !== 0) {
        // Se há, itera sobre a lista de usuários mencionados
        for (let i = 0; i < m.mentionedJid.length; i++) {
            // Adiciona cada usuário mencionado à lista de usuários premium
            addPremiumUser(m.mentionedJid[i], args[1], premium);
        }
        // Envia uma mensagem confirmando que os usuários foram adicionados com sucesso
        SkyeEnviar("✅ Premium adicionado com sucesso!");
    } else {
        // Se não há usuários mencionados, adiciona o usuário fornecido como argumento
        addPremiumUser(args[0] + "@s.whatsapp.net", args[1], premium);
        // Envia uma mensagem confirmando que o usuário foi adicionado com sucesso
        SkyeEnviar("✅ Sucesso");
    }
    break;

// Case para apagar membros premium da database
case 'delprem':
case 'delpremium':
    // Verifica se o usuário que executa o comando é o criador do bot
    if (!SkyeCreator) {
        // Se não for o criador, envia uma mensagem de erro
        return SkyeEnviar(SkyeMensagens.dono);
    }

    // Verifica se foram fornecidos argumentos suficientes
    if (args.length < 1) {
        // Se não, envia uma mensagem com o uso correto do comando
        return SkyeEnviar(`❌ Utilize: *delprem* @\n*delprem* número\n\n❗ Exemplo: delprem @Skye`);
    }

    // Verifica se há usuários mencionados no comando
    if (m.mentionedJid.length !== 0) {
        // Se há, itera sobre a lista de usuários mencionados
        for (let i = 0; i < m.mentionedJid.length; i++) {
            // Remove cada usuário mencionado da lista de usuários premium
            premium.splice(getPremiumPosition(m.mentionedJid[i], premium), 1);
            // Atualiza o arquivo JSON com a lista de usuários premium modificada
            fs.writeFileSync("./database/premium.json", JSON.stringify(premium));
        }
        // Envia uma mensagem confirmando que os usuários foram deletados com sucesso
        SkyeEnviar("✅ Premium deletado com sucesso");
    } else {
        // Se não há usuários mencionados, remove o usuário fornecido como argumento
        premium.splice(getPremiumPosition(args[0] + "@s.whatsapp.net", premium), 1);
        // Atualiza o arquivo JSON com a lista de usuários premium modificada
        fs.writeFileSync("./database/premium.json", JSON.stringify(premium));
        // Envia uma mensagem confirmando que o usuário foi deletado com sucesso
        SkyeEnviar("✅ Sucesso");
    }
    break;


// Case para listar os membros premium existentes na database
case 'listprem':
case 'listaprem': {
    // Verifica se o comando deve ser executado
    if (!SkyeCreator) {
        return Skye.sendMessage(m.chat, { text: SkyeMensagens.dono });
    }

    // Lê o arquivo JSON de usuários premium
    const premiumData = JSON.parse(fs.readFileSync('./database/premium.json', 'utf8'));

    // Inicia o texto da lista
    let listText = `🌟 Lista de usuários premium! 👇\n\n`;

    // Lista de IDs para menção
    const mentions = [];

    // Loop para construir o texto da lista e coletar IDs para menção
    premiumData.forEach(user => {
        // Remove o sufixo '@s.whatsapp.net' e formata o número
        const phoneNumber = user.id.replace('@s.whatsapp.net', '');
        const formattedNumber = `https://wa.me/+${phoneNumber}`;

        // Calcula os dias restantes até a expiração
        const daysRemaining = Math.ceil((user.expired - Date.now()) / (24 * 60 * 60 * 1000));

        // Adiciona informações ao texto
        listText += `Número: ${formattedNumber}\nExpira em: ${daysRemaining} Dias\n`;

        // Adiciona o ID à lista de menções
        mentions.push(user.id);
    });

    // Envia a mensagem com a lista de usuários premium
    Skye.sendMessage(m.chat, {
        text: listText,
        mentions: mentions
    }, {
        quoted: m
    });

    break;
}


// Case para comprar o Premium
case 'comprar':
    // Define o valor e a duração do acesso premium
    const valorPremium = "10";
    const duracaoPremium = "30d"; // 30 dias

    // Cria uma instância do objeto de pagamento com uma chave específica
    var pagamento = new payment("APP_USR-5631775500193687-072211-77fe86e65c088b980f39cdeeba12c814-1675289353");

    try {
        // Carrega o JSON dos usuários premium existentes
        const premiumData = JSON.parse(fs.readFileSync('./database/premium.json', 'utf8'));
        const userNumber = m.sender; // Número do usuário que solicitou o comando
        // Verifica se o usuário já é premium
        const userAlreadyPremium = premiumData.some(user => user.id === userNumber);

        if (userAlreadyPremium) {
            // Se o usuário já for premium, envia uma mensagem informando
            await Skye.sendMessage(from, {
                text: "🎉 Uau! Você já é um usuário premium! 🎊 Não precisa se preocupar com um novo pagamento. Continue aproveitando os benefícios exclusivos! 🌟😊"
            });
            return;
        }

        // Cria a mensagem informativa para o usuário
        let txtCompra = `*Olá ${pushname}!* \nObrigado por escolher nossos serviços!\n\nPara adquirir o acesso premium de 30 dias por apenas R$10, siga as instruções abaixo:\n\nA confirmação do pagamento é automática, com QRCode e link gerados.\n\n*Obrigada!* 💜`;
        
        // Envia a mensagem informativa com uma imagem
        await Skye.sendMessage(m.chat, {
            image: fs.readFileSync('./Medias/apoienos.png'),
            caption: txtCompra
        }, {
            quoted: m
        });

        // Gera o QR Code para o pagamento
        let info = await pagamento.create_payment(valorPremium);
        console.log("🛑 Um novo pagamento foi gerado!"); // Log para depuração

        // Envia o QR Code para o pagamento ao usuário
        await Skye.sendMessage(from, {
            image: Buffer.from(info.qr_code, "base64"),
            caption: `✅ QRCode gerado com sucesso!`
        });

        // Envia o código para pagamento manual se necessário
        await Skye.sendMessage(from, {
            text: '👇🏼 Olha só, esse é o código copia e cola caso não consiga usar a imagem acima.'
        });
        await Skye.sendMessage(from, {
            text: info.copy_paste
        });

        // Verifica o status do pagamento
        let check = await pagamento.check_payment();

        // Aguarda até que o pagamento seja aprovado ou expirado
        while (check.status == 'pending') {
            check = await pagamento.check_payment();
        }

        if (check.status == "approved") {
            // Se aprovado, atualiza ou adiciona o usuário à base de dados JSON
            updatePremiumUser(userNumber, duracaoPremium);

            // Notifica o usuário sobre o sucesso do pagamento
            Skye.sendMessage(from, {
                text: "✅ O pagamento foi aprovado e você agora é um usuário premium por 30 dias! 🎉\n\nObrigado pelo seu apoio!"
            });

            // Notifica os administradores sobre o novo pagamento
            Skye.sendMessage(`5511941212232@s.whatsapp.net`, {
                text: "✅ Novo pagamento aprovado. Usuário " + userNumber + " agora é premium por 30 dias."
            });
            Skye.sendMessage(`5585991487204@s.whatsapp.net`, {
                text: "✅ Novo pagamento aprovado. Usuário " + userNumber + " agora é premium por 30 dias."
            });
        } else {
            // Se o pagamento não for aprovado, informa o usuário sobre a expiração
            Skye.sendMessage(from, {
                text: "Eita! Parece que o tempo de pagamento expirou."
            });
        }
    } catch (e) {
        // Em caso de erro, loga o erro e informa o usuário
        console.log(e);
        Skye.sendMessage(from, {
            text: `Ei! Acho que houve um problema com o pagamento. Tente novamente.`
        });
    }
    break;
      
// Case para apagar a SkyeSession do banco de dados
case 'apagarsessao':
case 'delsession':
case 'clearsession': {
    // Verifica se o usuário que executa o comando é o criador do bot
    if (!SkyeCreator) {
        // Se não for o criador, envia uma mensagem de erro
        return SkyeEnviar(SkyeMensagens.dono);
    }

    // Lê o diretório onde as sessões do Skye são armazenadas
    fs.readdir("./SkyeSession", async function (err, files) {
        // Se houver um erro ao ler o diretório, loga o erro e envia uma mensagem
        if (err) {
            console.log('Não foi possível verificar o diretório: ' + err);
            return SkyeEnviar('❗️ Não foi possível verificar o diretório: ' + err);
        }

        // Filtra arquivos que começam com determinados prefixos relacionados a sessões
        let filteredArray = await files.filter(item => 
            item.startsWith("pre-key") ||
            item.startsWith("sender-key") ||
            item.startsWith("session-") ||
            item.startsWith("app-state")
        );

        // Loga o número de arquivos detectados
        console.log(filteredArray.length);

        // Cria uma mensagem listando os arquivos indesejados detectados
        let teks = `Arquivos indesejados ${filteredArray.length} detectados\n\n`;
        if (filteredArray.length == 0) {
            // Se não houver arquivos indesejados, envia uma mensagem informando
            return SkyeEnviar(teks);
        }

        // Adiciona a lista de arquivos indesejados à mensagem
        filteredArray.map(function (e, i) {
            teks += (i + 1) + `. ${e}\n`;
        });

        // Envia a lista de arquivos indesejados para o usuário
        SkyeEnviar(teks);

        // Aguarda 2 segundos antes de prosseguir
        await sleep(2000);

        // Envia uma mensagem pedindo para excluir os arquivos
        SkyeEnviar("❗️ Exclua arquivos inúteis...");

        // Exclui cada arquivo indesejado encontrado
        await filteredArray.forEach(function (file) {
            fs.unlinkSync(`./SkyeSession/${file}`);
        });

        // Aguarda 2 segundos após a exclusão dos arquivos
        await sleep(2000);

        // Envia uma mensagem confirmando que todos os arquivos indesejados foram excluídos
        SkyeEnviar("⚠️ Excluiu com sucesso toda a lixeira da pasta da sessão");
    });
}
break;

// Case para enviar a SkyeSession para o usuário
case 'pegarsessao':
case 'pegarsessão': {
    // Verifica se o usuário que executa o comando é o criador do bot
    if (!SkyeCreator) {
        // Se não for o criador, envia uma mensagem de erro
        return SkyeEnviar(SkyeMensagens.dono);
    }

    // Envia uma mensagem informando que a recuperação do arquivo de sessão está em andamento
    SkyeEnviar('🕘 Aguarde um momento, recuperando seu arquivo de sessão');

    try {
        // Lê o arquivo de sessão 'creds.json' do diretório SkyeSession
        let sesi = await fs.readFileSync('./SkyeSession/creds.json');

        // Envia o arquivo de sessão como um documento para o usuário
        Skye.sendMessage(m.chat, {
            document: sesi, // Conteúdo do arquivo de sessão
            mimetype: 'application/json', // Tipo MIME do arquivo
            fileName: 'creds.json' // Nome do arquivo a ser enviado
        }, {
            quoted: m // Inclui a mensagem original como referência
        });
    } catch (err) {
        // Em caso de erro ao ler o arquivo, envia uma mensagem informando o problema
        console.log('Erro ao ler o arquivo de sessão: ' + err);
        SkyeEnviar('❗️ Houve um erro ao recuperar o arquivo de sessão. Tente novamente.');
    }
    
    break;
}


// Case para entrar em grupos utilizando links
case 'entrargp':
case 'join': {
    try {
        // Verifica se o usuário que executa o comando é o criador do bot
        if (!SkyeCreator) {
            // Se não for o criador, envia uma mensagem de erro
            return SkyeEnviar(SkyeMensagens.dono);
        }

        // Verifica se o link do grupo foi fornecido
        if (!text) {
            // Se não houver link, solicita que o usuário insira um
            return SkyeEnviar('❗️ Insira o link do grupo!');
        }

        // Verifica se o link fornecido é válido e inclui o domínio 'whatsapp.com'
        if (!isUrl(args[0]) || !args[0].includes('whatsapp.com')) {
            // Se o link não for válido, envia uma mensagem de erro
            return SkyeEnviar('❌ Link inválido!');
        }

        // Envia uma mensagem informando que o bot está processando a solicitação
        SkyeEnviar(SkyeMensagens.wait);

        // Extrai o código de convite do link fornecido
        let result = args[0].split('https://chat.whatsapp.com/')[1];

        // Tenta aceitar o convite para o grupo usando o código extraído
        await Skye.groupAcceptInvite(result)
            .then((res) => {
                // Se a operação for bem-sucedida, envia a resposta em formato JSON
                SkyeEnviar(json(res));
            })
            .catch((err) => {
                // Se ocorrer um erro, envia a mensagem de erro em formato JSON
                SkyeEnviar(json(err));
            });
    } catch {
        // Em caso de erro ao tentar entrar no grupo, envia uma mensagem de falha
        SkyeEnviar('❌ Falha ao entrar no grupo');
    }
    break;
}

// Case para desligar/reiniciar o BOT (Lembrando que depende do método que está sendo utilizado para inicialização do BOT, caso seja ".sh" o BOT irá reiniciar)
case 'shutdown':
case 'desligar':
case 'rr': {
    // Verifica se o usuário que executa o comando é o criador do bot
    if (!SkyeCreator) {
        // Se não for o criador, envia uma mensagem de erro
        return SkyeEnviar(SkyeMensagens.dono);
    }

    // Envia uma mensagem informando que o bot está desligando
    SkyeEnviar('🕘 Desligando...');

    // Aguarda 3 segundos antes de continuar
    await sleep(3000);

    // Encerra o processo Node.js, o que irá desligar o bot
    process.exit();

    break;
}

// Case para ativar/desativar a visualização automática de mensagens do BOT
case 'visu': {
    // Verifica se o usuário que executa o comando é o criador do bot
    if (!SkyeCreator) {
        // Se não for o criador, envia uma mensagem de erro
        return SkyeEnviar(SkyeMensagens.dono);
    }

    // Verifica se o comando foi fornecido com o argumento necessário ('on' ou 'off')
    if (args.length < 1) {
        // Se não houver argumento, envia uma mensagem com um exemplo de uso
        return SkyeEnviar(`Exemplo ${prefix + command} on/off`);
    }

    // Verifica o valor do argumento fornecido
    if (q === 'on') { // 'on' = Ativado
        // Ativa a leitura automática de mensagens
        autoread = true;
        // Informa que a leitura automática foi ativada
        SkyeEnviar(`✅ Leitura automática alterada com sucesso para ${q}`);
    } else if (q === 'off') { // 'off' = Desativado
        // Desativa a leitura automática de mensagens
        autoread = false;
        // Informa que a leitura automática foi desativada
        SkyeEnviar(`✅ Leitura automática alterada com sucesso para ${q}`);
    }

    break;
}


// Case para ativar/desativar o status de *digitando* após comandos executados
case 'digitando': {
    // Verifica se o usuário que executa o comando é o criador do bot
    if (!SkyeCreator) {
        // Se não for o criador, envia uma mensagem de erro
        return SkyeEnviar(SkyeMensagens.dono);
    }

    // Verifica se o comando foi fornecido com o argumento necessário ('on' ou 'off')
    if (args.length < 1) {
        // Se não houver argumento, envia uma mensagem com um exemplo de uso
        return SkyeEnviar(`Exemplo ${prefix + command} on/off`);
    }

    // Verifica o valor do argumento fornecido
    if (q === 'on') { // 'on' = Ativado
        // Ativa o status de "digitando"
        autoTyping = true;
        // Informa que a digitação automática foi ativada
        SkyeEnviar(`✅ Alterada com sucesso a digitação automática para ${q}`);
    } else if (q === 'off') { // 'off' = Desativado
        // Desativa o status de "digitando"
        autoTyping = false;
        // Informa que a digitação automática foi desativada
        SkyeEnviar(`✅ A digitação automática foi alterada com sucesso para ${q}`);
    }

    break;
}


// Case para ativar/desativar o status de *gravando* após comandos executados
case 'gravandoaudio': {
    // Verifica se o usuário que executa o comando é o criador do bot
    if (!SkyeCreator) {
        // Se não for o criador, envia uma mensagem de erro e encerra a execução do case
        return SkyeEnviar(SkyeMensagens.dono);
    }

    // Verifica se o comando foi fornecido com um argumento ('on' ou 'off')
    if (args.length < 1) {
        // Se o argumento estiver ausente, envia uma mensagem com um exemplo de uso
        return SkyeEnviar(`Exemplo ${prefix + command} on/off`);
    }

    // Verifica o valor do argumento fornecido
    if (q === 'on') { // 'on' = Ativado
        // Ativa o status de "gravando", permitindo que o bot inicie gravações automáticas
        autoRecording = true;
        // Envia uma mensagem confirmando que a gravação automática foi ativada
        SkyeEnviar(`✅ Gravação automática alterada com sucesso para ${q}`);
    } else if (q === 'off') { // 'off' = Desativado
        // Desativa o status de "gravando", fazendo com que o bot pare de gravar automaticamente
        autoRecording = false;
        // Envia uma mensagem confirmando que a gravação automática foi desativada
        SkyeEnviar(`✅ Gravação automática alterada com sucesso para ${q}`);
    }

    break;
}


// Case para ativar/desativar o status de *gravação/digitando* após comandos executados
case 'audiodigitando': {
    // Verifica se o usuário que executou o comando é o criador do bot
    if (!SkyeCreator) {
        // Se não for o criador, envia uma mensagem de erro e encerra a execução do case
        return SkyeEnviar(SkyeMensagens.dono);
    }

    // Verifica se o comando foi fornecido com um argumento ('on' ou 'off')
    if (args.length < 1) {
        // Se o argumento estiver ausente, envia uma mensagem com um exemplo de uso
        return SkyeEnviar(`Exemplo ${prefix + command} on/off`);
    }

    // Verifica o valor do argumento fornecido
    if (q === 'on') { // 'on' = Ativado
        // Ativa o status de "gravação/digitando", permitindo que o bot inicie a gravação e a digitação automáticas
        autorecordtype = true;
        // Envia uma mensagem confirmando que a gravação e a digitação automáticas foram ativadas
        SkyeEnviar(`✅ Gravação e digitação automáticas alteradas com sucesso para ${q}`);
    } else if (q === 'off') { // 'off' = Desativado
        // Desativa o status de "gravação/digitando", fazendo com que o bot pare de gravar e digitar automaticamente
        autorecordtype = false;
        // Envia uma mensagem confirmando que a gravação e a digitação automáticas foram desativadas
        SkyeEnviar(`✅ Gravação e digitação automáticas alteradas com sucesso para ${q}`);
    }

    break;
}

// Case para ativar/desativar a visualização de status dos usuários
case 'visustatus':
case 'visualizarstatus': {
    // Verifica se o usuário que executou o comando é o criador do bot
    if (!SkyeCreator) {
        // Se não for o criador, envia uma mensagem de erro e encerra a execução do case
        return SkyeEnviar(SkyeMensagens.dono);
    }

    // Verifica se o comando foi fornecido com um argumento ('on' ou 'off')
    if (args.length < 1) {
        // Se o argumento estiver ausente, envia uma mensagem com um exemplo de uso
        return SkyeEnviar(`Exemplo ${prefix + command} on/off`);
    }

    // Verifica o valor do argumento fornecido
    if (q === 'on') { // 'on' = Ativado
        // Ativa a visualização automática de status dos usuários
        autoread_status = true;
        // Envia uma mensagem confirmando que a visualização automática de status foi ativada
        SkyeEnviar(`✅ Status automático/visualização de história alterado com sucesso para ${q}`);
    } else if (q === 'off') { // 'off' = Desativado
        // Desativa a visualização automática de status dos usuários
        autoread_status = false;
        // Envia uma mensagem confirmando que a visualização automática de status foi desativada
        SkyeEnviar(`✅ Status automático/visualização de história alterado com sucesso para ${q}`);
    }

    break;
}


// Case para ativar/desativar o autobio
case 'autobio': {
    // Verifica se o usuário que executou o comando é o criador do bot
    if (!SkyeCreator) {
        // Se não for o criador, envia uma mensagem de erro e encerra a execução do case
        return SkyeEnviar(SkyeMensagens.dono);
    }

    // Verifica se o comando foi fornecido com um argumento ('on' ou 'off')
    if (args.length < 1) {
        // Se o argumento estiver ausente, envia uma mensagem com um exemplo de uso
        return SkyeEnviar(`Exemplo ${prefix + command} on/off`);
    }

    // Verifica o valor do argumento fornecido
    if (q == 'on') { // 'on' = Ativado
        // Ativa o recurso autobio
        autobio = true;
        // Envia uma mensagem confirmando que o recurso autobio foi ativado
        SkyeEnviar(`✅ AutoBio alterado com sucesso para ${q}`);
    } else if (q == 'off') { // 'off' = Desativado
        // Desativa o recurso autobio
        autobio = false;
        // Envia uma mensagem confirmando que o recurso autobio foi desativado
        SkyeEnviar(`✅ AutoBio alterado com sucesso para ${q}`);
    }

    break;
}

// Case para definir public/self o BOT
case 'modo': {
    // Verifica se o usuário que executou o comando é o criador do bot
    if (!SkyeCreator) {
        // Se não for o criador, envia uma mensagem de erro e encerra a execução do case
        return SkyeEnviar(SkyeMensagens.dono);
    }

    // Verifica se o comando foi fornecido com um argumento ('public' ou 'self')
    if (args.length < 1) {
        // Se o argumento estiver ausente, envia uma mensagem com um exemplo de uso
        return SkyeEnviar(`Exemplo ${prefix + command} public/self`);
    }

    // Verifica o valor do argumento fornecido
    if (q == 'public') { // 'public' = Público
        // Define o bot como público
        Skye.public = true;
        // Envia uma mensagem confirmando que o bot foi configurado como público
        SkyeEnviar(SkyeMensagens.done);
    } else if (q == 'self') { // 'self' = Privado
        // Define o bot como privado
        Skye.public = false;
        // Envia uma mensagem confirmando que o bot foi configurado como privado
        SkyeEnviar(SkyeMensagens.done);
    }

    break;
}

// Case para alterar o *packname* e *author* das figurinhas fornecidas pelo BOT
case 'setexif': {
    // Verifica se o usuário que executou o comando é o criador do bot
    if (!SkyeCreator) {
        // Se não for o criador, envia uma mensagem de erro e encerra a execução do case
        return SkyeEnviar(SkyeMensagens.dono);
    }

    // Verifica se o comando foi fornecido com um texto para packname e author
    if (!text) {
        // Se o texto estiver ausente, envia uma mensagem com um exemplo de uso
        return SkyeEnviar(`Exemplo: ${prefix + command} packname/author`);
    }

    // Divide o texto fornecido pelo usuário em dois partes usando '/' como delimitador
    global.packname = text.split("/")[0]; // Packname (Primeira parte do texto)
    global.author = text.split("/")[1];   // Author (Segunda parte do texto)

    // Envia uma mensagem confirmando que o packname e author foram alterados com sucesso
    SkyeEnviar(`✅ Exif alterado com sucesso para\n\n• Nome do pacote: ${global.packname}\n• Autor: ${global.author}`);
    
    break;
}


// Case para definir a foto do BOT        
case 'addfoto': {
    // Verifica se o usuário que executou o comando é o criador do bot
    if (!SkyeCreator) {
        // Se não for o criador, envia uma mensagem de erro e encerra a execução do case
        return SkyeEnviar(SkyeMensagens.dono);
    }

    // Verifica se a mensagem contém uma imagem respondida ou enviada
    if (!quoted) {
        // Se não houver uma imagem, envia uma mensagem informando o usuário para enviar ou responder uma imagem com legenda
        return SkyeEnviar(`🛑 Enviar/Responder Imagem com Legenda ${prefix + command}`);
    }

    // Verifica se o tipo MIME da imagem é válido (deve ser uma imagem e não um arquivo webp)
    if (!/image/.test(mime)) {
        // Se o tipo MIME não for imagem, envia uma mensagem informando o usuário sobre o tipo correto de arquivo
        return SkyeEnviar(`🛑 Enviar/Responder Imagem com Legenda ${prefix + command}`);
    }
    if (/webp/.test(mime)) {
        // Se o tipo MIME for webp, envia uma mensagem informando o usuário sobre o tipo correto de arquivo
        return SkyeEnviar(`🛑 Enviar/Responder Imagem com Legenda ${prefix + command}`);
    }

    // Faz o download e salva a imagem recebida como 'ppbot.jpeg'
    var medis = await Skye.downloadAndSaveMediaMessage(quoted, 'ppbot.jpeg');

    // Verifica o valor do argumento para decidir o tipo de atualização de foto
    if (args[0] == 'full') {
        // Se o argumento for 'full', gera uma nova imagem de perfil completa
        var { img } = await generateProfilePicture(medis);

        // Envia uma solicitação para atualizar a foto de perfil do bot
        await Skye.query({
            tag: 'iq',
            attrs: {
                to: botNumber,
                type: 'set',
                xmlns: 'w:profile:picture'
            },
            content: [{
                tag: 'picture',
                attrs: {
                    type: 'image'
                },
                content: img
            }]
        });

        // Remove o arquivo temporário da imagem
        fs.unlinkSync(medis);

        // Envia uma mensagem de confirmação de que a foto foi alterada
        SkyeEnviar(SkyeMensagens.done);
    } else {
        // Se o argumento não for 'full', atualiza a foto de perfil usando a URL da imagem
        var memeg = await Skye.updateProfilePicture(botNumber, {
            url: medis
        });

        // Remove o arquivo temporário da imagem
        fs.unlinkSync(medis);

        // Envia uma mensagem de confirmação de que a foto foi alterada
        SkyeEnviar(SkyeMensagens.done);
    }
    break;
}

// Case para bloquear usuários
case 'block': {
    // Verifica se o usuário que executou o comando é o criador do bot
    if (!SkyeCreator) {
        // Se não for o criador, envia uma mensagem de erro e encerra a execução do case
        return SkyeEnviar(SkyeMensagens.dono);
    }

    // Determina o ID do usuário a ser bloqueado
    // Verifica se o comando menciona algum usuário; se sim, usa o ID mencionado
    // Caso contrário, verifica se o comando é uma resposta a uma mensagem citada e usa o remetente da mensagem citada
    // Se não for mencionado ou citado, usa o texto fornecido, removendo caracteres não numéricos e adicionando o domínio '@s.whatsapp.net'
    let blockw = m.mentionedJid[0] ? 
        m.mentionedJid[0] : 
        m.quoted ? 
            m.quoted.sender : 
            text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';

    // Atualiza o status de bloqueio do usuário com o ID determinado
    // Usa a função `updateBlockStatus` para bloquear o usuário
    // Em caso de sucesso, envia uma resposta com o resultado em formato JSON
    // Em caso de erro, também envia a resposta com o erro em formato JSON
    await Skye.updateBlockStatus(blockw, 'block')
        .then((res) => SkyeEnviar(json(res)))
        .catch((err) => SkyeEnviar(json(err)));

    // Envia uma mensagem confirmando que o usuário foi bloqueado com sucesso
    SkyeEnviar('✅ Bloqueado com sucesso!');
    break;
}


// Case para desbloquear usuários
case 'unblock': {
    // Verifica se o usuário que executou o comando é o criador do bot
    if (!SkyeCreator) {
        // Se não for o criador, envia uma mensagem de erro e encerra a execução do case
        return SkyeEnviar(SkyeMensagens.dono);
    }

    // Determina o ID do usuário a ser desbloqueado
    // Verifica se o comando menciona algum usuário; se sim, usa o ID mencionado
    // Caso contrário, verifica se o comando é uma resposta a uma mensagem citada e usa o remetente da mensagem citada
    // Se não for mencionado ou citado, usa o texto fornecido, removendo caracteres não numéricos e adicionando o domínio '@s.whatsapp.net'
    let blockww = m.mentionedJid[0] ? 
        m.mentionedJid[0] : 
        m.quoted ? 
            m.quoted.sender : 
            text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';

    // Atualiza o status de bloqueio do usuário com o ID determinado
    // Usa a função `updateBlockStatus` para desbloquear o usuário
    // Em caso de sucesso, envia uma resposta com o resultado em formato JSON
    // Em caso de erro, também envia a resposta com o erro em formato JSON
    await Skye.updateBlockStatus(blockww, 'unblock')
        .then((res) => SkyeEnviar(json(res)))
        .catch((err) => SkyeEnviar(json(err)));

    // Envia uma mensagem confirmando que o usuário foi desbloqueado com sucesso
    SkyeEnviar('✅ Desbloqueado com sucesso!');
    break;
}


// Case para sair de grupos
case 'leave':
case 'sairgp': {
    // Verifica se o usuário que executou o comando é o criador do bot
    if (!SkyeCreator) {
        // Se não for o criador, envia uma mensagem informando que apenas o criador pode executar o comando
        return SkyeEnviar(SkyeMensagens.dono);
    }

    // Verifica se a mensagem foi enviada em um grupo
    if (!m.isGroup) {
        // Se não estiver em um grupo, envia uma mensagem informando que o comando deve ser usado em grupos
        return SkyeEnviar(SkyeMensagens.group);
    }

    // Envia uma mensagem informando que o bot está saindo do grupo
    SkyeEnviar('✅ Saindo do grupo...');

    // Faz o bot sair do grupo onde a mensagem foi recebida
    await Skye.groupLeave(m.chat);
    
    break;
}

// Case para deletar mensagens do BOT (Preferencialmente utilizado em grupos)
case 'delete':
case 'del': {
    // Verifica se o usuário que executou o comando é o criador do bot
    if (!SkyeCreator) {
        // Se não for o criador, envia uma mensagem informando que a ação foi concluída
        return SkyeEnviar(SkyeMensagens.done);
    }

    // Verifica se a mensagem citada (quoted) existe
    if (!m.quoted) {
        // Se não houver uma mensagem citada, lança uma exceção falsa
        throw false;
    }

    // Desestrutura o objeto da mensagem citada para obter informações necessárias
    let { chat, fromMe, id, isBaileys } = m.quoted;

    // Verifica se a mensagem citada foi enviada pelo bot (indicado por isBaileys)
    if (!isBaileys) {
        // Se a mensagem não foi enviada pelo bot, envia uma mensagem informando o erro
        return SkyeEnviar('❗️ Esta mensagem não foi enviada por mim!');
    }

    // Envia uma solicitação para deletar a mensagem citada do grupo ou chat
    Skye.sendMessage(m.chat, {
        delete: {
            remoteJid: m.chat,    // Identificador do chat onde a mensagem deve ser deletada
            fromMe: false,       // Indica que a mensagem não foi enviada pelo bot
            id: m.quoted.id,     // Identificador da mensagem citada a ser deletada
            participant: m.quoted.sender // Identificador do remetente da mensagem citada
        }
    });
    
    break;
}


// Case para expulsar algum membro do grupo
case 'kick': {
    // Verifica se a mensagem foi enviada em um grupo
    if (!m.isGroup) {
        // Se não estiver em um grupo, envia uma mensagem informando que o comando só pode ser usado em grupos
        return SkyeEnviar(SkyeMensagens.group);
    }

    // Verifica se o usuário que executou o comando é um administrador, o dono do grupo ou o criador do bot
    if (!isAdmins && !isGroupOwner && !SkyeCreator) {
        // Se não for um administrador, o dono do grupo ou o criador do bot, envia uma mensagem informando que apenas administradores podem usar o comando
        return SkyeEnviar(SkyeMensagens.admin);
    }

    // Verifica se o bot é um administrador do grupo
    if (!isBotAdmins) {
        // Se o bot não for um administrador, envia uma mensagem informando que o bot precisa ser um administrador para expulsar membros
        return SkyeEnviar(SkyeMensagens.botAdmin);
    }

    // Determina o identificador do membro a ser expulso
    // Se há um membro mencionado, usa o identificador mencionado
    // Se há uma mensagem citada, usa o remetente da mensagem citada
    // Caso contrário, utiliza o número de telefone fornecido no texto e o formata como um identificador de grupo
    let blockwww = m.mentionedJid[0] ? m.mentionedJid[0] 
                    : m.quoted ? m.quoted.sender 
                    : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';

    // Envia uma solicitação para remover o membro identificado do grupo
    await Skye.groupParticipantsUpdate(m.chat, [blockwww], 'remove')
        .then((res) => SkyeEnviar(json(res)))  // Se a remoção for bem-sucedida, envia uma mensagem com o resultado
        .catch((err) => SkyeEnviar(json(err))); // Se houver um erro, envia uma mensagem com o erro

    break;
}


// Case para adicionar algum número no grupo
case 'add': {
    // Verifica se a mensagem foi enviada em um grupo
    if (!m.isGroup) {
        // Se não estiver em um grupo, envia uma mensagem informando que o comando só pode ser usado em grupos
        return SkyeEnviar(SkyeMensagens.group);
    }

    // Verifica se o usuário que executou o comando é um administrador, o dono do grupo ou o criador do bot
    if (!isAdmins && !isGroupOwner && !SkyeCreator) {
        // Se não for um administrador, o dono do grupo ou o criador do bot, envia uma mensagem informando que apenas administradores podem usar o comando
        return SkyeEnviar(SkyeMensagens.admin);
    }

    // Verifica se o bot é um administrador do grupo
    if (!isBotAdmins) {
        // Se o bot não for um administrador, envia uma mensagem informando que o bot precisa ser um administrador para adicionar membros
        return SkyeEnviar(SkyeMensagens.botAdmin);
    }

    // Determina o identificador do membro a ser adicionado
    // Se há uma mensagem citada, usa o remetente da mensagem citada
    // Caso contrário, utiliza o número de telefone fornecido no texto, remove caracteres não numéricos e o formata como um identificador de grupo
    let blockwwww = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';

    // Envia uma solicitação para adicionar o membro identificado ao grupo
    await Skye.groupParticipantsUpdate(m.chat, [blockwwww], 'add')
        .then((res) => SkyeEnviar(json(res)))  // Se a adição for bem-sucedida, envia uma mensagem com o resultado
        .catch((err) => SkyeEnviar(json(err))); // Se houver um erro, envia uma mensagem com o erro

    break;
}


 // Case para promover o usuário à admin do grupo
case 'promote': {
    // Verifica se a mensagem foi enviada em um grupo
    if (!m.isGroup) {
        // Se não estiver em um grupo, envia uma mensagem informando que o comando só pode ser usado em grupos
        return SkyeEnviar(SkyeMensagens.group);
    }

    // Verifica se o usuário que executou o comando é um administrador, o dono do grupo ou o criador do bot
    if (!isAdmins && !isGroupOwner && !SkyeCreator) {
        // Se não for um administrador, o dono do grupo ou o criador do bot, envia uma mensagem informando que apenas administradores podem usar o comando
        return SkyeEnviar(SkyeMensagens.admin);
    }

    // Verifica se o bot é um administrador do grupo
    if (!isBotAdmins) {
        // Se o bot não for um administrador, envia uma mensagem informando que o bot precisa ser um administrador para promover membros
        return SkyeEnviar(SkyeMensagens.botAdmin);
    }

    // Determina o identificador do membro a ser promovido
    // Se há uma mensagem citada, usa o remetente da mensagem citada
    // Caso contrário, utiliza o número de telefone fornecido no texto, remove caracteres não numéricos e o formata como um identificador de grupo
    let blockwwwww = m.mentionedJid[0] 
        ? m.mentionedJid[0] 
        : m.quoted 
        ? m.quoted.sender 
        : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';

    // Envia uma solicitação para promover o membro identificado a administrador do grupo
    await Skye.groupParticipantsUpdate(m.chat, [blockwwwww], 'promote')
        .then((res) => SkyeEnviar(json(res)))  // Se a promoção for bem-sucedida, envia uma mensagem com o resultado
        .catch((err) => SkyeEnviar(json(err))); // Se houver um erro, envia uma mensagem com o erro

    break;
}


// Case para remover o admin do usuário no grupo
case 'demote': {
    // Verifica se a mensagem foi enviada em um grupo
    if (!m.isGroup) {
        // Se não estiver em um grupo, envia uma mensagem informando que o comando só pode ser usado em grupos
        return SkyeEnviar(SkyeMensagens.group);
    }

    // Verifica se o usuário que executou o comando é um administrador, o dono do grupo ou o criador do bot
    if (!isAdmins && !isGroupOwner && !SkyeCreator) {
        // Se não for um administrador, o dono do grupo ou o criador do bot, envia uma mensagem informando que apenas administradores podem usar o comando
        return SkyeEnviar(SkyeMensagens.admin);
    }

    // Verifica se o bot é um administrador do grupo
    if (!isBotAdmins) {
        // Se o bot não for um administrador, envia uma mensagem informando que o bot precisa ser um administrador para remover administradores
        return SkyeEnviar(SkyeMensagens.botAdmin);
    }

    // Determina o identificador do membro a ser despromovido
    // Se há uma mensagem citada, usa o remetente da mensagem citada
    // Caso contrário, utiliza o número de telefone fornecido no texto, remove caracteres não numéricos e o formata como um identificador de grupo
    let blockwwwwwa = m.mentionedJid[0] 
        ? m.mentionedJid[0] 
        : m.quoted 
        ? m.quoted.sender 
        : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';

    // Envia uma solicitação para despromover o membro identificado a um status de usuário comum no grupo
    await Skye.groupParticipantsUpdate(m.chat, [blockwwwwwa], 'demote')
        .then((res) => SkyeEnviar(json(res)))  // Se a despromoção for bem-sucedida, envia uma mensagem com o resultado
        .catch((err) => SkyeEnviar(json(err))); // Se houver um erro, envia uma mensagem com o erro

    break;
}


// Case para definir o nome do grupo
case 'nomegp': {
    // Verifica se a mensagem foi enviada em um grupo
    if (!m.isGroup) {
        // Se não estiver em um grupo, envia uma mensagem informando que o comando só pode ser usado em grupos
        return SkyeEnviar(SkyeMensagens.group);
    }

    // Verifica se o usuário que executou o comando é um administrador, o dono do grupo ou o criador do bot
    if (!isAdmins && !isGroupOwner && !SkyeCreator) {
        // Se não for um administrador, o dono do grupo ou o criador do bot, envia uma mensagem informando que apenas administradores podem usar o comando
        return SkyeEnviar(SkyeMensagens.admin);
    }

    // Verifica se o bot é um administrador do grupo
    if (!isBotAdmins) {
        // Se o bot não for um administrador, envia uma mensagem informando que o bot precisa ser um administrador para alterar o nome do grupo
        return SkyeEnviar(SkyeMensagens.botAdmin);
    }

    // Verifica se o texto para o novo nome do grupo foi fornecido
    if (!text) {
        // Se o texto não foi fornecido, envia uma mensagem solicitando que o usuário insira o texto
        return SkyeEnviar('❗️ Por favor insira o texto!');
    }

    // Atualiza o nome do grupo com o texto fornecido
    await Skye.groupUpdateSubject(m.chat, text)
        .then((res) => {
            // Se a atualização for bem-sucedida, envia uma mensagem de sucesso
            SkyeEnviar(SkyeMensagens.success);
        })
        .catch((err) => {
            // Se houver um erro, envia uma mensagem com o erro
            SkyeEnviar(json(err));
        });

    break;
}


// Case para definir a descrição do grupo
case 'descgp': {
    // Verifica se o comando foi executado em um grupo
    if (!m.isGroup) {
        // Se não estiver em um grupo, envia uma mensagem informando que o comando só pode ser usado em grupos
        return SkyeEnviar(SkyeMensagens.group);
    }

    // Verifica se o usuário que executou o comando é um administrador, o dono do grupo ou o criador do bot
    if (!isAdmins && !isGroupOwner && !SkyeCreator) {
        // Se não for um administrador, o dono do grupo ou o criador do bot, envia uma mensagem informando que apenas administradores podem usar o comando
        return SkyeEnviar(SkyeMensagens.admin);
    }

    // Verifica se o bot é um administrador do grupo
    if (!isBotAdmins) {
        // Se o bot não for um administrador, envia uma mensagem informando que o bot precisa ser um administrador para alterar a descrição do grupo
        return SkyeEnviar(SkyeMensagens.botAdmin);
    }

    // Verifica se o texto para a nova descrição do grupo foi fornecido
    if (!text) {
        // Se o texto não foi fornecido, envia uma mensagem solicitando que o usuário insira o texto
        return SkyeEnviar('❗️ Por favor insira o texto!');
    }

    // Atualiza a descrição do grupo com o texto fornecido
    await Skye.groupUpdateDescription(m.chat, text)
        .then((res) => {
            // Se a atualização for bem-sucedida, envia uma mensagem de sucesso
            SkyeEnviar(SkyeMensagens.success);
        })
        .catch((err) => {
            // Se houver um erro, envia uma mensagem com o erro
            SkyeEnviar(json(err));
        });

    break;
}


// Case para definir a foto do grupo
case 'fotogp': {
    // Verifica se o comando foi executado em um grupo
    if (!m.isGroup) {
        // Se não estiver em um grupo, envia uma mensagem informando que o comando só pode ser usado em grupos
        return SkyeEnviar(SkyeMensagens.group);
    }

    // Verifica se o usuário que executou o comando é um administrador do grupo
    if (!isAdmins) {
        // Se não for um administrador, envia uma mensagem informando que apenas administradores podem usar o comando
        return SkyeEnviar(SkyeMensagens.admin);
    }

    // Verifica se o bot é um administrador do grupo
    if (!isBotAdmins) {
        // Se o bot não for um administrador, envia uma mensagem informando que o bot precisa ser um administrador para alterar a foto do grupo
        return SkyeEnviar(SkyeMensagens.botAdmin);
    }

    // Verifica se uma imagem foi enviada ou respondida
    if (!quoted) {
        // Se nenhuma imagem foi enviada ou respondida, envia uma mensagem solicitando que o usuário envie ou responda com uma imagem
        return SkyeEnviar(`🛑 Enviar/Responder Imagem com Legenda ${prefix + command}`);
    }

    // Verifica se o MIME type da imagem é válido (deve ser uma imagem)
    if (!/image/.test(mime)) {
        // Se não for uma imagem, envia uma mensagem informando que é necessário enviar uma imagem
        return SkyeEnviar(`🛑 Enviar/Responder Imagem com Legenda ${prefix + command}`);
    }

    // Verifica se a imagem é do tipo WEBP (formato não suportado)
    if (/webp/.test(mime)) {
        // Se a imagem for do tipo WEBP, envia uma mensagem informando que é necessário enviar uma imagem em formato suportado
        return SkyeEnviar(`🛑 Enviar/Responder Imagem com Legenda ${prefix + command}`);
    }

    // Baixa e salva a mídia (imagem) enviada/respondida com o nome 'ppbot.jpeg'
    var medis = await Skye.downloadAndSaveMediaMessage(quoted, 'ppbot.jpeg');

    // Verifica se o argumento é 'full' para gerar uma foto de perfil completa
    if (args[0] == 'full') {
        // Gera a imagem de perfil completa a partir do arquivo salvo
        var { img } = await generateProfilePicture(medis);

        // Atualiza a foto de perfil do grupo com a imagem gerada
        await Skye.query({
            tag: 'iq',
            attrs: {
                to: m.chat,
                type: 'set',
                xmlns: 'w:profile:picture'
            },
            content: [{
                tag: 'picture',
                attrs: {
                    type: 'image'
                },
                content: img
            }]
        });

        // Remove o arquivo temporário após o uso
        fs.unlinkSync(medis);

        // Envia uma mensagem de confirmação
        SkyeEnviar(SkyeMensagens.done);
    } else {
        // Atualiza a foto de perfil do grupo com a imagem fornecida
        var memeg = await Skye.updateProfilePicture(m.chat, {
            url: medis
        });

        // Remove o arquivo temporário após o uso
        fs.unlinkSync(medis);

        // Envia uma mensagem de confirmação
        SkyeEnviar(SkyeMensagens.done);
    }

    break;
}


// Case para marcar todos os membros do grupo porém sem mostrar
case 'hidetag': {
    // Verifica se o comando foi executado em um grupo
    if (!m.isGroup) {
        // Se não estiver em um grupo, envia uma mensagem informando que o comando só pode ser usado em grupos
        return SkyeEnviar(SkyeMensagens.group);
    }

    // Verifica se o usuário que executou o comando é um administrador do grupo ou o dono do grupo ou o criador do bot
    if (!isAdmins && !isGroupOwner && !SkyeCreator) {
        // Se não for, envia uma mensagem informando que apenas administradores ou o dono do grupo podem usar o comando
        return SkyeEnviar(SkyeMensagens.admin);
    }

    // Verifica se o bot é um administrador do grupo
    if (!isBotAdmins) {
        // Se o bot não for, envia uma mensagem informando que o bot precisa ser um administrador para executar o comando
        return SkyeEnviar(SkyeMensagens.botAdmin);
    }

    // Envia uma mensagem para o grupo mencionando todos os membros do grupo, mas sem exibir as menções visivelmente no texto
    Skye.sendMessage(m.chat, {
        text: q ? q : '', // Texto da mensagem, se fornecido; caso contrário, será uma string vazia
        mentions: participants.map(a => a.id) // Menciona todos os participantes do grupo
    }, {
        quoted: m // Faz com que a mensagem enviada seja uma resposta à mensagem que disparou o comando
    });

    break;
}


// Case para abrir/fechar o grupo
case 'grupo': {
    // Verifica se o comando foi executado em um grupo
    if (!m.isGroup) {
        // Se não estiver em um grupo, envia uma mensagem informando que o comando só pode ser usado em grupos
        return SkyeEnviar(SkyeMensagens.group);
    }

    // Verifica se o usuário que executou o comando é um administrador do grupo, o dono do grupo ou o criador do bot
    if (!isAdmins && !isGroupOwner && !SkyeCreator) {
        // Se não for, envia uma mensagem informando que apenas administradores, o dono do grupo ou o criador do bot podem usar o comando
        return SkyeEnviar(SkyeMensagens.admin);
    }

    // Verifica se o bot é um administrador do grupo
    if (!isBotAdmins) {
        // Se o bot não for, envia uma mensagem informando que o bot precisa ser um administrador para executar o comando
        return SkyeEnviar(SkyeMensagens.botAdmin);
    }

    // Verifica se o argumento passado é 'close'
    if (args[0] === 'close') {
        // Se for 'close', define as configurações do grupo para 'announcement' (grupo fechado)
        await Skye.groupSettingUpdate(m.chat, 'announcement')
            .then((res) => SkyeEnviar(`✅ Grupo fechado com sucesso!`)) // Envia uma mensagem de sucesso
            .catch((err) => SkyeEnviar(json(err))); // Envia uma mensagem de erro, se ocorrer
    } 
    // Verifica se o argumento passado é 'open'
    else if (args[0] === 'open') {
        // Se for 'open', define as configurações do grupo para 'not_announcement' (grupo aberto)
        await Skye.groupSettingUpdate(m.chat, 'not_announcement')
            .then((res) => SkyeEnviar(`✅ Grupo aberto com sucesso!`)) // Envia uma mensagem de sucesso
            .catch((err) => SkyeEnviar(json(err))); // Envia uma mensagem de erro, se ocorrer
    } 
    // Se o argumento não for nem 'open' nem 'close'
    else {
        // Envia uma mensagem informando o formato correto do comando
        SkyeEnviar(`❗️ Modo ${command}\n\n\nTipo ${prefix + command} open/close`);
    }

    // Encerramento do case
    break;
}


// Case para editar as informações de edição do grupo
case 'editinfo': {
    // Verifica se o comando foi executado em um grupo
    if (!m.isGroup) {
        // Se não estiver em um grupo, envia uma mensagem informando que o comando só pode ser usado em grupos
        return SkyeEnviar(SkyeMensagens.group);
    }

    // Verifica se o usuário que executou o comando é um administrador do grupo, o dono do grupo ou o criador do bot
    if (!isAdmins && !isGroupOwner && !SkyeCreator) {
        // Se não for, envia uma mensagem informando que apenas administradores, o dono do grupo ou o criador do bot podem usar o comando
        return SkyeEnviar(SkyeMensagens.admin);
    }

    // Verifica se o bot é um administrador do grupo
    if (!isBotAdmins) {
        // Se o bot não for, envia uma mensagem informando que o bot precisa ser um administrador para executar o comando
        return SkyeEnviar(SkyeMensagens.botAdmin);
    }

    // Verifica o argumento passado para o comando
    if (args[0] === 'on') { 
        // Se o argumento for 'on', permite que as informações do grupo possam ser editadas por todos os membros
        await Skye.groupSettingUpdate(m.chat, 'unlocked')
            .then((res) => SkyeEnviar(`✅ Informações de edição do grupo aberto com sucesso`)) // Envia uma mensagem de sucesso
            .catch((err) => SkyeEnviar(json(err))); // Envia uma mensagem de erro, se ocorrer
    } 
    // Verifica se o argumento passado é 'off'
    else if (args[0] === 'off') { 
        // Se o argumento for 'off', restringe a edição das informações do grupo apenas para administradores
        await Skye.groupSettingUpdate(m.chat, 'locked')
            .then((res) => SkyeEnviar(`✅ Informações de edição do grupo fechado com sucesso`)) // Envia uma mensagem de sucesso
            .catch((err) => SkyeEnviar(json(err))); // Envia uma mensagem de erro, se ocorrer
    } 
    // Se o argumento não for nem 'on' nem 'off'
    else {
        // Envia uma mensagem informando o formato correto do comando
        SkyeEnviar(`Mode ${command}\n\n\nType ${prefix + command} on/off`);
    }

    // Encerramento do case
    break;
}


            /*                
                        case 'compraprem':
                        case 'buyprem':
                        case 'premium': {
                            let teks = `Ola ${pushname}👋\nQuer comprar Premium? Basta conversar com o proprietário😉`
                            await Skye.sendMessage(m.chat, {
                                text: teks,
                                contextInfo: {
                                    externalAdReply: {
                                        showAdAttribution: true,
                                        title: `${botname}`,
                                        body: `${ownername}`,
                                        thumbnailUrl: 'https://telegra.ph/file/6ab77544e32477a08e479.jpg',
                                        sourceUrl: global.link,
                                        mediaType: 1,
                                        renderLargerThumbnail: true
                                    }
                                }
                            }, {
                                quoted: m
                            })
                        }
                        break
            */

// Case para mostrar quanto tempo o BOT está em execução
case 'online':
case 'online': {
    // Calcula o tempo de execução do bot usando a função `process.uptime()`, que retorna o tempo em segundos
    // A função `runtime()` é utilizada para formatar o tempo de execução em um formato legível
    let runtimetext = `🧹 A bruxinha Skye BOT está em execução há: ${runtime(process.uptime())}`;
    
    // Envia uma mensagem com o texto formatado para o usuário que enviou o comando
    Skye.sendMessage(from, {
        text: runtimetext, // Texto a ser enviado na mensagem
        mentions: [sender] // Menciona o usuário que enviou o comando
    }, {
        quoted: m // Inclui a mensagem original como uma citação na resposta
    });

    // Encerra o case
    break;
}


// Case para enviar os contatos dos donos do BOT para suporte
case 'suporte': {
    // Envia uma mensagem ao usuário que enviou o comando, mencionando-o e oferecendo ajuda
    await Skye.sendMessage(from, {
        text: `Precisando de ajuda, @${sender.split("@")[0]}?\nFale com meus desenvolvedores.`,
        mentions: [sender] // Menciona o usuário que enviou o comando
    });

    // Envia uma mensagem com uma lista de contatos para suporte
    const repf = await Skye.sendMessage(from, {
        contacts: {
            displayName: `${list.length} Contato`, // Define o nome exibido para a lista de contatos
            contacts: list // Lista de contatos a ser enviada
        },
        mentions: [sender] // Menciona o usuário que enviou o comando
    });

    // Encerra o case
    break;
}


 // Case para enviar placaloli com texto customizado
case 'placaloli': {
    // Verifica se o usuário forneceu um texto para o comando
    if (!q) {
        // Se o texto não for fornecido, envia uma mensagem pedindo o texto
        return SkyeEnviar(`❗️ Por favor insira o texto!`);
    }
    
    // Envia uma mensagem indicando que o bot está processando o pedido
    SkyeEnviar(SkyeMensagens.wait);
    
    // Faz uma requisição para uma API externa para gerar uma imagem com o texto fornecido
    lod = await fetchJson(`https://nekobot.xyz/api/imagegen?type=kannagen&text=${q}`);
    
    // Envia a imagem gerada como um sticker para o chat
    Skye.sendImageAsSticker(m.chat, lod.message, m, {
        packname: packname, // Nome do pacote para o sticker
        author: author     // Autor do sticker
    });
    
    // Encerra o case
    break;
}



// Case para fazer figurinhas
case 'sticker':
case 'figurinha':
case 'f':
case 's': {
    // Verifica se a mensagem é uma resposta a uma imagem ou vídeo
    if (!quoted) {
        // Se não for uma resposta, envia uma mensagem pedindo para o usuário responder com uma imagem ou vídeo
        return SkyeEnviar(`Ei, preciso que responda marcando um vídeo ou imagem.`);
    }
    
    // Verifica se o MIME type da mídia é de uma imagem
    if (/image/.test(mime)) {
        // Se for uma imagem, faz o download da mídia
        let media = await quoted.download();
        
        // Converte a imagem para um sticker e envia para o chat
        let encmedia = await Skye.sendImageAsSticker(m.chat, media, m, {
            packname: packname, // Nome do pacote para o sticker
            author: author      // Autor do sticker
        });
        
        // Remove o arquivo temporário após o envio
        await fs.unlinkSync(encmedia);
    } 
    // Verifica se o MIME type da mídia é de um vídeo ou se é um vídeo
    else if (isVideo || /video/.test(mime)) {
        // Verifica se a duração do vídeo é maior que 30 segundos
        if ((quoted.msg || quoted).seconds > 30) {
            // Se for maior que 30 segundos, envia uma mensagem informando sobre o limite de tempo
            return SkyeEnviar('Psiu! No vídeo de no máximo 30 segundos, hein?');
        }
        
        // Faz o download da mídia
        let media = await quoted.download();
        
        // Converte o vídeo para um sticker e envia para o chat
        let encmedia = await Skye.sendVideoAsSticker(m.chat, media, m, {
            packname: packname, // Nome do pacote para o sticker
            author: author      // Autor do sticker
        });
        
        // Remove o arquivo temporário após o envio
        await fs.unlinkSync(encmedia);
    } else {
        // Se a mídia não for uma imagem ou vídeo, envia uma mensagem solicitando a mídia correta
        return SkyeEnviar(`Envie imagem ou vídeo para transformar em figurinhas!\nDuração do vídeo de 1 a 30 segundos viu?`);
    }
}
break;

// Case para criar figurinhas a partir de imagens ou vídeos
case 'figu': {
    (async function () {
        // Define o texto da legenda e o autor a partir da variável 'q'
        var legenda = q ? q?.split("/")[0] : ` `;
        var autor = q ? q?.split("/")[1] : q?.split("/")[0] ? '' : `  `;

        // Verifica se a mensagem é uma mídia (imagem ou vídeo) ou se é uma imagem citada
        if (isMedia && !m.message.videoMessage || isQuotedImage) {
            // Se for uma imagem citada, obtém a mensagem da imagem; caso contrário, usa a imagem da mensagem
            var encmedia = isQuotedImage ? m.message.extendedTextMessage.contextm.quotedMessage.imageMessage : m.message.imageMessage;
            
            // Gera um nome de arquivo aleatório para a imagem e faz o download da imagem
            rane = getRandom('.' + await getExtension(encmedia));
            buffimg = await getFileBuffer(encmedia, 'image');
            fs.writeFileSync(rane, buffimg);

            // Define o nome do arquivo de saída para o sticker e usa ffmpeg para converter a imagem em um sticker WebP
            rano = getRandom('.webp');
            exec(`ffmpeg -i ${rane} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 800:800 ${rano}`, (err) => {
                // Remove o arquivo temporário da imagem
                fs.unlinkSync(rane);
                
                // Define os metadados EXIF para o sticker
                var json = {
                    "sticker-pack-name": legenda,
                    "sticker-pack-publisher": autor
                };
                var exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]);
                var jsonBuff = Buffer.from(JSON.stringify(json), "utf-8");
                var exif = Buffer.concat([exifAttr, jsonBuff]);
                exif.writeUIntLE(jsonBuff.length, 14, 4);

                // Cria um arquivo temporário para os metadados EXIF
                let nomemeta = Math.floor(Math.random() * (99999 - 11111 + 1) + 11111) + ".temp.exif";
                fs.writeFileSync(`./${nomemeta}`, exif);

                // Adiciona os metadados EXIF ao sticker usando webpmux
                exec(`webpmux -set exif ${nomemeta} ${rano} -o ${rano}`, () => {
                    // Envia o sticker para o chat
                    Skye.sendMessage(from, {
                        sticker: fs.readFileSync(rano)
                    }, {
                        quoted: m
                    });
                    
                    // Remove os arquivos temporários
                    fs.unlinkSync(nomemeta);
                    fs.unlinkSync(rano);
                });
            });
        } 
        // Verifica se a mensagem é um vídeo ou se é um vídeo citado e está dentro do limite de duração
        else if (isMedia && m.message.videoMessage.seconds < 11 || isQuotedVideo && m.message.extendedTextMessage.contextm.quotedMessage.videoMessage.seconds < 35) {
            // Obtém a mensagem do vídeo ou o vídeo citado
            var encmedia = isQuotedVideo ? m.message.extendedTextMessage.contextm.quotedMessage.videoMessage : m.message.videoMessage;
            
            // Gera um nome de arquivo aleatório para o vídeo e faz o download do vídeo
            rane = getRandom('.' + await getExtension(encmedia));
            buffimg = await getFileBuffer(encmedia, 'video');
            fs.writeFileSync(rane, buffimg);

            // Define o nome do arquivo de saída para o sticker e usa ffmpeg para converter o vídeo em um sticker WebP
            rano = getRandom('.webp');
            await ffmpeg(`./${rane}`)
                .inputFormat(rane.split('.')[1]);
            exec(`ffmpeg -i ${rane} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 200:200 ${rano}`, (err) => {
                // Remove o arquivo temporário do vídeo
                fs.unlinkSync(rane);

                // Define os metadados EXIF para o sticker
                let json = {
                    "sticker-pack-name": legenda,
                    "sticker-pack-publisher": autor
                };
                let exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]);
                let jsonBuff = Buffer.from(JSON.stringify(json), "utf-8");
                let exif = Buffer.concat([exifAttr, jsonBuff]);
                exif.writeUIntLE(jsonBuff.length, 14, 4);

                // Cria um arquivo temporário para os metadados EXIF
                let nomemeta = "temp.exif";
                fs.writeFileSync(`./${nomemeta}`, exif);

                // Adiciona os metadados EXIF ao sticker usando webpmux
                exec(`webpmux -set exif ${nomemeta} ${rano} -o ${rano}`, () => {
                    // Envia o sticker para o chat
                    Skye.sendMessage(from, {
                        sticker: fs.readFileSync(rano)
                    }, {
                        quoted: m
                    });

                    // Remove os arquivos temporários
                    fs.unlinkSync(nomemeta);
                    fs.unlinkSync(rano);
                });
            });
        } else {
            // Se não for uma imagem ou vídeo dentro dos limites, informa ao usuário o formato correto
            SkyeEnviar(`Você precisa enviar ou marcar uma imagem ou vídeo com no máximo 10 segundos`);
        }
    })().catch(e => {
        // Em caso de erro, exibe a mensagem de erro e remove arquivos temporários
        console.log(e);
        SkyeEnviar("Hmm deu erro");
        try {
            if (fs.existsSync("temp.exif")) fs.unlinkSync("temp.exif");
            if (fs.existsSync(rano)) fs.unlinkSync(rano);
            if (fs.existsSync(media)) fs.unlinkSync(media);
        } catch { }
    });
}
break;


// Case para criar figurinhas com legendas compostas por dois textos
case 'meme': {
    // Define a mensagem de resposta padrão caso as condições não sejam atendidas
    let respond = `❗️ Enviar/Responder imagem/adesivo com legenda ${prefix + command} texto1/texto2`;

    // Verifica se o mime type da mensagem não é uma imagem
    if (!/image/.test(mime)) return SkyeEnviar(respond);

    // Verifica se o texto (legenda) foi fornecido
    if (!text) return SkyeEnviar(respond);

    // Envia uma mensagem de espera
    SkyeEnviar(SkyeMensagens.wait);

    // Divide o texto fornecido em duas partes: 'atas' (texto superior) e 'bawah' (texto inferior)
    atas = text.split('/')[1] ? text.split('/')[1] : '-';
    bawah = text.split('/')[0] ? text.split('/')[0] : '-';

    // Faz o download e salva a imagem da mensagem
    let dwnld = await Skye.downloadAndSaveMediaMessage(qmsg);

    // Faz upload da imagem para o Telegra.ph e obtém a URL da imagem
    let fatGans = await TelegraPh(dwnld);

    // Cria a URL para a imagem meme com as legendas compostas por 'atas' e 'bawah'
    let smeme = `https://api.memegen.link/images/custom/${encodeURIComponent(bawah)}/${encodeURIComponent(atas)}.png?background=${fatGans}`;

    // Envia a imagem criada como um sticker
    let pop = await Skye.sendImageAsSticker(m.chat, smeme, m, { // Aqui o BOT vai enviar a imagem como sticker
        packname: packname,
        author: author
    });

    // Remove o arquivo temporário
    fs.unlinkSync(pop);
}
break;

// Case para definir o *packname* e o *author* da figurinha para o solicitado do usuário
case 'roubar': {
    // Verifica se o texto de entrada foi fornecido; caso contrário, solicita ao usuário que insira um texto
    if (!args.join(" ")) return SkyeEnviar(`❗️ Por favor insira o texto!`);

    // Concatena todos os argumentos e divide em duas partes: packname e author
    const swn = args.join(" ");
    const pcknm = swn.split("/")[0]; // packname
    const atnm = swn.split("/")[1];   // author

    // Verifica se a mensagem citada é um GIF animado
    if (m.quoted.isAnimated === true) {
        // Faz o download e salva o GIF
        Skye.downloadAndSaveMediaMessage(quoted, "gifee");
        
        // Envia o GIF como um sticker
        Skye.sendMessage(from, {
            sticker: fs.readFileSync("gifee.webp")
        }, {
            quoted: m
        });
    } 
    // Verifica se a mensagem citada é uma imagem
    else if (/image/.test(mime)) {
        let media = await quoted.download(); // Faz o download da imagem
        // Converte a imagem em sticker e envia
        let encmedia = await Skye.sendImageAsSticker(m.chat, media, m, {
            packname: pcknm,
            author: atnm
        });
    } 
    // Verifica se a mensagem citada é um vídeo
    else if (/video/.test(mime)) {
        // Verifica a duração do vídeo (máximo de 30 segundos permitido)
        if ((quoted.msg || quoted).seconds > 30) return SkyeEnviar('❌ Máximo 30 segundos!');
        
        let media = await quoted.download(); // Faz o download do vídeo
        // Converte o vídeo em sticker e envia
        let encmedia = await Skye.sendVideoAsSticker(m.chat, media, m, {
            packname: pcknm,
            author: atnm
        });
    } 
    // Caso a mídia não seja uma imagem, vídeo ou GIF, solicita ao usuário que envie um desses tipos
    else {
        SkyeEnviar(`❓ Certifique-se que seja uma foto ou vídeo!`);
    }
}
break;


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Conversores

// Conversor de figurinha para imagem
case 'toimage':
case 'toimg': {
    // Verifica se a mídia recebida é um sticker no formato WebP
    if (!/webp/.test(mime)) {
        // Solicita ao usuário que envie um sticker com a legenda apropriada
        return SkyeEnviar(`❗️ Adesivo de resposta com legenda *${prefix + command}*`);
    }
    
    // Informa ao usuário que o processo está em andamento
    SkyeEnviar(SkyeMensagens.wait);

    // Faz o download e salva o sticker recebido
    let media = await Skye.downloadAndSaveMediaMessage(qmsg);

    // Gera um nome de arquivo temporário para a imagem PNG
    let ran = await getRandom('.png');

    // Converte o sticker WebP para uma imagem PNG usando ffmpeg
    exec(`ffmpeg -i ${media} ${ran}`, (err) => {
        // Remove o arquivo temporário do sticker WebP após a conversão
        fs.unlinkSync(media);
        
        // Se ocorrer um erro durante a conversão, retorna o erro
        if (err) return err;

        // Lê o arquivo PNG convertido em buffer
        let buffer = fs.readFileSync(ran);

        // Envia a imagem PNG para o chat
        Skye.sendMessage(m.chat, {
            image: buffer
        }, {
            quoted: m
        });

        // Remove o arquivo temporário PNG após o envio
        fs.unlinkSync(ran);
    });
}
break;


// Conversor de figurinha animada para vídeo MP4
case 'tomp4':
case 'tovideo': {
    // Verifica se a mídia recebida é um sticker no formato WebP
    if (!/webp/.test(mime)) {
        // Solicita ao usuário que envie um sticker com a legenda apropriada
        return SkyeEnviar(`❗️ Adesivo de resposta com legenda *${prefix + command}*`);
    }
    
    // Informa ao usuário que o processo está em andamento
    SkyeEnviar(SkyeMensagens.wait);

    // Faz o download e salva o sticker WebP recebido
    let media = await Skye.downloadAndSaveMediaMessage(qmsg);

    // Converte o sticker WebP para um vídeo MP4
    let webpToMp4 = await webp2mp4File(media);

    // Envia o vídeo MP4 para o chat com uma legenda
    await Skye.sendMessage(m.chat, {
        video: {
            url: webpToMp4.result,
            caption: 'Converter Webp para vídeo'
        }
    }, {
        quoted: m
    });

    // Remove o arquivo temporário do sticker WebP após o envio
    await fs.unlinkSync(media);
}
break;

// Conversor de vídeo ou áudio para áudio MP3
case 'toaudio': {
    // Verifica se a mídia recebida é um vídeo ou áudio
    if (!/video/.test(mime) && !/audio/.test(mime)) {
        // Solicita ao usuário que envie um vídeo ou áudio com a legenda apropriada
        return SkyeEnviar(`❗️ Enviar/Responder Vídeo/Áudio que você deseja transformar em áudio com legenda ${prefix + command}`);
    }

    // Informa ao usuário que o processo está em andamento
    SkyeEnviar(SkyeMensagens.wait);

    // Faz o download da mídia recebida
    let media = await Skye.downloadMediaMessage(qmsg);

    // Converte o vídeo ou áudio para o formato de áudio MP3
    let audio = await toAudio(media, 'mp4');

    // Envia o arquivo de áudio convertido para o chat
    Skye.sendMessage(m.chat, {
        audio: audio,
        mimetype: 'audio/mpeg'
    }, {
        quoted: m
    });

}
break;

// Conversor de vídeo para formato MP3
case 'tomp3': {
    // Verifica se a mídia recebida é um vídeo ou áudio
    if (!/video/.test(mime) && !/audio/.test(mime)) {
        // Solicita ao usuário que envie um vídeo ou áudio com a legenda apropriada
        return SkyeEnviar(`❗️ Enviar/Responder Vídeo/Áudio que você deseja transformar em MP3 com legenda ${prefix + command}`);
    }

    // Informa ao usuário que o processo está em andamento
    SkyeEnviar(SkyeMensagens.wait);

    // Faz o download da mídia recebida
    let media = await Skye.downloadMediaMessage(qmsg);

    // Converte a mídia para o formato MP3
    let audio = await toAudio(media, 'mp4');

    // Envia o arquivo de áudio MP3 convertido para o chat
    Skye.sendMessage(m.chat, {
        document: audio,        // O arquivo convertido é enviado como um documento
        mimetype: 'audio/mp3',  // Tipo MIME do arquivo MP3
        fileName: `dgxeon.mp3`  // Nome do arquivo MP3 enviado
    }, {
        quoted: m              // Mensagem original é citada
    });

}
break;


// Conversor de áudio para formato de "voz" (VN - Vídeo Nota) (Como se a Skye tivesse enviado o audio)
case 'tovn': {
    // Verifica se a mídia recebida é um vídeo ou áudio
    if (!/video/.test(mime) && !/audio/.test(mime)) {
        // Solicita ao usuário que envie um vídeo ou áudio com a legenda apropriada
        return SkyeEnviar(`❗️ Responder vídeo/áudio que você deseja transformar em VN com legenda ${prefix + command}`);
    }

    // Informa ao usuário que o processo está em andamento
    SkyeEnviar(SkyeMensagens.wait);

    // Faz o download da mídia recebida
    let media = await Skye.downloadMediaMessage(qmsg);

    // Importa a função toPTT do módulo de conversão
    let { toPTT } = require('./lib/converter');

    // Converte a mídia para o formato de áudio tipo "voz" (PTT - Push to Talk)
    let audio = await toPTT(media, 'mp4');

    // Envia o áudio convertido como uma mensagem de voz
    Skye.sendMessage(m.chat, {
        audio: audio,          // O arquivo convertido é enviado como áudio
        mimetype: 'audio/mpeg', // Tipo MIME do arquivo de áudio (MP3)
        ptt: true              // Marca o áudio como mensagem de voz (PTT)
    }, {
        quoted: m              // Mensagem original é citada
    });

}
break;


// Conversor de figurinha animada para GIF
case 'togif': {
    // Verifica se o tipo MIME da mídia é WEBP (figurinha animada)
    if (!/webp/.test(mime)) {
        // Solicita ao usuário que envie uma figurinha animada com a legenda apropriada
        return SkyeEnviar(`❗️ Adesivo de resposta com legenda *${prefix + command}*`);
    }

    // Informa ao usuário que o processo de conversão está em andamento
    SkyeEnviar(SkyeMensagens.wait);

    // Faz o download e salva a mídia recebida
    let media = await Skye.downloadAndSaveMediaMessage(qmsg);

    // Converte a figurinha WEBP para o formato MP4 usando uma função auxiliar
    let webpToMp4 = await webp2mp4File(media);

    // Envia o vídeo convertido como um GIF com reprodução de GIF ativada
    await Skye.sendMessage(m.chat, {
        video: {
            url: webpToMp4.result, // URL do vídeo convertido
            caption: 'Converter Webp para vídeo' // Legenda do vídeo
        },
        gifPlayback: true // Ativa a reprodução de GIF
    }, {
        quoted: m // Mensagem original é citada
    });

    // Remove o arquivo temporário da mídia original
    await fs.unlinkSync(media);

}
break;

// Conversor de imagem para URL
case 'tourl': {
    // Informa ao usuário que o processo de conversão está em andamento
    SkyeEnviar(SkyeMensagens.wait);

    // Faz o download e salva a mídia recebida
    let media = await Skye.downloadAndSaveMediaMessage(qmsg);

    // Verifica se o tipo MIME da mídia é imagem
    if (/image/.test(mime)) {
        // Converte a imagem para uma URL usando o serviço TelegraPh
        let anu = await TelegraPh(media);
        // Envia a URL da imagem convertida para o usuário
        SkyeEnviar(util.format(anu));
    } else {
        // Caso não seja uma imagem, faz o upload da mídia usando UploadFileUgu
        let anu = await UploadFileUgu(media);
        // Envia a URL da mídia convertida para o usuário
        SkyeEnviar(util.format(anu));
    }

    // Remove o arquivo temporário da mídia original
    await fs.unlinkSync(media);
}
break;


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

 // Case de junção de sticker
case 'emojimix': {
    // Divide o texto recebido em dois emojis usando o caractere "+"
    let [emoji1, emoji2] = text.split`+`;

    // Verifica se os emojis foram fornecidos
    if (!emoji1) return SkyeEnviar(`❗️ Exemplo: ${prefix + command} 😅+🤔`);
    if (!emoji2) return SkyeEnviar(`❗️ Exemplo: ${prefix + command} 😅+🤔`);

    // Informa ao usuário que o bot está processando a solicitação
    SkyeEnviar(SkyeMensagens.wait);

    // Faz uma solicitação para a API do Tenor para obter imagens de stickers de emoji combinados
    let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`);

    // Itera sobre os resultados recebidos da API
    for (let res of anu.results) {
        // Envia cada imagem como um sticker para o chat
        let encmedia = await Skye.sendImageAsSticker(m.chat, res.url, m, {
            packname: global.packname, // Nome do pacote de stickers
            author: global.author,     // Autor dos stickers
            categories: res.tags       // Categorias associadas ao sticker
        });

        // Remove o arquivo temporário do sticker após o envio
        await fs.unlinkSync(encmedia);
    }
}
break;


// Case para o BOT enviar mídia com visualização única
case 'toonce':
case 'visuunica': {
    // Verifica se há uma mídia citada na mensagem
    if (!quoted) return SkyeEnviar(`❌ Por favor responda com um vídeo ou imagem!`);

    // Verifica se o MIME type é imagem
    if (/image/.test(mime)) {
        // Faz o download e salva a imagem citada
        let anuan = await Skye.downloadAndSaveMediaMessage(quoted);
        
        // Envia a imagem com visualização única
        Skye.sendMessage(m.chat, {
            image: {
                url: anuan
            },
            caption: `✅ Realizado com sucesso!`,  // Mensagem de sucesso
            fileLength: "999",                  // Define o tamanho do arquivo (valor arbitrário para o limite máximo)
            viewOnce: true                      // Define que a imagem deve ser visualizada apenas uma vez
        }, {
            quoted: m                           // Referência à mensagem original
        });
    } 
    // Verifica se o MIME type é vídeo
    else if (/video/.test(mime)) {
        // Faz o download e salva o vídeo citado
        let anuanuan = await Skye.downloadAndSaveMediaMessage(quoted);
        
        // Envia o vídeo com visualização única
        Skye.sendMessage(m.chat, {
            video: {
                url: anuanuan
            },
            caption: `✅ Realizado com sucesso!`,  // Mensagem de sucesso
            fileLength: "99999999",            // Define o tamanho do arquivo (valor arbitrário para o limite máximo)
            viewOnce: true                    // Define que o vídeo deve ser visualizado apenas uma vez
        }, {
            quoted: m                           // Referência à mensagem original
        });
    }
}
break;


// Case para gerar um QRCode com o texto solicitado pelo usuário
case 'qr':
case 'qrcode': {
    // Verifica se o usuário forneceu um texto ou link para gerar o QRCode
    if (!q) return SkyeEnviar('❗️ Por favor inclua link ou texto!');

    // Importa os módulos necessários para gerar o QRCode
    const QrCode = require('qrcode-reader');
    const qrcode = require('qrcode');

    // Gera um QRCode a partir do texto fornecido e o converte em uma URL de imagem
    let qyuer = await qrcode.toDataURL(q, {
        scale: 35  // Define a escala da imagem QRCode
    });

    // Converte a URL de imagem base64 para um buffer de dados binários
    let data = new Buffer.from(qyuer.replace('data:image/png;base64,', ''), 'base64');

    // Gera um nome aleatório para o arquivo da imagem
    let buff = getRandom('.jpg');

    // Salva o buffer de dados binários em um arquivo de imagem
    await fs.writeFileSync('./' + buff, data);

    // Lê o conteúdo do arquivo da imagem
    let medi = fs.readFileSync('./' + buff);

    // Envia a imagem do QRCode gerada para o chat
    await Skye.sendMessage(from, {
        image: medi,                     // Conteúdo da imagem do QRCode
        caption: "✅ Realizado com sucesso!"  // Mensagem de sucesso
    }, {
        quoted: m                       // Referência à mensagem original
    });

    // Define um timeout para remover o arquivo da imagem após 10 segundos
    setTimeout(() => {
        fs.unlinkSync(buff);  // Remove o arquivo da imagem
    }, 10000);
}
break;

 // Case para adicionar um número como proprietário
case 'adddono': {
    // Verifica se o usuário executando o comando é o criador do bot
    if (!SkyeCreator) return SkyeEnviar(SkyeMensagens.dono);

    // Verifica se o número foi fornecido como argumento
    if (!args[0]) return SkyeEnviar(`👉🏼 Utilize ${prefix + command} número\nExemplo ${prefix + command} ${ownernumber}`);

    // Remove caracteres não numéricos do número fornecido
    bnnd = q.split("|")[0].replace(/[^0-9]/g, '');

    // Verifica se o número fornecido está registrado no WhatsApp
    let ceknye = await Skye.onWhatsApp(bnnd);
    if (ceknye.length == 0) return SkyeEnviar(`🛑 Insira um número válido e registrado no WhatsApp!`);

    // Adiciona o número à lista de proprietários
    dono.push(bnnd);

    // Salva a lista de proprietários atualizada em um arquivo JSON
    fs.writeFileSync('./database/dono.json', JSON.stringify(dono));

    // Envia uma mensagem confirmando que o número foi adicionado como proprietário
    SkyeEnviar(`✅ O número ${bnnd} tornou-se proprietário!`);
}
break;

// Case para remover um número da lista de proprietários
case 'deldono': {
    // Verifica se o usuário executando o comando é o criador do bot
    if (!SkyeCreator) return SkyeEnviar(SkyeMensagens.dono);

    // Verifica se o número foi fornecido como argumento
    if (!args[0]) return SkyeEnviar(`👉🏼 Utilize ${prefix + command} número\nExemplo ${prefix + command} ${ownernumber}`);

    // Remove caracteres não numéricos do número fornecido
    ya = q.split("|")[0].replace(/[^0-9]/g, '');

    // Encontra o índice do número na lista de proprietários
    unp = dono.indexOf(ya);

    // Se o número for encontrado, remove-o da lista
    if (unp > -1) {
        dono.splice(unp, 1);

        // Salva a lista de proprietários atualizada em um arquivo JSON
        fs.writeFileSync('./database/dono.json', JSON.stringify(dono));

        // Envia uma mensagem confirmando que o número foi excluído
        SkyeEnviar(`✅ O número ${ya} foi excluído da lista de proprietários!`);
    } else {
        // Se o número não estiver na lista, envia uma mensagem informando que não foi encontrado
        SkyeEnviar(`🛑 O número ${ya} não está na lista de proprietários!`);
    }
}
break;


            /*      
                        case 'video': // By Flávio
                          if (!q) return SkyeEnviar(`${prefix + command} link ou nome`);
                        
                          const mtq = require('yt-search');
                        
                          const ytp_play = await mtq(q);
                          if (!ytp_play || ytp_play.videos.length === 0) {
                            console.log('Nenhum vídeo encontrado para a pesquisa.');
                            return reply('Nenhum vídeo encontrado para a pesquisa.');
                          }
                          
                          const qmq = '720';
                          const qla = qmq + 'p';
                          const vvs = ytp_play.videos[0].url;
                        
                          if (!vvs || typeof vvs !== 'string') {
                            console.log('Erro ao obter o vídeo. Valor de v:', vvs);
                            SkyeEnviar(`Ola *${pushname}* aguarde Um Momento`);
                            return reply('Erro ao obter o vídeo.');
                          }
                        
                          const ytp = await youtubedl(vvs).catch(async (_) => await youtubedlv2(vvs));
                          const dlt_url = await ytp.video[qla].download();
                          const tssl = await ytp.title;
                          const sizeas = await ytp.video[qla].fileSizeH;
                        
                          await Skye.sendMessage(m.chat, {
                            video : { url: dlt_url },
                            caption: `╭━❰  Daki  ❱━⬣\n┃📥 YOUTUBE DL 📥\n┃ও *TÍTULO:* \n┃» ${tssl}\n┃﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘\n┃ও *PESO:*\n┃» ${sizeas}\n╰━❰ *Daki* ❱━⬣`,
                            fileName: `${tssl}.mp4`,
                            mimetype: 'video/mp4',
                            contextInfo: {
                              externalAdReply: {
                                title: tssl,
                                body: "",
                                thumbnailUrl: ytp_play.videos[0].thumbnail,
                                mediaType: 2,
                                showAdAttribution: true,
                                renderLargerThumbnail: true,
                              },
                            },
                          }, { quoted: m });
                          break;
                        
                        case 'play': //by Flavio
                        if (!q) return SkyeEnviar(`${prefix + command} link ou nome`);
                        
                          const mstt = require('yt-search');
                        
                          const ytai_play = await mstt(q);
                          if (!ytai_play || ytai_play.videos.length === 0) {
                            console.log('Nenhum vídeo encontrado para a pesquisa.');
                            return reply('Nenhum vídeo encontrado para a pesquisa.');
                          }
                        let qw = '128kbps'
                        
                        const vi = ytai_play.videos[0].url;
                          
                          if (!vi || typeof vi !== 'string') {
                            console.log('Erro ao obter o vídeo. Valor de v:', vi);
                            return reply('Erro ao obter o vídeo.');
                          }
                          
                          console.log('Valor de v:', vi);
                          
                          SkyeEnviar(`Ola *${pushname}* aguarde Um Momento`);
                          
                        const ytai = await youtubedl(vi).catch(async _ => await youtubedlv2(vi))
                        const dlh_url = await ytai.audio[qw].download()
                        const tyl = await ytai.title
                        const sizre = await ytai.audio[qw].fileSizeH
                        await Skye.sendMessage(m.chat, { audio: { url: dlh_url }, mimetype: 'audio/mpeg', contextInfo: {
                        externalAdReply: {
                        title: tyl,
                        body: "",
                        thumbnail: await fetchBuffer(ytai_play.videos[0].thumbnail),
                        mediaType: 1,
                        showAdAttribution: true,
                        renderLargerThumbnail: true
                        }}} , { quoted: m })
                        break
                        
                        case 'mp4doc': // By Flávio
                          if (!q) return SkyeEnviar(`${prefix + command} link ou nome`);
                        
                          const mt = require('yt-search');
                        
                          const ytt_play = await mt(q);
                          if (!ytt_play || ytt_play.videos.length === 0) {
                            console.log('Nenhum vídeo encontrado para a pesquisa.');
                            return reply('Nenhum vídeo encontrado para a pesquisa.');
                          }
                          
                          const qu = '720';
                          const qq = qu + 'p';
                          const vs = ytt_play.videos[0].url;
                        
                          if (!vs || typeof vs !== 'string') {
                            console.log('Erro ao obter o vídeo. Valor de v:', vs);
                            SkyeEnviar(`Ola *${pushname}* aguarde Um Momento`);
                            return reply('Erro ao obter o vídeo.');
                          }
                        
                          const ytt = await youtubedl(vs).catch(async (_) => await youtubedlv2(vs));
                          const dls_url = await ytt.video[qq].download();
                          const tsl = await ytt.title;
                          const sizes = await ytt.video[qq].fileSizeH;
                        
                          await Skye.sendMessage(m.chat, {
                            document: { url: dls_url },
                            caption: `╭━❰  Daki  ❱━⬣\n┃📥 YOUTUBE DL 📥\n┃ও *TÍTULO:* \n┃» ${tsl}\n┃﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘\n┃ও *PESO:*\n┃» ${sizes}\n╰━❰ *Daki* ❱━⬣`,
                            fileName: `${tsl}.mp4`,
                            mimetype: 'video/mp4',
                            contextInfo: {
                              externalAdReply: {
                                title: tsl,
                                body: "",
                                thumbnailUrl: ytt_play.videos[0].thumbnail,
                                mediaType: 2,
                                showAdAttribution: true,
                                renderLargerThumbnail: true,
                              },
                            },
                          }, { quoted: m });
                          break;
                        
                        case 'playdoc': //By Flávio
                          if (!q) return SkyeEnviar(`${prefix + command} link ou nome`);
                          
                          const ytsk = require('yt-search');
                        
                          const yt_play = await ytsk(q);
                          if (!yt_play || yt_play.videos.length === 0) {
                            console.log('Nenhum vídeo encontrado para a pesquisa.');
                            return reply('Nenhum vídeo encontrado para a pesquisa.');
                          }
                          
                          const qc = '128kbps';
                          const v = yt_play.videos[0].url;
                          
                          if (!v || typeof v !== 'string') {
                            console.log('Erro ao obter o vídeo. Valor de v:', v);
                            return reply('Erro ao obter o vídeo.');
                          }
                          
                          console.log('Valor de v:', v);
                          
                          SkyeEnviar(`Ola *${pushname}* aguarde Um Momento`);
                          const yt = await youtubedl(v).catch(async (_) => await youtubedlv2(v));
                          const dl_url = await yt.audio[qc].download();
                          const tl = await yt.title;
                          const size = await yt.audio[qc].fileSizeH;
                          const cap = `╭━❰  *DAKI* ❱━⬣\n┃📥 YOUTUBE DL 📥\n┃ও *📌TÍTULO* \n┃» ${tl}\n┃﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘\n┃ও *⚖️PESO*\n┃» ${size}\n╰━❰ *DAKI* ❱━⬣`.trim();
                          
                          await Skye.sendMessage(m.chat, {
                            document: { url: dl_url },
                            caption: cap,
                            mimetype: 'audio/mpeg',
                            fileName: `${tl}.mp3`,
                            contextInfo: {
                              externalAdReply: {
                                title: tl,
                                body: "",
                                thumbnailUrl: yt_play.videos[0].thumbnail,
                                mediaType: 1,
                                showAdAttribution: true,
                                renderLargerThumbnail: true,
                              },
                            },
                          }, { quoted: m });
                          break;
                        
                        
                        
                        case 'play2': //By Flávio
                        case 'song': {
                            if(!q) return SkyeEnviar(`${prefix+command} link ou nome`);
                            const musica = require('./lib/ytdl3')
                            let yts = require("youtube-yts")
                            SkyeEnviar(`Ola *${pushname}* aguarde Um Momento`);
                            let pesquisa = await yts(q)
                            let resultado = pesquisa.videos[0]
                            const pedido = await musica.mp3(resultado.url)
                            await Skye.sendMessage(m.chat, {
                                audio: fs.readFileSync(pedido.path),
                                fileName: resultado.title + '.mp3',
                                mimetype: 'audio/mp4',
                                ptt: false,
                                contextInfo: {
                                    externalAdReply: {
                                        title: `Pedido Por: ${pushname}`,
                                        body: `0:00 ━━━●──── ${resultado.timestamp}`,
                                        thumbnail: await fetchBuffer(pedido.meta.image),
                                        mediaType: 1,
                                        mediaUrl: resultado.url,
                                    }
                                },
                            }, { quoted: selo })
                            await fs.unlinkSync(pedido.path)
                        }
                        break;
                        
                        case 'mp4': //By Flávio
                        case 'ytvideo':
                        {
                            if (!q) return SkyeEnviar(`${prefix + command} Digite o termo de pesquisa`);
                            const yts = require('youtube-yts');
                            const video = require('./lib/ytdl2');
                            SkyeEnviar(`Ola *${pushname}* aguarde Um Momento`);
                            async function pesquisarVideoNoYoutube(query) {
                                try {
                                    const result = await yts(query);
                                    return result.videos;
                                } catch (error) {
                                    console.error('Erro ao pesquisar vídeos no YouTube:', error);
                                    return [];
                                }
                            }
                            const resultadosPesquisa = await pesquisarVideoNoYoutube(q);
                            if (resultadosPesquisa.length === 0) {
                                return reply("Nenhum vídeo encontrado para a consulta de pesquisa.");
                            }
                            const primeiroResultado = resultadosPesquisa[0];
                            const pesquisa = await video.mp4(primeiroResultado.url);
                            const resultados = `
                        *📌 Título:* ${pesquisa.title}
                        *📆 Data:* ${pesquisa.date}
                        *⏳ Duração:* ${pesquisa.duration}
                        *🎞️ Qualidade:* ${pesquisa.quality}`;
                            await Skye.sendMessage(m.chat, {
                                video: {
                                    url: pesquisa.videoUrl,
                                    mimetype: 'video/mp4',
                                },
                                caption: resultados
                            }, { quoted: m });
                        }
                        break;
                        
                        
                        
                        
                        
                        case 'ytmp4': case 'ytvideo': { //By Flávio
                        const video = require('./lib/ytdl2')
                        if(!q) return SkyeEnviar(`${prefix+command} link Do Video`);
                            SkyeEnviar(`Ola *${pushname}* aguarde Um Momento`);
                        const pesquisa = await video.mp4(q)
                        const resultados = `
                        *📌Titulo:* ${pesquisa.title}
                        *📆Data:* ${pesquisa.date}
                        *⏳Duração:* ${pesquisa.duration}
                        *🎞️Qualidade:* ${pesquisa.quality}`
                        await Skye.sendMessage(m.chat, {
                            video: { url: pesquisa.videoUrl },
                            caption: resultados
                        },{ quoted: m })
                        }
                        break
                        */

// Case para criar figurinhas com citações
case 'qc': {
    // Importa a função 'quote' do módulo './lib/quote.js'
    const { quote } = require('./lib/quote.js');

    // Verifica se o texto para a citação foi fornecido
    if (!q) return SkyeEnviar('❗️ Por gentileza, insira um texto!');

    // Envia uma mensagem ao usuário informando que o processamento está em andamento
    SkyeEnviar(`✅ *${pushname}* aguarde um momento enquanto eu processo as informações!`);

    // Tenta obter a foto de perfil do usuário. Se não conseguir, usa uma imagem padrão
    let ppnyauser = await Skye.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/6880771a42bad09dd6087.jpg');

    // Cria uma imagem com a citação usando a função 'quote'
    const rest = await quote(q, pushname, ppnyauser);

    // Envia uma mensagem ao usuário indicando que a operação está em espera
    SkyeEnviar(SkyeMensagens.wait);

    // Envia a imagem gerada como uma figurinha para o chat
    Skye.sendImageAsSticker(m.chat, rest.result, m, {
        packname: `SkyeBOT 🤖`,
        author: `Sticker feito por: ${pushname}`
    });
}
break;


// Case para enviar mensagens para algum usuário utilizando o BOT
case 'mensagem': {
    // Verifica se o usuário que está tentando usar o comando é o dono do bot
    if (!SkyeCreator) return SkyeEnviar(SkyeMensagens.owner); // Somente o dono tem permissão para este comando
    
    // Verifica se o texto do comando foi fornecido
    if (!text) return SkyeEnviar(`Nenhum número e/ou texto informados.\nExemplo: ${prefix + command} numero/texto`);
    
    try {
        // Divide o texto recebido em número e mensagem usando '/' como delimitador
        numero = text.split('/')[0] ? text.split('/')[0] : '-';
        texto = text.split('/')[1] ? text.split('/')[1] : '-';
        
        // Verifica se o número contém caracteres inválidos
        if (numero.includes("-")) return SkyeEnviar('O número precisa ser junto e não conter "-"');
        if (numero.includes("+")) return SkyeEnviar('❌ Precisa ser número junto sem "+", e não pode tá separado da /!');
        
        // Envia a mensagem para o número especificado
        Skye.sendMessage(`${numero}@s.whatsapp.net`, {
            text: texto
        });

        // Informa o usuário que a mensagem foi enviada com sucesso
        SkyeEnviar(`✅ Mensagem enviada com sucesso!`);
    } catch (e) {
        // Em caso de erro, informa ao usuário e exibe o erro no console
        SkyeEnviar("Um erro ocorreu. Contate um desenvolvedor para que verifique as logs do console.");
        console.log(e);
    }
    break;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ PIX

// Case PIX
case 'pix':
case 'doação':
case 'doacao':
case 'doe': {
    // Mensagem de introdução para o comando 'pix'
    let txtapoie = `
*E aí ${pushname}!* 
Considere em apoiar meus desenvolvedores!

A Skye é um projeto *sem fins lucrativos*. TODAS as doações são reinvestidas para aprimorar e criar novas funcionalidades. Qualquer apoio é valioso. Para doações simbólicas, envie um comprovante aos nossos desenvolvedores para acessar novas funcionalidades antecipadamente!

Basta digitar "pix valor" (exemplo: pix 1)

A confirmação de pagamento é automática, com QRCode e link gerados.

*Obrigada!* 💜`;

    // Se nenhum argumento for fornecido, envia uma mensagem com uma imagem e a mensagem de introdução
    if (args.length == 0) {
        return Skye.sendMessage(m.chat, {
            image: fs.readFileSync('./Medias/apoienos.png'),
            caption: txtapoie
        }, {
            quoted: m
        });
    }

    // Cria uma instância do objeto de pagamento com um identificador específico
    var pagament = new payment("APP_USR-5631775500193687-072211-77fe86e65c088b980f39cdeeba12c814-1675289353");

    try {
        // Gera um pagamento com base no valor fornecido pelos argumentos
        let inf = await pagament.create_payment(args.join(" "));

        console.log("🛑 Um novo pagamento foi gerado!");

        // Envia a imagem do QRCode gerado para o usuário
        await Skye.sendMessage(from, {
            image: Buffer.from(inf.qr_code, "base64"),
            caption: `✅ QRCode gerado com sucesso!`
        });

        // Informa o usuário sobre o código de pagamento copiado e colado
        await Skye.sendMessage(from, {
            text: '👇🏼 Olha só, esse é o código copia e cola caso não consiga usar a imagem acima.'
        });
        await Skye.sendMessage(from, {
            text: inf.copy_paste
        });

        // Verifica o status do pagamento até que ele seja aprovado ou expire
        let check = await pagament.check_payment();
        while (check.status == 'pending') {
            check = await pagament.check_payment();
        }

        // Se o pagamento foi aprovado, envia uma mensagem de sucesso e notifica os desenvolvedores
        if (check.status == "approved") {
            console.log("✅  Novo pagamento aprovado!");
            SkyeEnviar("Oba! Seu pagamento foi aprovado e reconhecido.\n *Muuuito obrigada!* 💜");
            Skye.sendMessage(`5511941212232@s.whatsapp.net`, {
                text: "✅ Novo pagamento aprovado verifique o Mercado Pago!"
            });
            Skye.sendMessage(`5585991487204@s.whatsapp.net`, {
                text: "✅ Novo pagamento aprovado verifique o Mercado Pago!"
            });
        } else {
            // Se o pagamento expirou, notifica o usuário
            SkyeEnviar("Eita! Parece que o tempo de pagamento expirou.");
        }
    } catch (e) {
        // Em caso de erro, registra o erro e notifica o usuário
        console.log("Error during payment processing:", e);
        SkyeEnviar(`Ei! Acho que esse valor é inválido, hein?`);
    }
    break;
}


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ API de download

// Case para processar links do Twitter ou X e enviar mídia
case 'twitter':
    case 'x': {
        // Verifica se um link foi fornecido
        if (!q) return SkyeEnviar(`❗️ Exemplo: ${command} link do vídeo`);
    
        // Verifica se o link fornecido é do Twitter ou X
        if (!q.includes('x.com') && !q.includes('twitter.com')) 
            return SkyeEnviar(`❌ O link está inválido`);
    
        // Carrega a lista de usuários premium do arquivo JSON
        const premiumDataTwitter = JSON.parse(fs.readFileSync(premiumFilePath));
        // Verifica se o usuário atual é premium
        const isPremiumTwitter = premiumDataTwitter.some(user => user.id === sender);
    
        // Carrega o registro de uso diário do arquivo JSON, se existir
        let usageDataTwitter = {};
        if (fs.existsSync(twitterUsageFilePath)) {
            usageDataTwitter = JSON.parse(fs.readFileSync(twitterUsageFilePath));
        }
    
        // Obtém a data atual no formato YYYY-MM-DD
        const todayTwitter = new Date().toISOString().split('T')[0];
    
        // Inicializa o registro de uso do usuário, se não existir
        if (!usageDataTwitter[sender]) {
            usageDataTwitter[sender] = { date: todayTwitter, count: 0 };
        }
    
        // Reseta a contagem diária se o dia mudou
        if (usageDataTwitter[sender].date !== todayTwitter) {
            usageDataTwitter[sender].date = todayTwitter;
            usageDataTwitter[sender].count = 0;
        }
    
        // Verifica se o usuário atingiu o limite diário de 10 utilizações
        if (!isPremiumTwitter && usageDataTwitter[sender].count >= 10) {
            const resetTime = new Date(usageDataTwitter[sender].date);
            resetTime.setDate(resetTime.getDate() + 1);
            const timeRemaining = Math.ceil((resetTime - Date.now()) / (60 * 60 * 1000));
            return SkyeEnviar(`❌ Você atingiu o limite diário de 10 utilizações. Tente novamente em *${timeRemaining} horas* ou compre o premium digitando *comprar*!`);
        }
    
        // Incrementa a contagem de utilizações e salva o registro
        usageDataTwitter[sender].count++;
        fs.writeFileSync(twitterUsageFilePath, JSON.stringify(usageDataTwitter, null, 2));
    
        // Envia uma mensagem de espera
        SkyeEnviar(SkyeMensagens.wait);
    
        try {
            // Faz uma requisição para obter dados da mídia do link fornecido
            post = await fetchJson(`https://api.felipefogaca.net/download?url=${q}&apikey=${skyeapikey}`);
            const texto = `${post.result.text}`;
            const mediaItems = post.result.media_extended;
    
            if (mediaItems && mediaItems.length > 0) {
                // Filtra e limita o número de imagens a 5
                const images = mediaItems.filter(item => item.type === 'image').slice(0, 5);
                // Filtra vídeos e GIFs
                const videos = mediaItems.filter(item => item.type === 'video');
                const gifs = mediaItems.filter(item => item.type === 'gif');
    
                // Envia as imagens
                for (const image of images) {
                    await Skye.sendMessage(from, {
                        image: { url: image.url },
                        caption: texto
                    });
                }
    
                // Envia os vídeos
                for (const video of videos) {
                    await Skye.sendMessage(from, {
                        video: { url: video.url },
                        caption: texto
                    });
                }
    
                // Envia os GIFs
                for (const gif of gifs) {
                    await Skye.sendMessage(from, {
                        video: { url: gif.url },
                        caption: texto,
                        gifPlayback: true
                    });
                }
    
                // Se não houver mídia, notifica o usuário
                if (images.length === 0 && videos.length === 0 && gifs.length === 0) {
                    SkyeEnviar(`❌ Não há mídia disponível neste post`);
                }
            } else {
                SkyeEnviar(`❌ Não há mídia disponível neste post`);
            }
        } catch (error) {
            // Trata erros de requisição e notifica o usuário
            console.error(error);
            SkyeEnviar(`❌ Ocorreu um erro ao tentar baixar a mídia. Tente novamente mais tarde.`);
        }
        break;
    }

// Case para processar links do Instagram e enviar mídia
case 'insta':
case 'instagram':
case 'ig':
case 'reel':
case 'reels': {
    // Verifica se um link foi fornecido
    if (!q) return SkyeEnviar(`❗️ Exemplo: ${command} link do vídeo`);

    // Verifica se o link fornecido é do Instagram, Reels ou Stories
    if (!q.includes('instagram.com') && !q.includes('reel') && !q.includes('stories')) {
        return SkyeEnviar(`❌ O link está inválido`);
    }

    // Carrega a lista de usuários premium do arquivo JSON
    const premiumDataInsta = JSON.parse(fs.readFileSync(premiumFilePath));
    // Verifica se o usuário atual é premium
    const isPremiumInsta = premiumDataInsta.some(user => user.id === sender);

    // Carrega o registro de uso diário do arquivo JSON, se existir
    let usageDataInsta = {};
    if (fs.existsSync(instagramUsageFilePath)) {
        usageDataInsta = JSON.parse(fs.readFileSync(instagramUsageFilePath));
    }

    // Obtém a data atual no formato YYYY-MM-DD
    const todayInsta = new Date().toISOString().split('T')[0];

    // Inicializa o registro de uso do usuário, se não existir
    if (!usageDataInsta[sender]) {
        usageDataInsta[sender] = { date: todayInsta, count: 0 };
    }

    // Reseta a contagem diária se o dia mudou
    if (usageDataInsta[sender].date !== todayInsta) {
        usageDataInsta[sender].date = todayInsta;
        usageDataInsta[sender].count = 0;
    }

    // Verifica se o usuário atingiu o limite diário de 10 utilizações
    if (!isPremiumInsta && usageDataInsta[sender].count >= 10) {
        const resetTime = new Date(usageDataInsta[sender].date);
        resetTime.setDate(resetTime.getDate() + 1);
        const timeRemaining = Math.ceil((resetTime - Date.now()) / (60 * 60 * 1000));
        return SkyeEnviar(`❌ Você atingiu o limite diário de 10 utilizações. Tente novamente em *${timeRemaining} horas* ou compre o premium digitando *comprar*!`);
    }

    // Incrementa a contagem de utilizações e salva o registro
    usageDataInsta[sender].count++;
    fs.writeFileSync(instagramUsageFilePath, JSON.stringify(usageDataInsta, null, 2));

    // Envia uma mensagem de espera
    SkyeEnviar(SkyeMensagens.wait);

    try {
        // Faz uma requisição para obter dados da mídia do link fornecido
        const post = await axios.get(`https://api.felipefogaca.net/download?url=${q}&apikey=${skyeapikey}`);

        // Verifica se a resposta contém mídia
        if (post.data && post.data.result && post.data.result.length > 0) {
            const mediaItems = post.data.result;
            const limit = Math.min(mediaItems.length, 5); // Limita o número de mídias a 5

            // Processa cada mídia
            for (let i = 0; i < limit; i++) {
                const mediaUrl = mediaItems[i]._url;
                const response = await axios.head(mediaUrl);
                const contentType = response.headers['content-type'];

                // Verifica o tipo de mídia e envia a mensagem apropriada
                if (contentType && contentType.includes('video/')) {
                    await Skye.sendMessage(from, {
                        caption: `Vídeo ${i + 1} de ${limit}`,
                        video: { url: mediaUrl }
                    });
                } else if (contentType && contentType.includes('image/')) {
                    await Skye.sendMessage(from, {
                        caption: `Imagem ${i + 1} de ${limit}`,
                        image: { url: mediaUrl }
                    });
                } else {
                    // Se não for nem imagem nem vídeo, envia como vídeo
                    await Skye.sendMessage(from, {
                        caption: `Vídeo ${i + 1} de ${limit}`,
                        video: { url: mediaUrl }
                    });
                }
            }
        } else {
            SkyeEnviar(`❌ Não foi possível obter a mídia. Verifique o link e tente novamente.`);
        }
    } catch (error) {
        // Trata erros de requisição e notifica o usuário
        console.error(error);
        SkyeEnviar(`❌ Ocorreu um erro ao tentar baixar a mídia. Tente novamente mais tarde.`);
    }
    break;
}

                            
// Case para processar links do TikTok e enviar mídia
case 'tiktok': {
    // Verifica se um link foi fornecido
    if (!q) return SkyeEnviar(`❗️ Exemplo: ${command} link do vídeo`);

    try {
        // Verifica se o link fornecido é do TikTok
        if (!q.includes('tiktok.com') && !q.includes('vm.tiktok.com')) {
            return SkyeEnviar(`❌ O link está inválido`);
        }

        // Carrega a lista de usuários premium do arquivo JSON
        const premiumData = JSON.parse(fs.readFileSync(premiumFilePath));
        // Verifica se o usuário atual é premium
        const isPremium = premiumData.some(user => user.id === sender);

        // Carrega o registro de uso diário do arquivo JSON, se existir
        let usageData = {};
        if (fs.existsSync(usageFilePath)) {
            usageData = JSON.parse(fs.readFileSync(usageFilePath));
        }

        // Obtém a data atual no formato YYYY-MM-DD
        const today = new Date().toISOString().split('T')[0];

        // Inicializa o registro de uso do usuário, se não existir
        if (!usageData[sender]) {
            usageData[sender] = { date: today, count: 0 };
        }

        // Reseta a contagem diária se o dia mudou
        if (usageData[sender].date !== today) {
            usageData[sender].date = today;
            usageData[sender].count = 0;
        }

        // Verifica se o usuário atingiu o limite diário de 10 utilizações
        if (!isPremium && usageData[sender].count >= 10) {
            const resetTime = new Date(usageData[sender].date);
            resetTime.setDate(resetTime.getDate() + 1);
            const timeRemaining = Math.ceil((resetTime - Date.now()) / (60 * 60 * 1000));
            return SkyeEnviar(`❌ Você atingiu o limite diário de 10 utilizações. Tente novamente em *${timeRemaining} horas* ou compre o premium digitando *comprar*!`);
        }

        // Incrementa a contagem de utilizações e salva o registro
        usageData[sender].count++;
        fs.writeFileSync(usageFilePath, JSON.stringify(usageData, null, 2));

        // Envia uma mensagem de espera
        SkyeEnviar(SkyeMensagens.wait);

        // Faz uma requisição para obter dados da mídia do link fornecido
        const response = await axios.get(`https://api.felipefogaca.net/download?url=${q}&apikey=${skyeapikey}`);
        const post = response.data;

        // Verifica se a resposta contém dados válidos
        if (post.status !== 200 || !post.result || !post.result.data) {
            return SkyeEnviar(`❌ Não foi possível encontrar o conteúdo. Verifique o link.`);
        }

        const data = post.result.data;

        // Se houver imagens, envia até 5 imagens
        if (data.images && data.images.length > 0) {
            const images = data.images.slice(0, 5);
            for (let i = 0; i < images.length; i++) {
                Skye.sendMessage(from, { 
                    image: { url: images[i] }, 
                    caption: i === 0 ? data.title : undefined 
                });
            }
        } 
        // Se houver um vídeo, envia o vídeo
        else if (data.play) {
            const texto1 = `${data.title}`;
            Skye.sendMessage(from, { video: { url: data.play }, caption: texto1 });
        } 
        // Se não for possível identificar o conteúdo, informa o usuário
        else {
            SkyeEnviar(`❌ Não foi possível identificar o conteúdo. Tente novamente mais tarde.`);
        }
    } catch (error) {
        // Trata erros de requisição e notifica o usuário
        SkyeEnviar(`❌ Ocorreu um erro ao processar o conteúdo. Tente novamente mais tarde.`);
    }
    break;
}

            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Area de teste

            













            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Scrappers Antigos
            /*
            // Scrapper TiktokAudio
            case 'tiktokaudio1': {
                if (!q) return SkyeEnviar(`❗️ Exemplo: ${prefix + command} link do vídeo cade?`)
                if (!q.includes('tiktok')) return SkyeEnviar(`❌ O Link está inválido`)
                SkyeEnviar(SkyeMensagens.wait)
                require('./lib/tiktok').Tiktok(q).then(data => {
                    Skye.sendMessage(from, {
                        audio: {
                            url: data.audio
                        },
                        mimetype: 'audio/mp4'
                    }, {
                        quoted: m
                    })
                })
            }
                break

            // Scrapper TiktokVideo
            case 'tiktok1': {
                if (!q) return SkyeEnviar(`❗️ Exemplo: ${prefix + command} link do vídeo`)
                if (!q.includes('tiktok')) return SkyeEnviar(`❌ O link esta inválido`)
                SkyeEnviar(SkyeMensagens.wait)
                require('./lib/tiktok').Tiktok(q).then(data => {
                    Skye.sendMessage(from, {
                        caption: `✅ Vídeo baixado com sucesso!`,
                        video: {
                            url: data.watermark
                        }
                    })
                })
            }
                break

            // Scrapper Instagram (Reels, Stories, Postagens)
            case 'insta1':
            case 'instagram1':
            case 'ig1': {
                if (!q) return SkyeEnviar(`❗️ Exemplo: ${prefix + command} link do vídeo/stories/postagem`)
                SkyeEnviar(SkyeMensagens.wait)
                async function ginsta(link) {
                    try {
                        return new Promise(async (resolve, reject) => {
                            axios.post(`https://reels.com.br/api/post`, {
                                urlToScrap: link
                            }).then((res) => {
                                let array = []
                                if (res.status === 200) {
                                    igdl = res.data
                                }
                                for (let a of igdl) array.push({
                                    link: a.downloadUrl
                                })
                                let resultado = {
                                    Status: res.status === 200 ? true : false,
                                    Dev: "Switzg / gugu 😏",
                                    Thumb: igdl[0].displayUrl,
                                    Midias: array
                                };
                                resolve(resultado)
                            }).catch(reject)
                        })
                    } catch (erro) {
                        return erro
                    }
                };

                async function ginsta2(link) {
                    try {
                        return new Promise(async (resolve, reject) => {
                            axios.post(`https://fastdl.app/c/`, qs.stringify({
                                url: link,
                                lang_code: "en"
                            })).then((res) => {
                                const $ = cheerio.load(res.data)
                                let array = []
                                $('div:nth-child(1)').each(function (a, b, c, d) {
                                    link = $(b).find('a').attr('href')
                                    extensao = $(b).find('a').attr('data-mediatype')
                                    if (link != undefined && extensao != undefined) {
                                        array.push({
                                            link: link,
                                            extensao
                                        })
                                    }
                                })
                                resultado = {
                                    Status: res.status === 200 ? true : false,
                                    Dev: "Switzg / gugu 😏",
                                    Midias: array
                                }
                                resolve(resultado)
                            }).catch(reject)
                        })
                    } catch (erro) {
                        return erro
                    }
                }

                try {
                    const openig = await ginsta(q)
                    for (let a of openig.Midias) {
                        if (a.link.includes(".heic") || a.link.includes(".webp") || a.link.includes(".png") || a.link.includes(".jpeg") || a.link.includes(".jpg")) {
                            await sleep(500)
                            await Skye.sendMessage(from, {
                                image: {
                                    url: a.link
                                },
                                mimetype: "image/png",
                                caption: `✅ Baixado com sucesso!`
                            }, {
                                quoted: m
                            }).catch(e => {
                                SkyeEnviar("❌ Erro!")
                            })
                        } else {
                            await sleep(500)
                            await Skye.sendMessage(from, {
                                video: {
                                    url: a.link
                                },
                                caption: `✅ Baixado com sucesso!`
                            }, {
                                quoted: m
                            }).catch(e => {
                                SkyeEnviar("❌ Erro!")
                            })
                        }
                    }
                } catch {
                    try {
                        const openig = await ginsta2(q)
                        for (a = 1; a < openig.Midias.length; a++) {
                            if (openig.Midias[a].link.includes(".heic") || openig.Midias[a].link.includes(".webp") || openig.Midias[a].link.includes(".png") || openig.Midias[a].link.includes(".jpeg") || openig.Midias[a].link.includes(".jpg")) {
                                await sleep(500)
                                await Skye.sendMessage(from, {
                                    image: {
                                        url: openig.Midias[a].link
                                    },
                                    mimetype: "image/png",
                                    caption: `✅ Baixado com sucesso!`
                                }, {
                                    quoted: m
                                })
                                    .catch(e => {
                                        SkyeEnviar("❌ Erro!")
                                    })
                            } else {
                                await sleep(500)
                                await Skye.sendMessage(from, {
                                    video: {
                                        url: openig.Midias[a].link
                                    },
                                    mimetype: "video/mp4",
                                    caption: `✅ Baixado com sucesso!`
                                }, {
                                    quoted: m
                                })
                                    .catch(e => {
                                        SkyeEnviar("❌ Erro!")
                                    })
                            }
                        }
                    } catch (e) {
                        console.log(e)
                    }
                }
            }
                break

            // Scrapper Twiiter
            case 'twitter1': {
                if (!q) return SkyeEnviar(`❗️ Exemplo: ${prefix + command} link do vídeo`)
                SkyeEnviar(SkyeMensagens.wait)
                async function gtwitter(link) {
                    try {
                        return new Promise(async (resolve, reject) => {
                            axios.post(`https://davapps.com/wp-json/aio-dl/video-data/`, {
                                url: link
                            }).then((res) => {
                                let array = []
                                if (res.status === 200) {
                                    igdl = res.data
                                }
                                for (let a of igdl.medias) array.push({
                                    link: a.url,
                                    qualidade: a.quality,
                                    peso_formatado: a.formattedSize,
                                    peso: a.size,
                                    extensao: a.extension
                                })
                                let resultado = {
                                    Status: res.status === 200 ? true : false,
                                    Dev: "Switzg / gugu 😏",
                                    Titulo: igdl.title,
                                    Thumb: igdl.thumbnail,
                                    Duracao: igdl.duration,
                                    Midias: array
                                };
                                resolve(resultado)
                            }).catch(reject)
                        })
                    } catch (erro) {
                        return erro
                    }
                }

                res = await gtwitter(q)
                await sleep(500)
                await Skye.sendMessage(from, {
                    video: {
                        url: res.Midias[2] ? res.Midias[2].link : res.Midias[1].link
                    },
                    caption: `✅ Video baixado com sucesso!`
                }, {
                    quoted: m
                })
            }
                break



            
            case "ytmp3.1": case "ytaudio":
            const xeonaudp3 = require('./lib/ytdl3')
            if (args.length < 1 || !isUrl(text) || !xeonaudp3.isYTUrl(text)) return SkyeEnviar(`Cadê o link do YouTube?\nExemplo: ${prefix + command} link`)
            SkyeEnviar(`Ola *${pushname}* aguarde Um Momento`);
            const audio=await xeonaudp3.mp3(text)
            await Skye.sendMessage(m.chat,{
                audio: fs.readFileSync(audio.path),
                mimetype: 'audio/mp4', ptt: false,
                contextInfo:{
                    externalAdReply:{
                        title:audio.meta.title,
                        body: botname,
                        thumbnail: await fetchBuffer(audio.meta.image),
                        mediaType: false,
                        mediaUrl: text,
                    }
            
                },
            },{quoted: m })
            await fs.unlinkSync(audio.path)
            break
            case 'ytmp4.1': case 'ytvideo': {
            const xeonvidoh = require('./lib/ytdl3')
            if (args.length < 1 || !isUrl(text) || !xeonvidoh.isYTUrl(text)) SkyeEnviar(`Onde está o link??\n\nExemplo: ${prefix + command} link 128kbps`)
            SkyeEnviar(`Ola *${pushname}* aguarde Um Momento`);
            const vid=await xeonvidoh.mp4(text)
            const ytc=`
            *Titulo:* ${vid.title}
            *Data:* ${vid.date}
            *Duração:* ${vid.duration}
            *Qualidade:* ${vid.quality}`
            await Skye.sendMessage(m.chat,{
                video: {url:vid.videoUrl},
                caption: ytc
            },{quoted: m })
            }
            break

                                        case 'tiktok':
                                case 'ttk':
                                case 'tik':
                                    // Verifica se a variável `q` (o link) foi fornecida. Se não, envia uma mensagem de exemplo.
                                    if (!q) return SkyeEnviar(`❗️ Exemplo: ${command} link do vídeo`);
                                
                                    try {
                                        // Verifica se o link fornecido inclui os domínios esperados do TikTok
                                        if (!q.includes('tiktok.com') && !q.includes('vm.tiktok.com')) {
                                            // Se o link não for válido, envia uma mensagem de erro
                                            return SkyeEnviar(`❌ O link está inválido`);
                                        }
                                
                                        // Envia uma mensagem para indicar que o processamento está em andamento
                                        SkyeEnviar(SkyeMensagens.wait);
                                        
                                        // Faz uma requisição para a API para obter informações sobre o conteúdo do link
                                        const response = await axios.get(`https://api.felipefogaca.net/download?url=${q}&apikey=${skyeapikey}`);
                                        const post = response.data;
                                    
                                        // Verifica se a resposta da API foi bem-sucedida e se contém os dados necessários
                                        if (post.status !== 200 || !post.result || !post.result.data) {
                                            // Se os dados não foram encontrados ou a resposta não foi bem-sucedida, envia uma mensagem de erro
                                            return SkyeEnviar(`❌ Não foi possível encontrar o conteúdo. Verifique o link.`);
                                        }
                                    
                                        // Extrai os dados do post da resposta da API
                                        const data = post.result.data;
                                        
                                        // Verifica se há imagens disponíveis no conteúdo retornado
                                        if (data.images && data.images.length > 0) {
                                            // Se houver imagens, limita o número de imagens a 5
                                            const images = data.images.slice(0, 5); 
                                            
                                            // Itera sobre as imagens e envia cada uma como mensagem
                                            for (let i = 0; i < images.length; i++) {
                                                Skye.sendMessage(from, { 
                                                    image: { url: images[i] }, 
                                                    // Adiciona uma legenda apenas na primeira imagem
                                                    caption: i === 0 ? data.title : undefined 
                                                });
                                            }
                                        } else if (data.play) {
                                            // Se não houver imagens, mas houver um link de vídeo, envia o vídeo
                                            const texto1 = `${data.title}`;
                                            Skye.sendMessage(from, { video: { url: data.play }, caption: texto1 });
                                        } else {
                                            // Se não houver nem imagens nem vídeo, envia uma mensagem informando que o conteúdo não pôde ser identificado
                                            SkyeEnviar(`❌ Não foi possível identificar o conteúdo. Tente novamente mais tarde.`);
                                        }
                                    } catch (error) {
                                        // Se ocorrer um erro durante o processamento da requisição, envia uma mensagem de erro
                                        SkyeEnviar(`❌ Ocorreu um erro ao processar o conteúdo. Tente novamente mais tarde.`);
                                    }
                                    break;
            */

            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Menus

// Case para exibir o menu de comandos para os donos do bot
case 'menudono': {
    // Verifica se o remetente é o criador do bot
    if (!SkyeCreator) return SkyeEnviar(SkyeMensagens.dono);

    // Determina a plataforma do remetente com base no ID da mensagem
    const plataforma1 = m.key.id.length > 31 
        ? 'Android' 
        : m.key.id.substring(0, 2) === '3A' 
            ? 'IOS' 
            : m.key.id.length === 22 
                ? 'WhatsApp Web' 
                : '';

    // Texto do menu de comandos para o dono
    let menudonotext = `👋 Olá, como vai *${pushname}*?

Sou a Skye, um BOT desenvolvido para auxiliar o seu uso no WhatsApp

*Segue abaixo meus comandos para dono!* 🙋‍♂️

• menugrupos
• adddono 
• deldono
• pegarsessao
• apagarsessao
• rr
• visu *[opção]*
• digitando *[opção]*
• gravandoaudio *[opção]*
• audiodigitando *[opção]*
• autobio *[option]*
• modo *[option]*
• block
• unblock 
• addfoto
• entrargp
• sairgp`;

    // Caso para iPhone (iOS)
    if (plataforma1 === 'IOS') {
        // Envia uma imagem com a legenda para iPhone
        await Skye.sendMessage(m.chat, {
            image: fs.readFileSync('./Medias/thumb.jpg'),
            caption: ''
        });

        // Envia uma mensagem interativa com um botão para iPhone
        await Skye.relayMessage(from, {
            interactiveMessage: {
                body: {
                    text: menudonotext
                },
                nativeFlowMessage: {
                    buttons: [{
                        name: "quick_reply",
                        buttonParamsJson: JSON.stringify({
                            display_text: "🔙 Voltar",
                            id: `menu`
                        }),
                    }],
                    messageParamsJson: "",
                },
            },
        }, {}).then((r) => console.log(r));
    } 
    // Caso para Android
    else if (plataforma1 === 'Android') {
        // Gera uma mensagem com mídia e informações interativas para Android
        let msg = generateWAMessageFromContent(from, {
            viewOnceMessage: {
                message: {
                    "messageContextInfo": {
                        "deviceListMetadata": {},
                        "deviceListMetadataVersion": 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: menudonotext // Texto do menu
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: '' // Rodapé vazio
                        }),
                        header: proto.Message.InteractiveMessage.Header.create({
                            // Adiciona uma imagem ao cabeçalho
                            ...(await prepareWAMessageMedia({
                                image: fs.readFileSync('./Medias/thumb.jpg')
                            }, {
                                upload: Skye.waUploadToServer
                            })),
                            title: '', // Título vazio
                            gifPlayback: true,
                            subtitle: 'cuzin',
                            hasMediaAttachment: false
                        }),
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            buttons: [{
                                "name": "quick_reply",
                                "buttonParamsJson": `{\"display_text\":\"🔙 Voltar\",\"id\":\"menu\"}`
                            }],
                        }),
                        contextInfo: {
                            mentionedJid: [sender],
                            isForwarded: false,
                            forwardedNewsletterMessageInfo: {
                                newsletterJid: "kk",
                                newsletterName: 'cuzin',
                                serverMessageId: 143
                            }
                        }
                    })
                }
            }
        }, {});

        // Envia a mensagem gerada para o remetente
        await Skye.relayMessage(msg.key.remoteJid, msg.message, {
            messageId: msg.key.id
        });
    } 
    // Caso para WhatsApp Web
    else if (plataforma1 === 'WhatsApp Web') {
        // Envia uma imagem com a legenda para WhatsApp Web
        Skye.sendMessage(m.chat, {
            image: fs.readFileSync('./Medias/thumb.jpg'),
            caption: menudonotext
        }, {
            quoted: m
        });
    }
    break;
}


// Case para exibir o menu de comandos para grupos
case 'menugrupo':
case 'menugrupos': {
    // Verifica se a mensagem não é de um grupo e se o remetente não é o criador do bot, nem um administrador ou o dono do grupo
    // Se a condição for verdadeira, envia uma mensagem informando que o comando só pode ser usado em grupos ou por usuários autorizados
    if (!m.isGroup && !SkyeCreator && !isAdmins && !isGroupOwner) return SkyeEnviar(SkyeMensagens.group);

    // Determina a plataforma do remetente com base no ID da mensagem
    // A variável `plataforma2` pode ser 'Android', 'IOS' ou 'WhatsApp Web' dependendo da identificação da plataforma
    const plataforma2 = m.key.id.length > 31 
        ? 'Android' 
        : m.key.id.substring(0, 2) === '3A' 
            ? 'IOS' 
            : m.key.id.length === 22 
                ? 'WhatsApp Web' 
                : '';

    // Define o texto do menu de comandos para grupos
    let menugrupostext = `👋 Olá, como vai *${pushname}*?

Sou a Skye, um BOT desenvolvido para auxiliar o seu uso no WhatsApp

*Segue abaixo meus comandos para grupos!* 🙋‍♂️

• fechargptempo
• abrigptempo
• kick
• add
• promote
• demote
• descgp
• fotogp
• marca
• hidetag
• totag
• grupo [opção]
• editinfo
• linkgp
• revoke`;

    // Caso para iPhone (iOS)
    if (plataforma2 === 'IOS') {
        // Envia uma imagem com a legenda vazia para iPhone
        // A imagem é carregada do caminho './Medias/menuinicio.png'
        await Skye.sendMessage(m.chat, {
            image: fs.readFileSync('./Medias/menuinicio.png'),
            caption: ''
        });

        // Envia uma mensagem interativa com um botão para iPhone
        // A mensagem inclui o texto do menu e um botão "Voltar" que retorna ao menu principal
        await Skye.relayMessage(from, {
            interactiveMessage: {
                body: {
                    text: menugrupostext // Texto do menu de comandos
                },
                nativeFlowMessage: {
                    buttons: [{
                        name: "quick_reply",
                        buttonParamsJson: JSON.stringify({
                            display_text: "🔙 Voltar", // Texto do botão
                            id: `menu` // ID do botão para identificação
                        }),
                    }],
                    messageParamsJson: "", // Parâmetros da mensagem (vazio neste caso)
                },
            },
        }, {}).then((r) => console.log(r)); // Log do resultado da operação
    } 
    // Caso para Android
    else if (plataforma2 === 'Android') {
        // Gera uma mensagem com mídia e informações interativas para Android
        // Utiliza a função `generateWAMessageFromContent` para criar a mensagem
        let msg = generateWAMessageFromContent(from, {
            viewOnceMessage: {
                message: {
                    "messageContextInfo": {
                        "deviceListMetadata": {},
                        "deviceListMetadataVersion": 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: menugrupostext // Texto do menu de comandos
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: '' // Rodapé vazio
                        }),
                        header: proto.Message.InteractiveMessage.Header.create({
                            // Adiciona uma imagem ao cabeçalho da mensagem
                            ...(await prepareWAMessageMedia({
                                image: fs.readFileSync('./Medias/menuinicio.png') // Carrega a imagem do caminho especificado
                            }, {
                                upload: Skye.waUploadToServer // Função para upload da imagem
                            })),
                            title: '', // Título vazio
                            gifPlayback: true, // Permite reprodução de GIFs (não utilizado aqui)
                            subtitle: 'cuzin', // Subtítulo
                            hasMediaAttachment: false // Indica que não há anexos de mídia
                        }),
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            buttons: [{
                                "name": "quick_reply",
                                "buttonParamsJson": `{\"display_text\":\"🔙 Voltar\",\"id\":\"menu\"}` // Botão "Voltar"
                            }],
                        }),
                        contextInfo: {
                            mentionedJid: [sender], // Menciona o remetente
                            isForwarded: false, // Indica que a mensagem não foi encaminhada
                            forwardedNewsletterMessageInfo: {
                                newsletterJid: "kk",
                                newsletterName: 'cuzin',
                                serverMessageId: 143
                            }
                        }
                    })
                }
            }
        }, {});

        // Envia a mensagem gerada para o remetente
        await Skye.relayMessage(msg.key.remoteJid, msg.message, {
            messageId: msg.key.id // ID da mensagem para rastreamento
        });
    } 
    // Caso para WhatsApp Web
    else if (plataforma2 === 'WhatsApp Web') {
        // Envia uma imagem com a legenda para WhatsApp Web
        // A imagem é carregada do caminho './Medias/thumb.jpg'
        Skye.sendMessage(m.chat, {
            image: fs.readFileSync('./Medias/thumb.jpg'),
            caption: menugrupostext // Texto do menu de comandos
        }, {
            quoted: m // Cita a mensagem original
        });
    }
    break; // Sai do bloco de código do case
}


                // Case Antiga Backup
            /* 
        case 'menu':
            let skyemneu = `*E aí ${pushname}!* Bom te ver por aqui, viu?\n
🔮 Você pode me chamar de Skye, sou uma BOT desenvolvida para facilitar seu uso no WhatsApp.

*Segue abaixo meus comandos!* 

📡 Comandos principais!
• menu
• menugrupos (Execução somente em grupos!)
• suporte
• online

👨‍💻 Comandos para conversões!
• sticker 
• placaloli Texto 
• meme Texto/Texto
• roubar Texto/Texto
• qc
• toimage
• tovideo
• toaudio
• tomp3
• tovn
• togif
• tourl
• qr (texto)
• visuunica
• emojimix (emoji+emoji)

📲 Comandos para fazer download!
• tiktok (Link do vídeo) *(Sem suporte com vídeos com imagens)*
• instagram (Link do reels/stories/postagem)
• twitter (Link do vídeo) *(Sem suporte com tweets com imagem)*
`
            Skye.sendMessage(m.chat, {
                image: fs.readFileSync('./Medias/menuinicio.png'),
                caption: skyemneu
            }, {
                quoted: m
            })
            break */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Case para menu downloads com detecção OS
case 'menudownloads':
if (!m.isGroup && !SkyeCreator && !isAdmins && !isGroupOwner) return SkyeEnviar(SkyeMensagens.group)
const plataforma3 = m.key.id.length > 31 ? 'Android' : m.key.id.substring(0, 2) === '3A' ? 'IOS' : m.key.id.length === 22 ? 'WhatsApp Web' : '';
let menudownloads = `👋 Olá, como vai *${pushname}*?\n
Sou a Skye, um BOT desenvolvido para auxiliar o seu uso no *WhatsApp*

_*Segue abaixo meus comandos para downloads!*_ 🙋‍♂️

• tiktok
*Suporta links com foto e vídeo*

• insta
*Suporta posts com imagem e vídeos, reels e stories*

• x
• twitter
*Suporta posts com vídeo, gif e imagem*

> Para garantir que todos possam aproveitar nossos comandos, cada usuário pode usá-los até 5 vezes ao dia. Se você deseja um acesso ilimitado, basta clicar no botão *🌟 Comprar Premium* ou digitar o comando 'comprar'. Aproveite! 

_Se precisar de qualquer ajuda adicional, é só me chamar!_
> Lembrando que estou em fase BETA! 📲`
            if (plataforma3 === 'IOS') {
                // Case for iPhone
                await Skye.sendMessage(m.chat, {
                    image: fs.readFileSync('./Medias/menuinicio.png'),
                    caption: ``
                },)
                await Skye.relayMessage(from, {
                    interactiveMessage: {
                        body: {
                            text: menudownloads
                        },
                        nativeFlowMessage: {
                            buttons: [{
                                      name: "quick_reply",
                                      buttonParamsJson: JSON.stringify({
                                          display_text: "🌟 Comprar Premium",
                                          id: `comprar`
                                      }),
  
                                  },
                                  {
                                      name: "quick_reply",
                                      buttonParamsJson: JSON.stringify({
                                          display_text: "🔙 Voltar",
                                          id: `menu`
                                      }),
                                  },
                                  ],
                            messageParamsJson: "",
                        },
                    },
                }, {}).then((r) => console.log(r));
            } else if (plataforma3 === 'Android') {
                // Case for Android
                let msg = generateWAMessageFromContent(from, {
                    viewOnceMessage: {
                        message: {
                            "messageContextInfo": {
                                "deviceListMetadata": {},
                                "deviceListMetadataVersion": 2
                            },
                            interactiveMessage: proto.Message.InteractiveMessage.create({
                                body: proto.Message.InteractiveMessage.Body.create({
                                    text: menudownloads // legenda
                                }),
                                footer: proto.Message.InteractiveMessage.Footer.create({
                                    text: '' // footer
                                }),
                                header: proto.Message.InteractiveMessage.Header.create({
                                    // imagem em url json
                                    ...(await prepareWAMessageMedia({
                                        image: fs.readFileSync('./Medias/menuinicio.png')
                                    }, {
                                        upload: Skye.waUploadToServer
                                    })),
                                    title: ``, // caption
                                    gifPlayback: true,
                                    subtitle: 'cuzin',
                                    hasMediaAttachment: false
                                }),
                                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                                    buttons: [{
                                        "name": "quick_reply",
                                        "buttonParamsJson": `{\"display_text\":\"🌟 Comprar Premium\",\"id\":\"comprar\"}`
                                    },
                                    {
                                        "name": "quick_reply",
                                        "buttonParamsJson": `{\"display_text\":\"🔙 Voltar\",\"id\":\"menu\"}`
                                    }
                                    ],
                                }),
                                contextInfo: {
                                    mentionedJid: [sender],
                                    isForwarded: false,
                                    forwardedNewsletterMessageInfo: {
                                        newsletterJid: "kk",
                                        newsletterName: 'cuzin',
                                        serverMessageId: 143
                                    }
                                }
                            })
                        }
                    }
                }, {});
    
                await Skye.relayMessage(msg.key.remoteJid, msg.message, {
                    messageId: msg.key.id
                });
            } else if (plataforma3 === 'WhatsApp Web') {
                // Case for WhatsApp Web
                Skye.sendMessage(m.chat, {
                    image: fs.readFileSync('./Medias/menuinicio.jpg'),
                    caption: menudownloads
                }, {
                    quoted: m
                });
            }
            break;

            case 'teste':
                {
                    waifudd = await axios.get(`https://waifu.pics/api/sfw/megumin`)       
                                            let msg = generateWAMessageFromContent(from, {
                               viewOnceMessage: {
                                   message: {
                                       "messageContextInfo": {
                                           "deviceListMetadata": {},
                                           "deviceListMetadataVersion": 2
                                       },
                                       interactiveMessage: proto.Message.InteractiveMessage.create({
                                           body: proto.Message.InteractiveMessage.Body.create({
                                               text: 'Aqui está'//legenda 
                                           }),
                                           footer: proto.Message.InteractiveMessage.Footer.create({
                                               text: ''//footer
                                           }),
                                           header: proto.Message.InteractiveMessage.Header.create({
                                           //imagem em url json 
                                               ...(await prepareWAMessageMedia({ image: {url: waifudd.data.url}}, { upload: Skye.waUploadToServer })),
                                               title: ``,//caption 
                                               gifPlayback: true,
                                               subtitle: ``,
                                               hasMediaAttachment: false
                                           }),
                                           nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                                               buttons: [
                                                    {
                                                   "name": "quick_reply",
                                                   "buttonParamsJson": `{\"display_text\":\"Próximo\",\"id\":\"teste\"}`
                                               }],
                                           }),
                                           contextInfo: {
                                               mentionedJid: [sender],
                                               forwardingScore: 999,
                                               isForwarded: true,
                                               forwardedNewsletterMessageInfo: {
                                                   newsletterJid: "kk",
                                                   newsletterName: ``,
                                                   serverMessageId: 143
                                               }
                                           }
                                       })
                                   }
                               }
                           }, {});
                   
                           await Skye.relayMessage(msg.key.remoteJid, msg.message, {
                               messageId: msg.key.id
                           });}
                           break

// Case para exibir o menu com botões e detecção de sistema operacional (OS)
case 'menu': {
    // Determina a plataforma do remetente com base no ID da mensagem
    // Se o comprimento do ID for maior que 31, assume-se que é Android
    // Se os primeiros dois caracteres do ID forem '3A', assume-se que é iOS
    // Se o comprimento do ID for 22, assume-se que é WhatsApp Web
    // Caso contrário, a plataforma é desconhecida
    const plataforma = m.key.id.length > 31 
        ? 'Android' 
        : m.key.id.substring(0, 2) === '3A' 
            ? 'IOS' 
            : m.key.id.length === 22 
                ? 'WhatsApp Web' 
                : '';

    // Define o texto do menu com a lista de comandos disponíveis e informações gerais
    let menutext = `*E aí ${pushname}!* Bom te ver por aqui, viu?\n
🔮 Você pode me chamar de Skye, sou uma BOT desenvolvida para facilitar seu uso no WhatsApp.

*Segue abaixo meus comandos!* 

📡 Comandos principais!
• menu
• menugrupos (Execução somente em grupos!)
• suporte
• online

👨‍💻 Comandos para conversões!
• sticker 
• placaloli Texto 
• meme Texto/Texto
• roubar Texto/Texto
• qc
• toimage
• tovideo
• toaudio
• tomp3
• tovn
• togif
• tourl
• qr (texto)
• visuunica
• emojimix (emoji+emoji)

📲 Comandos para fazer download!
• Cheque os comandos de download clicando no botão *📲 Menu downloads* ou escreva *menudownloads*!

> Plataforma: ${plataforma}`;

    // Caso para iPhone (iOS)
    if (plataforma === 'IOS') {
        // Envia uma imagem com a legenda vazia para iOS
        // A imagem é carregada do caminho './Medias/menuinicio.png'
        await Skye.sendMessage(m.chat, {
            image: fs.readFileSync('./Medias/menuinicio.png'),
            caption: '' // Legenda vazia
        });

        // Envia uma mensagem interativa com botões para iPhone
        // Os botões permitem acessar diferentes menus e suporte
        await Skye.relayMessage(from, {
            interactiveMessage: {
                body: {
                    text: menutext // Texto do menu
                },
                nativeFlowMessage: {
                    buttons: [
                        // Botão para Menu Downloads
                        {
                            name: "quick_reply",
                            buttonParamsJson: JSON.stringify({
                                display_text: "📲 Menu downloads", // Texto exibido no botão
                                id: `menudownloads` // ID do botão para identificação
                            }),
                        },
                        // Botão para Menu Dono
                        {
                            name: "quick_reply",
                            buttonParamsJson: JSON.stringify({
                                display_text: "🛡️ Menu Dono",
                                id: `menudono`
                            }),
                        },
                        // Botão para Menu Grupos
                        {
                            name: "quick_reply",
                            buttonParamsJson: JSON.stringify({
                                display_text: "👥 Menu Grupos",
                                id: `menugrupos`
                            }),
                        },
                        // Botão para Suporte
                        {
                            name: "quick_reply",
                            buttonParamsJson: JSON.stringify({
                                display_text: "❓ Suporte",
                                id: `suporte`
                            }),
                        },
                        // Botão para Verificar uptime
                        {
                            name: "quick_reply",
                            buttonParamsJson: JSON.stringify({
                                display_text: "🟢 Confira meu uptime!",
                                id: `online`
                            }),
                        },
                    ],
                    messageParamsJson: "", // Parâmetros da mensagem (vazio neste caso)
                },
            },
        }, {}).then((r) => console.log(r)); // Log do resultado da operação
    } 
    // Caso para Android
    else if (plataforma === 'Android') {
        // Gera uma mensagem com mídia e informações interativas para Android
        // Utiliza a função `generateWAMessageFromContent` para criar a mensagem
        let msg = generateWAMessageFromContent(from, {
            viewOnceMessage: {
                message: {
                    "messageContextInfo": {
                        "deviceListMetadata": {},
                        "deviceListMetadataVersion": 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: menutext // Texto do menu
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: '' // Rodapé vazio
                        }),
                        header: proto.Message.InteractiveMessage.Header.create({
                            // Adiciona uma imagem ao cabeçalho da mensagem
                            ...(await prepareWAMessageMedia({
                                image: fs.readFileSync('./Medias/menuinicio.png') // Carrega a imagem do caminho especificado
                            }, {
                                upload: Skye.waUploadToServer // Função para upload da imagem
                            })),
                            title: '', // Título vazio
                            gifPlayback: true, // Permite reprodução de GIFs (não utilizado aqui)
                            subtitle: 'cuzin', // Subtítulo
                            hasMediaAttachment: true // Indica que não há anexos de mídia
                        }),
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            buttons: [
                                // Botão para Menu Downloads
                                {
                                    "name": "quick_reply",
                                    "buttonParamsJson": `{\"display_text\":\"📲 Menu downloads\",\"id\":\"menudownloads\"}`
                                },
                                // Botão para Menu Dono
                                {
                                    "name": "quick_reply",
                                    "buttonParamsJson": `{\"display_text\":\"🛡️ Menu Dono\",\"id\":\"menudono\"}`
                                },
                                // Botão para Menu Grupos
                                {
                                    "name": "quick_reply",
                                    "buttonParamsJson": `{\"display_text\":\"👥 Menu Grupos\",\"id\":\"menugrupos\"}`
                                },
                                // Botão para Suporte
                                {
                                    "name": "quick_reply",
                                    "buttonParamsJson": `{\"display_text\":\"❓ Suporte\",\"id\":\"suporte\"}`
                                },
                                // Botão para Verificar uptime
                                {
                                    "name": "quick_reply",
                                    "buttonParamsJson": `{\"display_text\":\"🟢 Confira meu uptime!\",\"id\":\"online\"}`
                                },
                            ],
                        }),
                        contextInfo: {
                            mentionedJid: [sender], // Menciona o remetente
                            isForwarded: false, // Indica que a mensagem não foi encaminhada
                            forwardedNewsletterMessageInfo: {
                                newsletterJid: "kk",
                                newsletterName: 'cuzin',
                                serverMessageId: 143
                            }
                        }
                    })
                }
            }
        }, {});

        // Envia a mensagem gerada para o remetente
        await Skye.relayMessage(msg.key.remoteJid, msg.message, {
            messageId: msg.key.id // ID da mensagem para rastreamento
        });
    } 
    // Caso para WhatsApp Web
    else if (plataforma === 'WhatsApp Web') {
        // Envia uma imagem com a legenda para WhatsApp Web
        // A imagem é carregada do caminho './Medias/menuinicio.png'
        Skye.sendMessage(m.chat, {
            image: fs.readFileSync('./Medias/menuinicio.png'),
            caption: menutext // Texto do menu
        }, {
            quoted: m // Cita a mensagem original para contexto
        });
    }
    break; // Sai do bloco de código do case
}


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Comandos sem prefixo                
default:
                if (budy.startsWith('=>')) { // Definição para executar linhas de código no proprio chat do WhatsApp
                    if (!SkyeCreator) return SkyeEnviar(SkyeMensagens.dono)

                    function Return(sul) {
                        sat = JSON.stringify(sul, null, 2)
                        bang = util.format(sat)
                        if (sat == undefined) {
                            bang = util.format(sul)
                        }
                        return SkyeEnviar(bang)
                    }
                    try {
                        SkyeEnviar(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
                    } catch (e) {
                        SkyeEnviar(String(e))
                    }
                }

                if (budy.startsWith('>')) {
                    if (!SkyeCreator) return SkyeEnviar(SkyeMensagens.dono)
                    try {
                        let evaled = await eval(budy.slice(2))
                        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                        await SkyeEnviar(evaled)
                    } catch (err) {
                        await SkyeEnviar(String(err))
                    }
                }
                if (budy.startsWith('$')) {
                    if (!SkyeCreator) return SkyeEnviar(SkyeMensagens.dono)
                    exec(budy.slice(2), (err, stdout) => {
                        if (err) return SkyeEnviar(err)
                        if (stdout) return SkyeEnviar(stdout)
                    })
                }
        }
    } catch (err) {
        Skye.sendText(ownernumber + '@s.whatsapp.net', util.format(err), m)
        console.log(util.format(err))
    }
}
let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`❗️ Atualização detectada em ${__filename}`)) // Log para atualizações detectadas neste arquivo
    delete require.cache[file]
    require(file)
    process.exit() // Para reiniciar o BOT após alguma alteração detectada
})

process.on('uncaughtException', function (err) {
    let e = String(err)
    if (e.includes("Socket connection timeout")) return
    if (e.includes("item-not-found")) return
    if (e.includes("rate-overlimit")) return
    if (e.includes("Connection Closed")) return
    if (e.includes("Timed Out")) return
    if (e.includes("Value not found")) return
    console.log('Caught exception: ', err)
})