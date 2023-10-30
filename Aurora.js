// OBS NAO FUI EU QUEM CRIO ESTE BOT SO FIZ TRADUZIR E ADICIONEI ALGUNS COMANDO DE MÚSICA APENAS NAO VEM COPIAR E DIZER QUE FOI VC QUE FEZ CRÉDITOS AO XEON

const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@whiskeysockets/baileys')
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
const { exec, spawn, execSync } = require("child_process")
const { performance } = require('perf_hooks')
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)
const { TelegraPh, UploadFileUgu, webp2mp4File, floNime } = require('./lib/uploader')
const { toAudio, toPTT, toVideo, ffmpeg, addExifAvatar } = require('./lib/converter')
const { smsg, getGroupAdmins, formatp, jam, formatDate, getTime, isUrl, await, sleep, clockString, msToDate, sort, toNumber, enumGetKey, runtime, fetchJson, getBuffer, json, delay, format, logic, generateProfilePicture, parseMention, getRandom, pickRandom, reSize } = require('./lib/myfunc')
let afk = require("./lib/afk");
const { addPremiumUser, getPremiumExpired, getPremiumPosition, expiredCheck, checkPremiumUser, getAllPremiumUser } = require('./lib/premiun')
const { fetchBuffer, buffergif } = require("./lib/myfunc2")
const ytdl  = require('ytdl-core');
const {youtubedl, youtubedlv2}  = require('@bochilteam/scraper');
const { payment } = require("./lib/PixAPI-MercadoPago-Js/index.js")

//database
let premium = JSON.parse(fs.readFileSync('./database/premium.json'))
let dono2 = JSON.parse(fs.readFileSync('./database/dono.json'))
let dono = JSON.parse(fs.readFileSync('./database/dono.json'))
let _afk = JSON.parse(fs.readFileSync('./database/afk-user.json'))
let hit = JSON.parse(fs.readFileSync('./database/total-hit-user.json'))

//tempo
const Tempo = moment.tz('America/Sao_Paulo').format('HH:mm:ss')
        const Data = moment.tz('America/Sao_Paulo').format('DD/MM/YYYY')
        const time2 = moment().tz('America/Sao_Paulo').format('HH:mm:ss')  
         if(time2 < "00:00:00"){
var Horas = `Boa Madrugada 🌌`
 }
 if(time2 < "19:00:00"){
var Horas = `Boa noite 🌃`
 }
 if(time2 < "18:00:00"){
var Horas = `Boa noite 🌃`
 }
 if(time2 < "15:00:00"){
var Horas = `Boa tarde 🌅`
 }
 if(time2 < "11:00:00"){
var Horas = `Bom dia 🌄`
 }
 if(time2 < "05:00:00"){
var Horas = `Bom dia 🌄`
 } 
module.exports = Aurora = async (Aurora, m, msg, chatUpdate, store) => {
    try {
        const {
            type,
            quotedMsg,
            mentioned,
            now,
            fromMe
        } = m
        var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectenviar.selectedRowId : (m.mtype == 'templateButtonenviarMessage') ? m.message.templateButtonenviarMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectenviar.selectedRowId || m.text) : ''
        var budy = (typeof m.text == 'string' ? m.text : '')
        var prefix = prefa ? /^[/]/gi.test(body) ? body.match(/^[/]/gi)[0] : "" : prefa ?? global.prefix
        const isCmd = body.startsWith(prefix)
        const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1)
        const full_args = body.replace(command, '').slice(1).trim()
        const pushname = m.pushName || "No Name"
        const botNumber = await Aurora.decodeJid(Aurora.user.id)
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
        const groupMetadata = m.isGroup ? await Aurora.groupMetadata(m.chat).catch(e => {}) : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''
        const participants = m.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
        const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
        const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
        const groupOwner = m.isGroup ? groupMetadata.dono : ''
        const isGroupOwner = m.isGroup ? (groupOwner ? groupOwner : groupAdmins).includes(m.sender) : false
        const isCreator = [ownernumber, ...dono2].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const isPremium = isCreator || isCreator || checkPremiumUser(m.sender, premium);
        expiredCheck(Aurora, m, premium);
//mensagem de bate-papo em grupo
const enviar = (teks) => {
Aurora.sendMessage(m.chat,
{ text: teks,
contextInfo:{
mentionedJid:[sender],
/*"externalAdReply": {
"showAdAttribution": true,
"containsAutoReply": true,
"title": ` ${global.botname}`,
"body": `${ownername}`,
"previewType": "PHOTO",
"thumbnailUrl": `https://telegra.ph/file/e1ecc93149ae85ad1b860.jpg`,
"thumbnail": fs.readFileSync(`./Medias/aurorathumb.jpg`),
"sourceUrl": `${link}`}*/
}},
{ quoted: m})
}

async function loading () {
var xeonlod = [
"《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
"《 ████▒▒▒▒▒▒▒▒》30%",
"《 ███████▒▒▒▒▒》50%",
"《 ██████████▒▒》80%",
"《 ████████████》100%",
"Carregado com Sucesso 📌..."
]
let { key } = await Aurora.sendMessage(from, {text: 'Concluido...'})

for (let i = 0; i < xeonlod.length; i++) {
await Aurora.sendMessage(from, {text: xeonlod[i], edit: key });
}
}

        if (!Aurora.public) {
            if (!isCreator && !m.key.fromMe) return
        }
        if (autoread) {
            Aurora.readMessages([m.key])
        }
        if (global.autoTyping) {

        Aurora.sendPresenceUpdate('composing', from)


        }

        if (global.autoRecording) {

        Aurora.sendPresenceUpdate('recording', from)

        }

        
        //status online do número do bot, disponível=online, indisponível=offline
        Aurora.sendPresenceUpdate('unavailable', from)
        
        if (global.autorecordtype) {
        let xeonrecordin = ['recording','composing']

        let xeonrecordinfinal = xeonrecordin[Math.floor(Math.random() * xeonrecordin.length)]

        Aurora.sendPresenceUpdate(xeonrecordinfinal, from)

        }
        
        if (autobio) {
            Aurora.updateProfileStatus(`BOT Online, desenvolvido por ${ownername}`).catch(_ => _)
        }
        if (m.sender.startsWith('92') && global.anti92 === true) {
            return Aurora.updateBlockStatus(m.sender, 'block')
        }
        let list = []
        for (let i of dono) {
list.push({
	    	displayName: await Aurora.getName(i),
	    	vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await Aurora.getName(i)}\nFN:${await Aurora.getName(i)}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Click here to chat\nitem2.EMAIL;type=INTERNET:${ytname}\nitem2.X-ABLabel:YouTube\nitem3.URL:${socialm}\nitem3.X-ABLabel:GitHub\nitem4.ADR:;;${location};;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
	    })
	}
	
	//contador de bate-papo (registro do console)
        if (m.message && m.isGroup) {
			console.log(chalk.blue(`Conversa em grupo:`))
            console.log((chalk.blueBright('Mensagem:')), (chalk.whiteBright(budy || m.mtype)) + '\n' + chalk.blueBright('Usuário:'), chalk.whiteBright(pushname) + '\n' + chalk.blueBright('Grupo:'), chalk.whiteBright(groupName, m.chat))
            console.log(chalk.blueBright('Telefone:'), chalk.whiteBright(m.sender.split("@")[0]))
            console.log(chalk.green(``))
        } else {
			console.log(chalk.blue(`Conversa no privado:`))
            console.log((chalk.blueBright('Mensagem:')), (chalk.whiteBright(budy || m.mtype)) + '\n' + chalk.blueBright('Usuário:'), chalk.whiteBright(pushname))
            console.log(chalk.blueBright('Telefone:'), chalk.whiteBright(m.sender.split("@")[0]))
            console.log(chalk.green(``))
        }

        if (command) {
            const cmdadd = () => {
                hit[0].hit_cmd += 1
                fs.writeFileSync('./database/total-hit-user.json', JSON.stringify(hit))
            }
            cmdadd()
            const totalhit = JSON.parse(fs.readFileSync('./database/total-hit-user.json'))[0].hit_cmd
        }
                
        if (m.isGroup && !m.key.fromMe) {
            let mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
            for (let ment of mentionUser) {
                if (afk.checkAfkUser(ment, _afk)) {
                    let getId2 = afk.getAfkId(ment, _afk)
                    let getReason2 = afk.getAfkReason(getId2, _afk)
                    let getTimee = Date.now() - afk.getAfkTime(getId2, _afk)
                    let heheh2 = ms(getTimee)
                    enviar(`Não marque ele, ele está AFK\n\n*Motivo:* ${getReason2}`)
                }
            }
            if (afk.checkAfkUser(m.sender, _afk)) {
                let getId = afk.getAfkId(m.sender, _afk)
                let getReason = afk.getAfkReason(getId, _afk)
                let getTime = Date.now() - afk.getAfkTime(getId, _afk)
                let heheh = ms(getTime)
                _afk.splice(afk.getAfkPosition(m.sender, _afk), 1)
                fs.writeFileSync('./database/afk-user.json', JSON.stringify(_afk))
                Aurora.sendTextWithMentions(m.chat, `@${m.sender.split('@')[0]} Voltei do AFK`, m)
            }
        }
        switch (command) {
            case 'addprem':
                case 'addpremium':
                if (!isCreator) return enviar(mess.dono)
                if (args.length < 2)
                    return enviar(`Use :\n*#addprem* @\n*#addprem* numero tempo\n\nExemplo: #addprem @flavio 30d`);
                if (m.mentionedJid.length !== 0) {
                    for (let i = 0; i < m.mentionedJid.length; i++) {
                        addPremiumUser(m.mentionedJid[0], args[1], premium);
                    }
                    enviar("✅ Premium adicionado com sucesso!")
                } else {
                    addPremiumUser(args[0] + "@s.whatsapp.net", args[1], premium);
                    enviar("✅ Sucesso")
                }
                break

            case 'delprem':
            case 'delpremium':
                if (!isCreator) return enviar(mess.dono)
                if (args.length < 1) return enviar(`Use :\n*#delprem* @\n*#delprem* numero`);
                if (m.mentionedJid.length !== 0) {
                    for (let i = 0; i < m.mentionedJid.length; i++) {
                        premium.splice(getPremiumPosition(m.mentionedJid[i], premium), 1);
                        fs.writeFileSync("./database/premium.json", JSON.stringify(premium));
                    }
                    enviar("✅ Premium deletado com sucesso")
                } else {
                    premium.splice(getPremiumPosition(args[0] + "@s.whatsapp.net", premium), 1);
                    fs.writeFileSync("./database/premium.json", JSON.stringify(premium));
                    enviar("✅ Sucesso")
                }
                break

            case 'listprem': {
                if (!isCreator) return enviar(mess.dono)
                let data = require("./database/premium.json")
                let txt = `*------「 LISTA PREMIUM 」------*\n\n`
                for (let i of data) {
                    txt += `Número : ${i.id}\n`
                    txt += `Expirado : ${i.expired} Segundo\n`         
                }                
                Aurora.sendMessage(m.chat, {
                    text: txt,
                    mentions: i
                }, {
                    quoted: m
                })
            }
            break

            case 'apagarsessao':
            case 'delsession':
            case 'clearsession': {
                if (!isCreator) return enviar(mess.dono)
                fs.readdir("./session", async function(err, files) {
                    if (err) {
                        console.log('Não foi possível verificar o diretório: ' + err);
                        return enviar('❗️ Não foi possível verificar o diretório: ' + err);
                    }
                    let filteredArray = await files.filter(item => item.startsWith("pre-key") ||
                        item.startsWith("sender-key") || item.startsWith("session-") || item.startsWith("app-state")
                    )
                    console.log(filteredArray.length);
                    let teks = `Arquivos indesejados ${filteredArray.length} detectados\n\n`
                    if (filteredArray.length == 0) return enviar(teks)
                    filteredArray.map(function(e, i) {
                        teks += (i + 1) + `. ${e}\n`
                    })
                    enviar(teks)
                    await sleep(2000)
                    enviar("❗️ Exclua arquivos inúteis...")
                    await filteredArray.forEach(function(file) {
                        fs.unlinkSync(`./session/${file}`)
                    });
                    await sleep(2000)
                    enviar("⚠️ Excluiu com sucesso toda a lixeira da pasta da sessão")
                });
            }
            break

            case 'entrargp':
			case 'join':
                try {
                    if (!isCreator) return enviar(mess.dono)
                    if (!text) return enviar('❗️ Insira o link do grupo!')
                    if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return enviar('❌ Link invalido!')
                    enviar(mess.wait)
                    let result = args[0].split('https://chat.whatsapp.com/')[1]
                    await Aurora.groupAcceptInvite(result).then((res) => enviar(json(res))).catch((err) => enviar(json(err)))
                } catch {
                    enviar('❌ Falha ao entrar no grupo')
                }
                break  

            case 'pegarsessao':
            case 'pegarsessão':
                if (!isCreator) return enviar(mess.dono)
                enviar('🕘 Aguarde um momento, recuperando seu arquivo de sessão')
                let sesi = await fs.readFileSync('./session/creds.json')
                Aurora.sendMessage(m.chat, {
                    document: sesi,
                    mimetype: 'application/json',
                    fileName: 'creds.json'
                }, {
                    quoted: m
                })
                break

            case 'shutdown':
            case 'desligar':
			case 'rr':
                if (!isCreator) return enviar(mess.dono)
                enviar(`🕘 Desligando...`)
                await sleep(3000)
                process.exit()
                break

            case 'visu':
                if (!isCreator) return enviar(mess.dono)
                if (args.length < 1) return enviar(`Exemplo ${prefix + command} on/off`)
                if (q === 'on') {
                    autoread = true
                    enviar(`✅ Leitura automática alterada com sucesso para ${q}`)
                } else if (q === 'off') {
                    autoread = false
                    enviar(`✅ Leitura automática alterada com sucesso para ${q}`)
                }
                break

                case 'digitando':
                if (!isCreator) return enviar(mess.dono)
                if (args.length < 1) return enviar(`Exemplo ${prefix + command} on/off`)
                if (q === 'on') {
                    autoTyping = true
                    enviar(`✅ Alterada com sucesso a digitação automática para ${q}`)
                } else if (q === 'off') {
                    autoTyping = false
                    enviar(`✅ A digitação automática foi alterada com sucesso para ${q}`)
                }
                break

                case 'gravandoaudio':
                if (!isCreator) return enviar(mess.dono)
                if (args.length < 1) return enviar(`Exemplo ${prefix + command} on/off`)
                if (q === 'on') {
                    autoRecording = true
                    enviar(`✅ Gravação automática alterada com sucesso para ${q}`)
                } else if (q === 'off') {
                    autoRecording = false
                    enviar(`✅ Gravação automática alterada com sucesso para ${q}`)
                }
                break

                case 'audiodigitando':
                if (!isCreator) return enviar(mess.dono)
                if (args.length < 1) return enviar(`Exemplo ${prefix + command} on/off`)
                if (q === 'on') {
                    autorecordtype = true
                    enviar(`✅Gravação e digitação automáticas alteradas com sucesso para ${q}`)
                } else if (q === 'off') {
                    autorecordtype = false
                    enviar(`✅ Gravação e digitação automáticas alteradas com sucesso para ${q}`)
                }
                break

                case 'visustatus':
                case 'visualizarstatus':
                if (!isCreator) return enviar(mess.dono)
                if (args.length < 1) return enviar(`Exemplo ${prefix + command} on/off`)
                if (q === 'on') {
                    autoread_status = true
                    enviar(`✅ Status automático/visualização de história alterado com sucesso para ${q}`)
                } else if (q === 'off') {
                    autoread_status = false
                    enviar(`✅Status automático/visualização de história alterado com sucesso para ${q}`)
                }
                break

            case 'autobio':
                if (!isCreator) return enviar(mess.dono)
                if (args.length < 1) return enviar(`Exemplo ${prefix + command} on/off`)
                if (q == 'on') {
                    autobio = true
                    enviar(`✅ AutoBio alterado com sucesso para ${q}`)
                } else if (q == 'off') {
                    autobio = false
                    enviar(`✅ AutoBio alterado com sucesso para ${q}`)
                }
                break

            case 'modo':
                if (!isCreator) return enviar(mess.dono)
                if (args.length < 1) return enviar(`Exemplo ${prefix + command} public/self`)
                if (q == 'public') {
                    Aurora.public = true
                    enviar(mess.done)
                } else if (q == 'self') {
                    Aurora.public = false
                    enviar(mess.done)
                }
                break

            case 'setexif':
                if (!isCreator) return enviar(mess.dono)
                if (!text) return enviar(`Exemplo: ${prefix + command} packname/author`)
                global.packname = text.split("/")[0]
                global.author = text.split("/")[1]
                enviar(`✅ Exif alterado com sucesso para\n\n• Nome do pacote: ${global.packname}\n• Autor: ${global.author}`)
                break

            case 'addfoto':
            case 'setpp':
            case 'setppbot':
                if (!isCreator) return enviar(mess.dono)
                if (!quoted) return enviar(`🛑 Enviar/Responder Imagem com Legenda ${prefix + command}`)
                if (!/image/.test(mime)) return enviar(`🛑 Enviar/Responder Imagem com Legenda ${prefix + command}`)
                if (/webp/.test(mime)) return enviar(`🛑 Enviar/Responder Imagem com Legenda ${prefix + command}`)
                var medis = await Aurora.downloadAndSaveMediaMessage(quoted, 'ppbot.jpeg')
                if (args[0] == 'full') {
                    var {
                        img
                    } = await generateProfilePicture(medis)
                    await Aurora.query({
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
                    })
                    fs.unlinkSync(medis)
                    enviar(mess.done)
                } else {
                    var memeg = await Aurora.updateProfilePicture(botNumber, {
                        url: medis
                    })
                    fs.unlinkSync(medis)
                    enviar(mess.done)
                }
                break

            case 'block':
                if (!isCreator) return enviar(mess.dono)
                let blockw = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                await Aurora.updateBlockStatus(blockw, 'block').then((res) => enviar(json(res))).catch((err) => enviar(json(err)))
				enviar('✅ Bloqueado com sucesso!')
                break

            case 'unblock':
                if (!isCreator) return enviar(mess.dono)
                let blockww = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                await Aurora.updateBlockStatus(blockww, 'unblock').then((res) => enviar(json(res))).catch((err) => enviar(json(err)))
				enviar('✅ Desbloqueado com sucesso!')
                break

            case 'leave':
            case 'sairgp':
                if (!isCreator) return enviar(mess.dono)
                if (!m.isGroup) return enviar(mess.group)
                enviar('✅ Saindo do grupo...')
                await Aurora.groupLeave(m.chat)
                break
            
            case 'delete':
            case 'del': {
                if (!isCreator) return enviar(mess.done)
                if (!m.quoted) throw false
                let {
                    chat,
                    fromMe,
                    id,
                    isBaileys
                } = m.quoted
                if (!isBaileys) return enviar('❗️ Esta mensagem não foi enviada por mim!')
                Aurora.sendMessage(m.chat, {
                    delete: {
                        remoteJid: m.chat,
                        fromMe: false,
                        id: m.quoted.id,
                        participant: m.quoted.sender
                    }
                })
            }
            break

            case 'kick':
                if (!m.isGroup) return enviar(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return enviar(mess.admin)
                if (!isBotAdmins) return enviar(mess.botAdmin)
                let blockwww = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                await Aurora.groupParticipantsUpdate(m.chat, [blockwww], 'remove').then((res) => enviar(json(res))).catch((err) => enviar(json(err)))
                break

            case 'add':
                if (!m.isGroup) return enviar(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return enviar(mess.admin)
                if (!isBotAdmins) return enviar(mess.botAdmin)
                let blockwwww = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                await Aurora.groupParticipantsUpdate(m.chat, [blockwwww], 'add').then((res) => enviar(json(res))).catch((err) => enviar(json(err)))
                break

            case 'promote':
                if (!m.isGroup) return enviar(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return enviar(mess.admin)
                if (!isBotAdmins) return enviar(mess.botAdmin)
                let blockwwwww = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                await Aurora.groupParticipantsUpdate(m.chat, [blockwwwww], 'promote').then((res) => enviar(json(res))).catch((err) => enviar(json(err)))
                break

            case 'demote':
                if (!m.isGroup) return enviar(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return enviar(mess.admin)
                if (!isBotAdmins) return enviar(mess.botAdmin)
                let blockwwwwwa = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                await Aurora.groupParticipantsUpdate(m.chat, [blockwwwwwa], 'demote').then((res) => enviar(json(res))).catch((err) => enviar(json(err)))
                break

            case 'nomegp':
                if (!m.isGroup) return enviar(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return enviar(mess.admin)
                if (!isBotAdmins) return enviar(mess.botAdmin)
                if (!text) return '❗️ Por favor insira o texto!'
                await Aurora.groupUpdateSubject(m.chat, text).then((res) => enviar(mess.success)).catch((err) => enviar(json(err)))
                break

            case 'descgp':
            case 'setdesk':
                if (!m.isGroup) return enviar(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return enviar(mess.admin)
                if (!isBotAdmins) return enviar(mess.botAdmin)
                if (!text) return '❗️ Por favor insira o texto!'
                await Aurora.groupUpdateDescription(m.chat, text).then((res) => enviar(mess.success)).catch((err) => enviar(json(err)))
                break

            case 'fotogp':
            case 'setppgrup':
            case 'setppgc':
                if (!m.isGroup) return enviar(mess.group)
                if (!isAdmins) return enviar(mess.admin)
                if (!isBotAdmins) return enviar(mess.botAdmin)
                if (!quoted) return enviar(`🛑 Enviar/Responder Imagem com Legenda ${prefix + command}`)
                if (!/image/.test(mime)) return enviar(`🛑 Enviar/Responder Imagem com Legenda ${prefix + command}`)
                if (/webp/.test(mime)) return enviar(`🛑 Enviar/Responder Imagem com Legenda ${prefix + command}`)
                var medis = await Aurora.downloadAndSaveMediaMessage(quoted, 'ppbot.jpeg')
                if (args[0] == 'full') {
                    var {
                        img
                    } = await generateProfilePicture(medis)
                    await Aurora.query({
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
                    })
                    fs.unlinkSync(medis)
                    enviar(mess.done)
                } else {
                    var memeg = await Aurora.updateProfilePicture(m.chat, {
                        url: medis
                    })
                    fs.unlinkSync(medis)
                    enviar(mess.done)
                }
                break

            case 'hidetag':
                if (!m.isGroup) return enviar(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return enviar(mess.admin)
                if (!isBotAdmins) return enviar(mess.botAdmin)
                Aurora.sendMessage(m.chat, {
                    text: q ? q : '',
                    mentions: participants.map(a => a.id)
                }, {
                    quoted: m
                })
                break

            case 'grupo':
                if (!m.isGroup) return enviar(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return enviar(mess.admin)
                if (!isBotAdmins) return enviar(mess.botAdmin)
                if (args[0] === 'close') {
                    await Aurora.groupSettingUpdate(m.chat, 'announcement').then((res) => enviar(`✅ Grupo fechado com sucesso!`)).catch((err) => enviar(json(err)))
                } else if (args[0] === 'open') {
                    await Aurora.groupSettingUpdate(m.chat, 'not_announcement').then((res) => enviar(`✅ Grupo aberto com sucesso!`)).catch((err) => enviar(json(err)))
                } else {
                    enviar(`❗️ Modo ${command}\n\n\nTipo ${prefix + command}open/close`)
                }
                break

            case 'editinfo':
                if (!m.isGroup) return enviar(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return enviar(mess.admin)
                if (!isBotAdmins) return enviar(mess.botAdmin)
                if (args[0] === 'open') {
                    await Aurora.groupSettingUpdate(m.chat, 'unlocked').then((res) => enviar(`✅ Informações de edição do grupo aberto com sucesso`)).catch((err) => enviar(json(err)))
                } else if (args[0] === 'close') {
                    await Aurora.groupSettingUpdate(m.chat, 'locked').then((res) => enviar(`✅ Informações de edição do grupo fechado com sucesso`)).catch((err) => enviar(json(err)))
                } else {
                    enviar(`Mode ${command}\n\n\nType ${prefix + command}on/off`)
                }
                break

/*                
            case 'compraprem':
            case 'buyprem':
            case 'premium': {
                let teks = `Ola ${pushname}👋\nQuer comprar Premium? Basta conversar com o proprietário😉`
                await Aurora.sendMessage(m.chat, {
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
            case 'execucao':
            case 'execução':
                let runtimetext = `▶️ AuroraBOT está em execução há: ${runtime(process.uptime())}`
                Aurora.sendMessage(from, {text : runtimetext, mentions: [sender]}, { quoted: m})
                break
            
case 'dono': {
const repf = await Aurora.sendMessage(from, { 
contacts: { 
displayName: `${list.length} Contato`, 
contacts: list }, mentions: [sender] }, { quoted: m })
Aurora.sendMessage(from, { text : `Olá @${sender.split("@")[0]}, aqui está meu dono:`, mentions: [sender]}, { quoted: repf })
}
break

            case 'sticker':
            case 's': {
                if (!quoted) return enviar(`❗️ Responder ao vídeo/imagem com legenda ${prefix + command}`)
                if (/image/.test(mime)) {
                    let media = await quoted.download()
                    let encmedia = await Aurora.sendImageAsSticker(m.chat, media, m, {
                        packname: packname,
                        author: author
                    })
                    await fs.unlinkSync(encmedia)
                } else if (isVideo || /video/.test(mime)) {
                    if ((quoted.msg || quoted).seconds > 30) return enviar('❌ Máximo 30 segundos!')
                    let media = await quoted.download()
                    let encmedia = await Aurora.sendVideoAsSticker(m.chat, media, m, {
                        packname: packname,
                        author: pushname
                    })
                    await fs.unlinkSync(encmedia)
                } else {
                    return enviar(`❗️ Envie imagens/vídeos com legendas ${prefix + command}\n Duração do vídeo de 1 a 30 segundos!`)
                }
            }
            break

            case 'meme': {
                let respond = `❗️ Enviar/Responder imagem/adesivo com legenda ${prefix + command} texto1/texto2`
                if (!/image/.test(mime)) return enviar(respond)
                if (!text) return enviar(respond)
                enviar(mess.wait)
                atas = text.split('/')[1] ? text.split('/')[1] : '-'
                bawah = text.split('/')[0] ? text.split('/')[0] : '-'
                let dwnld = await Aurora.downloadAndSaveMediaMessage(qmsg)
                let fatGans = await TelegraPh(dwnld)
                let smeme = `https://api.memegen.link/images/custom/${encodeURIComponent(bawah)}/${encodeURIComponent(atas)}.png?background=${fatGans}`
                let pop = await Aurora.sendImageAsSticker(m.chat, smeme, m, {
                    packname: packname,
                    author: author
                })
                fs.unlinkSync(pop)
            }
            break

case 'roubar': {
if (!args.join(" ")) return enviar(`❗️ Por favor insira o texto!`)
const swn = args.join(" ")
const pcknm = swn.split("/")[0]
const atnm = swn.split("/")[1]
if (m.quoted.isAnimated === true) {
Aurora.downloadAndSaveMediaMessage(quoted, "gifee")
Aurora.sendMessage(from, {sticker:fs.readFileSync("gifee.webp")},{quoted:m})
} else if (/image/.test(mime)) {
let media = await quoted.download()
let encmedia = await Aurora.sendImageAsSticker(m.chat, media, m, { packname: pcknm, author: atnm })
} else if (/video/.test(mime)) {
if ((quoted.msg || quoted).seconds > 30) return enviar('❌ Máximo 30 segundos!')
let media = await quoted.download()
let encmedia = await Aurora.sendVideoAsSticker(m.chat, media, m, { packname: pcknm, author: atnm })
} else {
enviar(`❓ Certifique-se que seja uma foto ou vídeo!`)
}
}
break

            case 'toimage':
            case 'toimg': {
                if (!/webp/.test(mime)) return enviar(`❗️ Adesivo de resposta com legenda *${prefix + command}*`)
                enviar(mess.wait)
                let media = await Aurora.downloadAndSaveMediaMessage(qmsg)
                let ran = await getRandom('.png')
                exec(`ffmpeg -i ${media} ${ran}`, (err) => {
                    fs.unlinkSync(media)
                    if (err) return err
                    let buffer = fs.readFileSync(ran)
                    Aurora.sendMessage(m.chat, {
                        image: buffer
                    }, {
                        quoted: m
                    })
                    fs.unlinkSync(ran)
                })

            }
            break

            case 'tomp4':
            case 'tovideo': {
                if (!/webp/.test(mime)) return enviar(`❗️ Adesivo de resposta com legenda *${prefix + command}*`)
                enviar(mess.wait)
                let media = await Aurora.downloadAndSaveMediaMessage(qmsg)
                let webpToMp4 = await webp2mp4File(media)
                await Aurora.sendMessage(m.chat, {
                    video: {
                        url: webpToMp4.result,
                        caption: 'Converter Webp para vídeo'
                    }
                }, {
                    quoted: m
                })
                await fs.unlinkSync(media)

            }
            break

            case 'toaudio': {
                if (!/video/.test(mime) && !/audio/.test(mime)) return enviar(`❗️ Enviar/Responder Vídeo/Áudio que você deseja transformar em áudio com legenda ${prefix + command}`)
                enviar(mess.wait)
                let media = await Aurora.downloadMediaMessage(qmsg)
                let audio = await toAudio(media, 'mp4')
                Aurora.sendMessage(m.chat, {
                    audio: audio,
                    mimetype: 'audio/mpeg'
                }, {
                    quoted: m
                })

            }
            break
            case 'tomp3': {
                if (!/video/.test(mime) && !/audio/.test(mime)) return enviar(`❗️ Enviar/Responder Vídeo/Áudio que você deseja transformar em MP3 com legenda ${prefix + command}`)
                enviar(mess.wait)
                let media = await Aurora.downloadMediaMessage(qmsg)
                let audio = await toAudio(media, 'mp4')
                Aurora.sendMessage(m.chat, {
                    document: audio,
                    mimetype: 'audio/mp3',
                    fileName: `dgxeon.mp3`
                }, {
                    quoted: m
                })

            }
            break

            case 'tovn':
            case 'toptt': {
                if (!/video/.test(mime) && !/audio/.test(mime)) return enviar(`❗️ Responder vídeo/áudio que você deseja transformar em VN com legenda ${prefix + command}`)
                enviar(mess.wait)
                let media = await Aurora.downloadMediaMessage(qmsg)
                let {
                    toPTT
                } = require('./lib/converter')
                let audio = await toPTT(media, 'mp4')
                Aurora.sendMessage(m.chat, {
                    audio: audio,
                    mimetype: 'audio/mpeg',
                    ptt: true
                }, {
                    quoted: m
                })

            }
            break

            case 'togif': {
                if (!/webp/.test(mime)) return enviar(`❗️ Adesivo de resposta com legenda *${prefix + command}*`)
                enviar(mess.wait)
                let media = await Aurora.downloadAndSaveMediaMessage(qmsg)
                let webpToMp4 = await webp2mp4File(media)
                await Aurora.sendMessage(m.chat, {
                    video: {
                        url: webpToMp4.result,
                        caption: 'Converter Webp para vídeo'
                    },
                    gifPlayback: true
                }, {
                    quoted: m
                })
                await fs.unlinkSync(media)

            }
            break

            case 'tourl': {
                enviar(mess.wait)
                let media = await Aurora.downloadAndSaveMediaMessage(qmsg)
                if (/image/.test(mime)) {
                    let anu = await TelegraPh(media)
                    enviar(util.format(anu))
                } else if (!/image/.test(mime)) {
                    let anu = await UploadFileUgu(media)
                    enviar(util.format(anu))
                }
                await fs.unlinkSync(media)

            }
            break

            case 'emojimix': {
                let [emoji1, emoji2] = text.split`+`
                if (!emoji1) return enviar(`❗️ Exemplo: ${prefix + command} 😅+🤔`)
                if (!emoji2) return enviar(`❗️ Exemplo: ${prefix + command} 😅+🤔`)
                enviar(mess.wait)
                let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
                for (let res of anu.results) {
                    let encmedia = await Aurora.sendImageAsSticker(m.chat, res.url, m, {
                        packname: global.packname,
                        author: global.author,
                        categories: res.tags
                    })
                    await fs.unlinkSync(encmedia)
                }
            }
            break

            case 'toonce':
            case 'visuunica': {
                if (!quoted) return enviar(`❌ Por favor responder vídeo ou imagem!`)
                if (/image/.test(mime)) {
                    anuan = await Aurora.downloadAndSaveMediaMessage(quoted)
                    Aurora.sendMessage(m.chat, {
                        image: {
                            url: anuan
                        },
                        caption: `✅ Realizado com sucesso!`,
                        fileLength: "999",
                        viewOnce: true
                    }, {
                        quoted: m
                    })
                } else if (/video/.test(mime)) {
                    anuanuan = await Aurora.downloadAndSaveMediaMessage(quoted)
                    Aurora.sendMessage(m.chat, {
                        video: {
                            url: anuanuan
                        },
                        caption: `✅ Realizado com sucesso!`,
                        fileLength: "99999999",
                        viewOnce: true
                    }, {
                        quoted: m
                    })
                }
            }
            break

            case 'qr':
                case 'qrcode': {
                if (!q) return enviar('❗️ Por favor inclua link ou texto!')
                const QrCode = require('qrcode-reader')
                const qrcode = require('qrcode')
                let qyuer = await qrcode.toDataURL(q, {
                    scale: 35
                })
                let data = new Buffer.from(qyuer.replace('data:image/png;base64,', ''), 'base64')
                let buff = getRandom('.jpg')
                await fs.writeFileSync('./' + buff, data)
                let medi = fs.readFileSync('./' + buff)
                await Aurora.sendMessage(from, {
                    image: medi,
                    caption: "✅ Realizado com sucesso!"
                }, {
                    quoted: m
                })
                setTimeout(() => {
                    fs.unlinkSync(buff)
                }, 10000)
            }
            break

/*
            case 'adddono':
                if (!isCreator) return enviar(mess.dono)
if (!args[0]) return enviar(`Use ${prefix+command} numero\nExemplo ${prefix+command} ${ownernumber}`)
bnnd = q.split("|")[0].replace(/[^0-9]/g, '')
let ceknye = await Aurora.onWhatsApp(bnnd)
if (ceknye.length == 0) return enviar(`Insira um número válido e registrado no WhatsApp!!!`)
dono.push(bnnd)
fs.writeFileSync('./database/dono.json', JSON.stringify(dono))
enviar(`O número ${bnnd} tornou-se proprietário!!!`)
break

case 'deldono':
                if (!isCreator) return enviar(mess.dono)
if (!args[0]) return enviar(`Use ${prefix+command} numero\nExemplo ${prefix+command} 5511941212232`)
ya = q.split("|")[0].replace(/[^0-9]/g, '')
unp = dono.indexOf(ya)
dono.splice(unp, 1)
fs.writeFileSync('./database/dono.json', JSON.stringify(dono))
enviar(`O número ${ya} foi excluído da lista de proprietários pelo proprietário!!!`)
break

            
case 'video': // By Flávio
  if (!q) return enviar(`${prefix + command} link ou nome`);

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
    enviar(`Ola *${pushname}* aguarde Um Momento`);
    return reply('Erro ao obter o vídeo.');
  }

  const ytp = await youtubedl(vvs).catch(async (_) => await youtubedlv2(vvs));
  const dlt_url = await ytp.video[qla].download();
  const tssl = await ytp.title;
  const sizeas = await ytp.video[qla].fileSizeH;

  await Aurora.sendMessage(m.chat, {
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
if (!q) return enviar(`${prefix + command} link ou nome`);

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
  
  enviar(`Ola *${pushname}* aguarde Um Momento`);
  
const ytai = await youtubedl(vi).catch(async _ => await youtubedlv2(vi))
const dlh_url = await ytai.audio[qw].download()
const tyl = await ytai.title
const sizre = await ytai.audio[qw].fileSizeH
await Aurora.sendMessage(m.chat, { audio: { url: dlh_url }, mimetype: 'audio/mpeg', contextInfo: {
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
  if (!q) return enviar(`${prefix + command} link ou nome`);

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
    enviar(`Ola *${pushname}* aguarde Um Momento`);
    return reply('Erro ao obter o vídeo.');
  }

  const ytt = await youtubedl(vs).catch(async (_) => await youtubedlv2(vs));
  const dls_url = await ytt.video[qq].download();
  const tsl = await ytt.title;
  const sizes = await ytt.video[qq].fileSizeH;

  await Aurora.sendMessage(m.chat, {
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
  if (!q) return enviar(`${prefix + command} link ou nome`);
  
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
  
  enviar(`Ola *${pushname}* aguarde Um Momento`);
  const yt = await youtubedl(v).catch(async (_) => await youtubedlv2(v));
  const dl_url = await yt.audio[qc].download();
  const tl = await yt.title;
  const size = await yt.audio[qc].fileSizeH;
  const cap = `╭━❰  *DAKI* ❱━⬣\n┃📥 YOUTUBE DL 📥\n┃ও *📌TÍTULO* \n┃» ${tl}\n┃﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘\n┃ও *⚖️PESO*\n┃» ${size}\n╰━❰ *DAKI* ❱━⬣`.trim();
  
  await Aurora.sendMessage(m.chat, {
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
    if(!q) return enviar(`${prefix+command} link ou nome`);
    const musica = require('./lib/ytdl3')
    let yts = require("youtube-yts")
    enviar(`Ola *${pushname}* aguarde Um Momento`);
    let pesquisa = await yts(q)
    let resultado = pesquisa.videos[0]
    const pedido = await musica.mp3(resultado.url)
    await Aurora.sendMessage(m.chat, {
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
    if (!q) return enviar(`${prefix + command} Digite o termo de pesquisa`);
    const yts = require('youtube-yts');
    const video = require('./lib/ytdl2');
    enviar(`Ola *${pushname}* aguarde Um Momento`);
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
    await Aurora.sendMessage(m.chat, {
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
if(!q) return enviar(`${prefix+command} link Do Video`);
    enviar(`Ola *${pushname}* aguarde Um Momento`);
const pesquisa = await video.mp4(q)
const resultados = `
*📌Titulo:* ${pesquisa.title}
*📆Data:* ${pesquisa.date}
*⏳Duração:* ${pesquisa.duration}
*🎞️Qualidade:* ${pesquisa.quality}`
await Aurora.sendMessage(m.chat, {
    video: { url: pesquisa.videoUrl },
    caption: resultados
},{ quoted: m })
}
break
*/

      case 'qc': {
                const {
                    quote
                } = require('./lib/quote.js')
                if (!q) return enviar('❗️ Por gentileza, insira um texto!')
                enviar(`✅ *${pushname}* aguarde um momento enquanto eu processo as informações!`);
                let ppnyauser = await await Aurora.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/6880771a42bad09dd6087.jpg')
                const rest = await quote(q, pushname, ppnyauser)
                enviar(mess.wait)
                Aurora.sendImageAsSticker(m.chat, rest.result, m, {
                    packname: `AuroraBOT 🤖`,
                    author: `Sticker feito por: ${pushname}`
                })
            }
            break

case 'twitter': {
if (!q) return enviar(`❗️ Exemplo: ${prefix + command} link do vídeo`)
enviar(mess.wait)
    async function gtwitter(link) {
      try {
        return new Promise(async (resolve, reject) => {
        axios.post(`https://davapps.com/wp-json/aio-dl/video-data/`, {
          url: link
        }).then((res) => {
        let array = []
        if (res.status === 200) { igdl = res.data }
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
    await Aurora.sendMessage(from, {video: {url: res.Midias[2] ? res.Midias[2].link : res.Midias[1].link}, caption: `✅ Video baixado com sucesso!`}, {quoted: m})
    }
    break


case 'mensagem':
if (!isCreator) return enviar(mess.dono)
if (!text) return enviar(`❌ Cade o número e o texto?\nExemplo: ${prefix + command} numero/texto`)
enviar(mess.wait)
numero = text.split('/')[0] ? text.split('/')[0] : '-'
texto = text.split('/')[1] ? text.split('/')[1] : '-'
if(numero.includes("-")) return reply('❌ Precisa ser número junto sem "-"')
if(numero.includes("+")) return reply('❌ Precisa ser número junto sem "+", e não pode tá separado da /!')
Aurora.sendMessage(`${numero}@s.whatsapp.net`, {text: texto})
enviar(`✅ Mensagem enviada com sucesso!`)
break

case "pix":
  if (args.length == 0) return enviar(`❌ Por gentileza digite o valor!`)
  var pagament = new payment("APP_USR-9003413286845800-120115-c75f7b28d3d7cd3705de9516f8965231-311715545");
console.log("🛑  Processando pagamento..."); //+pagament
  try {
    let inf = await pagament.create_payment(args.join(" "))
console.log("🛑  Pagamento criado!") //+inf
await Aurora.sendMessage(from, {image: Buffer.from(inf.qr_code, "base64"), caption: `✅ QR-Code gerado com sucesso!`})
await Aurora.sendMessage(from, {text: '👇🏼 Aqui está o código copia e cola!'})
await Aurora.sendMessage(from, {text: inf.copy_paste})
    
    let check = await pagament.check_payment();

    while (check.status == 'pending') { check = await pagament.check_payment() }
    if (check.status == "approved") { return console.log("✅  Pagamento aprovado!") + enviar("✅ Pagamento aprovado!") + Aurora.sendMessage(`5511941212232@s.whatsapp.net`, {text: "✅ Novo pagamento aprovado, por gentileza cheque o Mercado pago!"})}
    return enviar("❌ Pagamento expirado.")
  } catch(e) { 
console.log(e)
return enviar(`❌ Valor inválido.`) }
  break

case 'tiktokaudio':{
    if (!q) return enviar(`❗️ Exemplo: ${prefix + command} link do vídeo cade?`)
    if (!q.includes('tiktok')) return enviar(`❌ O Link está inválido`)
    enviar(mess.wait)
    require('./lib/tiktok').Tiktok(q).then( data => {
    Aurora.sendMessage(from, { audio: { url: data.audio }, mimetype: 'audio/mp4' }, { quoted: m })
    })
    }
    break
    
    case 'tiktok':{ 
    if (!q) return enviar(`❗️ Exemplo: ${prefix + command} link do vídeo`)
    if (!q.includes('tiktok')) return enviar(`❌ O link esta inválido`)
    enviar(mess.wait)
    require('./lib/tiktok').Tiktok(q).then( data => {
    Aurora.sendMessage(from, { caption: `✅ Vídeo baixado com sucesso!`, video: { url: data.watermark }})
    })
    }
    break

  case 'insta':
  case 'instagram':
  case 'ig': {
    if (!q) return enviar(`❗️ Exemplo: ${prefix + command} link do vídeo/stories/postagem`)
    enviar(mess.wait)
    async function ginsta(link) {
      try {
        return new Promise(async (resolve, reject) => {
        axios.post(`https://reels.com.br/api/post`, {
          urlToScrap: link
        }).then((res) => {
        let array = []
        if (res.status === 200) { igdl = res.data }
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
        $('div:nth-child(1)').each(function(a, b, c, d) {
        link = $(b).find('a').attr('href')
        extensao = $(b).find('a').attr('data-mediatype')
        if (link != undefined && extensao != undefined) {
        array.push({link: link, extensao})
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
    await Aurora.sendMessage(from, {image: {url: a.link}, mimetype: "image/png", caption: `✅ Baixado com sucesso!`}, {quoted: m}).catch(e => {
    enviar("❌ Erro!")
    })
    } else {
    await sleep(500)
    await Aurora.sendMessage(from, {video: {url: a.link}, caption: `✅ Baixado com sucesso!`}, {quoted: m}).catch(e => {
    enviar("❌ Erro!")
    })
    }}
    } catch {
    try {
    const openig = await ginsta2(q)
    for (a=1; a<openig.Midias.length; a++) {
    if (openig.Midias[a].link.includes(".heic") || openig.Midias[a].link.includes(".webp") || openig.Midias[a].link.includes(".png") || openig.Midias[a].link.includes(".jpeg") || openig.Midias[a].link.includes(".jpg")) {
    await sleep(500)
    await Aurora.sendMessage(from, {image: {url: openig.Midias[a].link}, mimetype: "image/png", caption: `✅ Baixado com sucesso!`}, {quoted: m})
    .catch(e => { enviar("❌ Erro!") })
    } else {
    await sleep(500)
    await Aurora.sendMessage(from, {video: {url: openig.Midias[a].link}, mimetype: "video/mp4", caption: `✅ Baixado com sucesso!`}, {quoted: m})
    .catch(e => { enviar("❌ Erro!") })
    }}
    } catch (e) {
    console.log(e)
    }}
    }
    break


    
/*
case "ytmp3.1": case "ytaudio":
const xeonaudp3 = require('./lib/ytdl3')
if (args.length < 1 || !isUrl(text) || !xeonaudp3.isYTUrl(text)) return enviar(`Cadê o link do YouTube?\nExemplo: ${prefix + command} link`)
enviar(`Ola *${pushname}* aguarde Um Momento`);
const audio=await xeonaudp3.mp3(text)
await Aurora.sendMessage(m.chat,{
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
if (args.length < 1 || !isUrl(text) || !xeonvidoh.isYTUrl(text)) enviar(`Onde está o link??\n\nExemplo: ${prefix + command} link 128kbps`)
enviar(`Ola *${pushname}* aguarde Um Momento`);
const vid=await xeonvidoh.mp4(text)
const ytc=`
*Titulo:* ${vid.title}
*Data:* ${vid.date}
*Duração:* ${vid.duration}
*Qualidade:* ${vid.quality}`
await Aurora.sendMessage(m.chat,{
    video: {url:vid.videoUrl},
    caption: ytc
},{quoted: m })
}
break
*/

case 'menudono':              
let dakimenu2 = `👋 Olá, como vai ${pushname}?
Sou a Aurora, um BOT desenvolvido para auxiliar o seu uso no WhatsApp
*Segue abaixo meus comandos para dono!* 🙋‍♂️

✦ pegarsessao
✦ apagarsessao
✦ rr
✦ visu *[opção]*
✦ digitando *[opção]*
✦ gravandoaudio *[opção]*
✦ audiodigitando *[opção]*
✦ autobio *[option]*
✦ modo *[option]*
✦ block
✦ unblock 
✦ addfoto
✦ entrargp
✦ sairgp
`
if (typemenu === 'v1') {
                    Aurora.sendMessage(m.chat, {
                        image: fs.readFileSync('./Medias/thumb.jpg'),
                        caption: dakimenu2
                    }, {
                        quoted: m
                    })
                } else if (typemenu === 'v2') {
                    Aurora.sendMessage(m.chat, {
                        text: dakimenu2,
                        contextInfo: {
                            externalAdReply: {
                                showAdAttribution: true,
                                title: `Me chamo ${botname}`,
                                body: `Bot criado por ${ownername}`,
                                thumbnail: fs.readFileSync('./Medias/thumb.jpg'),
                                sourceUrl: global.link,
                                mediaType: 2,
                                renderLargerThumbnail: true
                            }
                        }
                    }, {
                        quoted: m
                    })
                } else if (typemenu === 'v3') {
                    Aurora.sendMessage(m.chat, {
                        thumbnail: fs.readFileSync('./Medias/thumb.jpg'),
                        caption: dakimenu2,
                        gifPlayback: false
                    }, {
                        quoted: m
                    })
                } else if (typemenu === 'v4') {
                    Aurora.relayMessage(m.chat, {
                        scheduledCallCreationMessage: {
                           callType: "AUDIO",
                           scheduledTimestampMs: 1200,
                           title: dakimenu2
                        }
                    }, {})
                }
                break

case 'menu':            
let menus = `👋 Olá, como vai ${pushname}?
Sou a Aurora, um BOT desenvolvido para auxiliar o seu uso no WhatsApp
*Segue abaixo meus comandos!* 🙋‍♂️

📡 Comandos principais!
✦ menu
✦ menudono
✦ dono
✦ execução

👨‍💻 Comandos para conversões!
✦ sticker 
✦ meme Texto/Texto
✦ roubar Texto/Texto
✦ qc
✦ toimage
✦ tovideo
✦ toaudio
✦ tomp3
✦ tovn
✦ togif
✦ tourl
✦ qr (texto)
✦ visuunica
✦ emojimix (emoji+emoji)

📲 Comandos para fazer download!
✦ tiktok (Link do vídeo) *(Sem suporte com vídeos com imagens)*
✦ instagram (Link do reels/stories/postagem)
✦ twitter (Link do vídeo) *(Sem suporte com tweets com imagem)*

👫 Comandos para grupo!
✦ fechargptempo
✦ abrigptempo
✦ kick
✦ add
✦ promote
✦ demote
✦ descgp
✦ fotogp
✦ marca
✦ hidetag
✦ totag
✦ grupo [opção]
✦ editinfo
✦ linkgp
✦ revoke
`
if (typemenu === 'v1') {
                    Aurora.sendMessage(m.chat, {
                        image: fs.readFileSync('./Medias/thumb.jpg'),
                        caption: menus
                    }, {
                        quoted: m
                    })
                } else if (typemenu === 'v2') {
                    Aurora.sendMessage(m.chat, {
                        text: menus,
                        contextInfo: {
                            externalAdReply: {
                                showAdAttribution: true,
                                title: `Me chamo ${botname}`,
                                body: `Bot criado por ${ownername}`,
                                thumbnail: fs.readFileSync('./Medias/thumb.jpg'),
                                sourceUrl: global.link,
                                mediaType: 1,
                                renderLargerThumbnail: true
                            }
                        }
                    }, {
                        quoted: m
                    })
                } else if (typemenu === 'v3') {
                    Aurora.sendMessage(m.chat, {
                        video: fs.readFileSync('./Medias/thumb2.mp4'),
                        caption: menus,
                        gifPlayback: true
                    }, {
                        quoted: m
                    })
                } else if (typemenu === 'v4') {
                    Aurora.relayMessage(m.chat, {
                        scheduledCallCreationMessage: {
                           callType: "AUDIO",
                           scheduledTimestampMs: 1200,
                           title: menus
                        }
                    }, {})
                }
                break
                break
            default:
                if (budy.startsWith('=>')) {
                    if (!isCreator) return enviar(mess.dono)

                    function Return(sul) {
                        sat = JSON.stringify(sul, null, 2)
                        bang = util.format(sat)
                        if (sat == undefined) {
                            bang = util.format(sul)
                        }
                        return enviar(bang)
                    }
                    try {
                        enviar(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
                    } catch (e) {
                        enviar(String(e))
                    }
                }

                if (budy.startsWith('>')) {
                    if (!isCreator) return enviar(mess.dono)
                    try {
                        let evaled = await eval(budy.slice(2))
                        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                        await enviar(evaled)
                    } catch (err) {
                        await enviar(String(err))
                    }
                }
                if (budy.startsWith('$')) {
                    if (!isCreator) return enviar(mess.dono)
                    exec(budy.slice(2), (err, stdout) => {
                        if (err) return enviar(err)
                        if (stdout) return enviar(stdout)
                    })
                }
        }
    } catch (err) {
        Aurora.sendText(ownernumber + '@s.whatsapp.net', util.format(err), m)
        console.log(util.format(err))
    }
}
let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`❗️ Atualização detectada em ${__filename}`))
    delete require.cache[file]
    require(file)
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
