// -------------------------------------
//
// Copyright (c) 2003 Skye WhatsApp Services Inc.
// All Rights Reserved
//
// This product is protected by copyright and distributed under
// licenses restricting copying, distribution, and decompilation.
//
// -------------------------------------

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
const ytdl = require('ytdl-core');
const { youtubedl, youtubedlv2 } = require('@bochilteam/scraper');
const { payment } = require("./lib/pix_mp/index.js")

// Database
let premium = JSON.parse(fs.readFileSync('./database/premium.json'))
let dono = JSON.parse(fs.readFileSync('./database/dono.json'))
let dono2 = JSON.parse(fs.readFileSync('./database/dono.json'))
let numdev = JSON.parse(fs.readFileSync('./database/numdev.json'))
let _afk = JSON.parse(fs.readFileSync('./database/afk-user.json'))
let hit = JSON.parse(fs.readFileSync('./database/total-hit-user.json'))

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
        var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectenviar.selectedRowId : (m.mtype == 'templateButtonenviarMessage') ? m.message.templateButtonenviarMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectenviar.selectedRowId || m.text) : ''
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
            Skye.sendMessage(m.chat,
                {
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
                },
                { quoted: m })
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
            console.log(chalk.bold.magenta(`\nPRIVADO`) + ' ' + chalk.whiteBright('(https://wa.me/' + m.sender.split("@")[0] + ')'))
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
                if (!SkyeCreator) return SkyeEnviar(SkyeMensagens.dono)
                if (args.length < 2)
                    return SkyeEnviar(`Use :\n*#addprem* @\n*#addprem* numero tempo\n\nExemplo: #addprem @flavio 30d`);
                if (m.mentionedJid.length !== 0) {
                    for (let i = 0; i < m.mentionedJid.length; i++) {
                        addPremiumUser(m.mentionedJid[0], args[1], premium);
                    }
                    SkyeEnviar("✅ Premium adicionado com sucesso!")
                } else {
                    addPremiumUser(args[0] + "@s.whatsapp.net", args[1], premium);
                    SkyeEnviar("✅ Sucesso")
                }
                break

            // Case para apagar membros premium da database
            case 'delprem':
            case 'delpremium':
                if (!SkyeCreator) return SkyeEnviar(SkyeMensagens.dono)
                if (args.length < 1) return SkyeEnviar(`Use :\n*#delprem* @\n*#delprem* numero`);
                if (m.mentionedJid.length !== 0) {
                    for (let i = 0; i < m.mentionedJid.length; i++) {
                        premium.splice(getPremiumPosition(m.mentionedJid[i], premium), 1);
                        fs.writeFileSync("./database/premium.json", JSON.stringify(premium));
                    }
                    SkyeEnviar("✅ Premium deletado com sucesso")
                } else {
                    premium.splice(getPremiumPosition(args[0] + "@s.whatsapp.net", premium), 1);
                    fs.writeFileSync("./database/premium.json", JSON.stringify(premium));
                    SkyeEnviar("✅ Sucesso")
                }
                break

            // Case para listar os membros premium existentes na database
            case 'listprem': {
                if (!SkyeCreator) return SkyeEnviar(SkyeMensagens.dono)
                let data = require("./database/premium.json")
                let txt = `*------「 LISTA PREMIUM 」------*\n\n`
                for (let i of data) {
                    txt += `Número : ${i.id}\n`
                    txt += `Expirado : ${i.expired} Segundo\n`
                }
                Skye.sendMessage(m.chat, {
                    text: txt,
                    mentions: i
                }, {
                    quoted: m
                })
            }
                break

            // Case para apagar a SkyeSession do banco de dados
            case 'apagarsessao':
            case 'delsession':
            case 'clearsession': {
                if (!SkyeCreator) return SkyeEnviar(SkyeMensagens.dono) // Somente dono pode executar este comando
                fs.readdir("./SkyeSession", async function (err, files) {
                    if (err) {
                        console.log('Não foi possível verificar o diretório: ' + err);
                        return SkyeEnviar('❗️ Não foi possível verificar o diretório: ' + err);
                    }
                    let filteredArray = await files.filter(item => item.startsWith("pre-key") ||
                        item.startsWith("sender-key") || item.startsWith("session-") || item.startsWith("app-state")
                    )
                    console.log(filteredArray.length);
                    let teks = `Arquivos indesejados ${filteredArray.length} detectados\n\n`
                    if (filteredArray.length == 0) return SkyeEnviar(teks)
                    filteredArray.map(function (e, i) {
                        teks += (i + 1) + `. ${e}\n`
                    })
                    SkyeEnviar(teks)
                    await sleep(2000)
                    SkyeEnviar("❗️ Exclua arquivos inúteis...")
                    await filteredArray.forEach(function (file) {
                        fs.unlinkSync(`./SkyeSession/${file}`)
                    });
                    await sleep(2000)
                    SkyeEnviar("⚠️ Excluiu com sucesso toda a lixeira da pasta da sessão")
                });
            }
                break

            // Case para enviar a SkyeSession para o usuário
            case 'pegarsessao':
            case 'pegarsessão':
                if (!SkyeCreator) return SkyeEnviar(SkyeMensagens.dono) // Somente ddono pode executar este comando
                SkyeEnviar('🕘 Aguarde um momento, recuperando seu arquivo de sessão')
                let sesi = await fs.readFileSync('./SkyeSession/creds.json')
                Skye.sendMessage(m.chat, {
                    document: sesi,
                    mimetype: 'application/json',
                    fileName: 'creds.json'
                }, {
                    quoted: m
                })
                break

            // Case para entrar em grupos utilizando links
            case 'entrargp':
            case 'join':
                try {
                    if (!SkyeCreator) return SkyeEnviar(SkyeMensagens.dono)
                    if (!text) return SkyeEnviar('❗️ Insira o link do grupo!')
                    if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return SkyeEnviar('❌ Link invalido!')
                    SkyeEnviar(SkyeMensagens.wait)
                    let result = args[0].split('https://chat.whatsapp.com/')[1]
                    await Skye.groupAcceptInvite(result).then((res) => SkyeEnviar(json(res))).catch((err) => SkyeEnviar(json(err)))
                } catch {
                    SkyeEnviar('❌ Falha ao entrar no grupo')
                }
                break

            // Case para desligar/reiniciar o BOT (Lembrando que depende do metódo que está sendo utilizado para inicialização do BOT, caso seja ".sh" o BOT irá reiniciar)
            case 'shutdown':
            case 'desligar':
            case 'rr':
                if (!SkyeCreator) return SkyeEnviar(SkyeMensagens.dono)
                SkyeEnviar(`🕘 Desligando...`)
                await sleep(3000)
                process.exit()
                break

            // Case para ativar/desativar a visualização automatica de mensagens do BOT
            case 'visu':
                if (!SkyeCreator) return SkyeEnviar(SkyeMensagens.dono)
                if (args.length < 1) return SkyeEnviar(`Exemplo ${prefix + command} on/off`)
                if (q === 'on') { // On =  Ativado
                    autoread = true
                    SkyeEnviar(`✅ Leitura automática alterada com sucesso para ${q}`)
                } else if (q === 'off') { // Off = Desativado
                    autoread = false
                    SkyeEnviar(`✅ Leitura automática alterada com sucesso para ${q}`)
                }
                break

            // Case para ativar/desativar o status de *digitando* após comandos executados
            case 'digitando':
                if (!SkyeCreator) return SkyeEnviar(SkyeMensagens.dono)
                if (args.length < 1) return SkyeEnviar(`Exemplo ${prefix + command} on/off`)
                if (q === 'on') { // On = Ativado
                    autoTyping = true
                    SkyeEnviar(`✅ Alterada com sucesso a digitação automática para ${q}`)
                } else if (q === 'off') { // Off = Desativado
                    autoTyping = false
                    SkyeEnviar(`✅ A digitação automática foi alterada com sucesso para ${q}`)
                }
                break

            // Case para ativar/desativar o status de *gravando* após comandos executados
            case 'gravandoaudio':
                if (!SkyeCreator) return SkyeEnviar(SkyeMensagens.dono)
                if (args.length < 1) return SkyeEnviar(`Exemplo ${prefix + command} on/off`)
                if (q === 'on') { // On = Ativado
                    autoRecording = true
                    SkyeEnviar(`✅ Gravação automática alterada com sucesso para ${q}`)
                } else if (q === 'off') { // Off = Desativado
                    autoRecording = false
                    SkyeEnviar(`✅ Gravação automática alterada com sucesso para ${q}`)
                }
                break

            // Case para ativar/desativar o status de *gravação/digitando* após comandos executados
            case 'audiodigitando':
                if (!SkyeCreator) return SkyeEnviar(SkyeMensagens.dono)
                if (args.length < 1) return SkyeEnviar(`Exemplo ${prefix + command} on/off`)
                if (q === 'on') { // On = Ativado
                    autorecordtype = true
                    SkyeEnviar(`✅Gravação e digitação automáticas alteradas com sucesso para ${q}`)
                } else if (q === 'off') { // Off = Desativado
                    autorecordtype = false
                    SkyeEnviar(`✅ Gravação e digitação automáticas alteradas com sucesso para ${q}`)
                }
                break

            // Case para ativar/desativar a visualização de status dos usuários
            case 'visustatus':
            case 'visualizarstatus':
                if (!SkyeCreator) return SkyeEnviar(SkyeMensagens.dono)
                if (args.length < 1) return SkyeEnviar(`Exemplo ${prefix + command} on/off`)
                if (q === 'on') { // On = Ativado
                    autoread_status = true
                    SkyeEnviar(`✅ Status automático/visualização de história alterado com sucesso para ${q}`)
                } else if (q === 'off') { // Off = Desativado
                    autoread_status = false
                    SkyeEnviar(`✅Status automático/visualização de história alterado com sucesso para ${q}`)
                }
                break

            // Case para ativar/desativar o autobio
            case 'autobio':
                if (!SkyeCreator) return SkyeEnviar(SkyeMensagens.dono)
                if (args.length < 1) return SkyeEnviar(`Exemplo ${prefix + command} on/off`)
                if (q == 'on') { // On = Ativado
                    autobio = true
                    SkyeEnviar(`✅ AutoBio alterado com sucesso para ${q}`)
                } else if (q == 'off') { // Off = Desativado
                    autobio = false
                    SkyeEnviar(`✅ AutoBio alterado com sucesso para ${q}`)
                }
                break

            // Case para definir public/self o BOT
            case 'modo':
                if (!SkyeCreator) return SkyeEnviar(SkyeMensagens.dono)
                if (args.length < 1) return SkyeEnviar(`Exemplo ${prefix + command} public/self`)
                if (q == 'public') { // Publico
                    Skye.public = true
                    SkyeEnviar(SkyeMensagens.done)
                } else if (q == 'self') { // Self
                    Skye.public = false
                    SkyeEnviar(SkyeMensagens.done)
                }
                break

            // Case para alterar o *packname* e *author* das figurinhas fornecidas pelo BOT
            case 'setexif':
                if (!SkyeCreator) return SkyeEnviar(SkyeMensagens.dono)
                if (!text) return SkyeEnviar(`Exemplo: ${prefix + command} packname/author`)
                global.packname = text.split("/")[0] // Packname (Primeiro texto)
                global.author = text.split("/")[1] // Author (Segundo texto)
                SkyeEnviar(`✅ Exif alterado com sucesso para\n\n• Nome do pacote: ${global.packname}\n• Autor: ${global.author}`)
                break

            // Case para definir a foto do BOT        
            case 'addfoto':
                if (!SkyeCreator) return SkyeEnviar(SkyeMensagens.dono)
                if (!quoted) return SkyeEnviar(`🛑 Enviar/Responder Imagem com Legenda ${prefix + command}`)
                if (!/image/.test(mime)) return SkyeEnviar(`🛑 Enviar/Responder Imagem com Legenda ${prefix + command}`)
                if (/webp/.test(mime)) return SkyeEnviar(`🛑 Enviar/Responder Imagem com Legenda ${prefix + command}`)
                var medis = await Skye.downloadAndSaveMediaMessage(quoted, 'ppbot.jpeg')
                if (args[0] == 'full') {
                    var {
                        img
                    } = await generateProfilePicture(medis)
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
                    })
                    fs.unlinkSync(medis)
                    SkyeEnviar(SkyeMensagens.done)
                } else {
                    var memeg = await Skye.updateProfilePicture(botNumber, {
                        url: medis
                    })
                    fs.unlinkSync(medis)
                    SkyeEnviar(SkyeMensagens.done)
                }
                break

            // Case para bloquear usuários
            case 'block':
                if (!SkyeCreator) return SkyeEnviar(SkyeMensagens.dono)
                let blockw = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                await Skye.updateBlockStatus(blockw, 'block').then((res) => SkyeEnviar(json(res))).catch((err) => SkyeEnviar(json(err)))
                SkyeEnviar('✅ Bloqueado com sucesso!')
                break

            // Case para desbloquear usuários
            case 'unblock':
                if (!SkyeCreator) return SkyeEnviar(SkyeMensagens.dono)
                let blockww = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                await Skye.updateBlockStatus(blockww, 'unblock').then((res) => SkyeEnviar(json(res))).catch((err) => SkyeEnviar(json(err)))
                SkyeEnviar('✅ Desbloqueado com sucesso!')
                break

            // Case para sair de grupos
            case 'leave':
            case 'sairgp':
                if (!SkyeCreator) return SkyeEnviar(SkyeMensagens.dono)
                if (!m.isGroup) return SkyeEnviar(SkyeMensagens.group)
                SkyeEnviar('✅ Saindo do grupo...')
                await Skye.groupLeave(m.chat)
                break

            // Case para deletar mensagens do BOT (Preferencialmente utilizado em grupos)
            case 'delete':
            case 'del': {
                if (!SkyeCreator) return SkyeEnviar(SkyeMensagens.done)
                if (!m.quoted) throw false
                let {
                    chat,
                    fromMe,
                    id,
                    isBaileys
                } = m.quoted
                if (!isBaileys) return SkyeEnviar('❗️ Esta mensagem não foi enviada por mim!')
                Skye.sendMessage(m.chat, {
                    delete: {
                        remoteJid: m.chat,
                        fromMe: false,
                        id: m.quoted.id,
                        participant: m.quoted.sender
                    }
                })
            }
                break

            // Case para expulsar algum membro do grupo
            case 'kick':
                if (!m.isGroup) return SkyeEnviar(SkyeMensagens.group)
                if (!isAdmins && !isGroupOwner && !SkyeCreator) return SkyeEnviar(SkyeMensagens.admin)
                if (!isBotAdmins) return SkyeEnviar(SkyeMensagens.botAdmin)
                let blockwww = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' // Mentioned ativo, então somente respondendo alguma mensagem do usuário no grupo irá executar o comando
                await Skye.groupParticipantsUpdate(m.chat, [blockwww], 'remove').then((res) => SkyeEnviar(json(res))).catch((err) => SkyeEnviar(json(err)))
                break

            // Case para adicionar algum número no grupo
            case 'add':
                if (!m.isGroup) return SkyeEnviar(SkyeMensagens.group)
                if (!isAdmins && !isGroupOwner && !SkyeCreator) return SkyeEnviar(SkyeMensagens.admin)
                if (!isBotAdmins) return SkyeEnviar(SkyeMensagens.botAdmin)
                let blockwwww = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' // Somente é adicionado fornecendo o número do usuário sem "+"
                await Skye.groupParticipantsUpdate(m.chat, [blockwwww], 'add').then((res) => SkyeEnviar(json(res))).catch((err) => SkyeEnviar(json(err)))
                break

            // Case para promover o usuário à admin do grupo
            case 'promote':
                if (!m.isGroup) return SkyeEnviar(SkyeMensagens.group)
                if (!isAdmins && !isGroupOwner && !SkyeCreator) return SkyeEnviar(SkyeMensagens.admin)
                if (!isBotAdmins) return SkyeEnviar(SkyeMensagens.botAdmin)
                let blockwwwww = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' // Mentioned ativo, então somente respondendo alguma mensagem do usuário no grupo irá executar o comando
                await Skye.groupParticipantsUpdate(m.chat, [blockwwwww], 'promote').then((res) => SkyeEnviar(json(res))).catch((err) => SkyeEnviar(json(err)))
                break

            // Case para remover o admin do usuário no grupo
            case 'demote':
                if (!m.isGroup) return SkyeEnviar(SkyeMensagens.group)
                if (!isAdmins && !isGroupOwner && !SkyeCreator) return SkyeEnviar(SkyeMensagens.admin)
                if (!isBotAdmins) return SkyeEnviar(SkyeMensagens.botAdmin)
                let blockwwwwwa = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' // Mentioned ativo, então somente respondendo alguma mensagem do usuário no grupo irá executar o comando
                await Skye.groupParticipantsUpdate(m.chat, [blockwwwwwa], 'demote').then((res) => SkyeEnviar(json(res))).catch((err) => SkyeEnviar(json(err)))
                break

            // Case para definir o nome do grupo
            case 'nomegp':
                if (!m.isGroup) return SkyeEnviar(SkyeMensagens.group)
                if (!isAdmins && !isGroupOwner && !SkyeCreator) return SkyeEnviar(SkyeMensagens.admin)
                if (!isBotAdmins) return SkyeEnviar(SkyeMensagens.botAdmin) // BOT precisa ser admin do grupo para realizar alterações
                if (!text) return '❗️ Por favor insira o texto!'
                await Skye.groupUpdateSubject(m.chat, text).then((res) => SkyeEnviar(SkyeMensagens.success)).catch((err) => SkyeEnviar(json(err)))
                break

            // Case para definir a descrição do grupo
            case 'descgp':
                if (!m.isGroup) return SkyeEnviar(SkyeMensagens.group)
                if (!isAdmins && !isGroupOwner && !SkyeCreator) return SkyeEnviar(SkyeMensagens.admin)
                if (!isBotAdmins) return SkyeEnviar(SkyeMensagens.botAdmin) // BOT precisa ser admin do grupo para realizar alterações
                if (!text) return '❗️ Por favor insira o texto!'
                await Skye.groupUpdateDescription(m.chat, text).then((res) => SkyeEnviar(SkyeMensagens.success)).catch((err) => SkyeEnviar(json(err)))
                break

            // Case para definir a foto do grupo
            case 'fotogp':
                if (!m.isGroup) return SkyeEnviar(SkyeMensagens.group)
                if (!isAdmins) return SkyeEnviar(SkyeMensagens.admin)
                if (!isBotAdmins) return SkyeEnviar(SkyeMensagens.botAdmin) // BOT precisa ser admin do grupo para realizar alterações
                if (!quoted) return SkyeEnviar(`🛑 Enviar/Responder Imagem com Legenda ${prefix + command}`)
                if (!/image/.test(mime)) return SkyeEnviar(`🛑 Enviar/Responder Imagem com Legenda ${prefix + command}`)
                if (/webp/.test(mime)) return SkyeEnviar(`🛑 Enviar/Responder Imagem com Legenda ${prefix + command}`)
                var medis = await Skye.downloadAndSaveMediaMessage(quoted, 'ppbot.jpeg')
                if (args[0] == 'full') {
                    var {
                        img
                    } = await generateProfilePicture(medis)
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
                    })
                    fs.unlinkSync(medis)
                    SkyeEnviar(SkyeMensagens.done)
                } else {
                    var memeg = await Skye.updateProfilePicture(m.chat, {
                        url: medis
                    })
                    fs.unlinkSync(medis)
                    SkyeEnviar(SkyeMensagens.done)
                }
                break

            // Case para marcar todos os membros do grupo porém sem mostrar
            case 'hidetag':
                if (!m.isGroup) return SkyeEnviar(SkyeMensagens.group)
                if (!isAdmins && !isGroupOwner && !SkyeCreator) return SkyeEnviar(SkyeMensagens.admin)
                if (!isBotAdmins) return SkyeEnviar(SkyeMensagens.botAdmin) // BOT precisa ser admin do grupo para realizar alterações
                Skye.sendMessage(m.chat, {
                    text: q ? q : '',
                    mentions: participants.map(a => a.id)
                }, {
                    quoted: m
                })
                break

            // Case para abrir/fechar o grupo
            case 'grupo':
                if (!m.isGroup) return SkyeEnviar(SkyeMensagens.group)
                if (!isAdmins && !isGroupOwner && !SkyeCreator) return SkyeEnviar(SkyeMensagens.admin)
                if (!isBotAdmins) return SkyeEnviar(SkyeMensagens.botAdmin)
                if (args[0] === 'close') { // Close = Grupo fechado
                    await Skye.groupSettingUpdate(m.chat, 'announcement').then((res) => SkyeEnviar(`✅ Grupo fechado com sucesso!`)).catch((err) => SkyeEnviar(json(err)))
                } else if (args[0] === 'open') { // Open = Grupo aberto
                    await Skye.groupSettingUpdate(m.chat, 'not_announcement').then((res) => SkyeEnviar(`✅ Grupo aberto com sucesso!`)).catch((err) => SkyeEnviar(json(err)))
                } else {
                    SkyeEnviar(`❗️ Modo ${command}\n\n\nTipo ${prefix + command}open/close`)
                }
                break

            // Case para editar as informações de edição do grupo
            case 'editinfo':
                if (!m.isGroup) return SkyeEnviar(SkyeMensagens.group)
                if (!isAdmins && !isGroupOwner && !SkyeCreator) return SkyeEnviar(SkyeMensagens.admin)
                if (!isBotAdmins) return SkyeEnviar(SkyeMensagens.botAdmin)
                if (args[0] === 'on') { // On = Pode editar as informações do grupo
                    await Skye.groupSettingUpdate(m.chat, 'unlocked').then((res) => SkyeEnviar(`✅ Informações de edição do grupo aberto com sucesso`)).catch((err) => SkyeEnviar(json(err)))
                } else if (args[0] === 'off') { // Off = Não pode editar as informações do grupo
                    await Skye.groupSettingUpdate(m.chat, 'locked').then((res) => SkyeEnviar(`✅ Informações de edição do grupo fechado com sucesso`)).catch((err) => SkyeEnviar(json(err)))
                } else {
                    SkyeEnviar(`Mode ${command}\n\n\nType ${prefix + command}on/off`)
                }
                break

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
            case 'online':
                let runtimetext = `🧹 A bruxinha Skye BOT está em execução há: ${runtime(process.uptime())}`
                Skye.sendMessage(from, { text: runtimetext, mentions: [sender] }, { quoted: m })
                break

            // Case para enviar os contatos dos donos do BOT para suporte
            case 'suporte': {
                await Skye.sendMessage(from, { text: `Precisando de ajuda, @${sender.split("@")[0]}?\nFale com meus desenvolvedores.`, mentions: [sender] })

                const repf = await Skye.sendMessage(from, {
                    contacts: {
                        displayName: `${list.length} Contato`,
                        contacts: list
                    }, mentions: [sender]
                })
            }
                break

            // Case para fazer figurinhas
            case 'sticker':
            case 'figurinha':
            case 'f':
            case 's': {
                if (!quoted) return SkyeEnviar(`Ei, preciso que responda marcando um vídeo ou imagem.`)
                if (/image/.test(mime)) {
                    let media = await quoted.download()
                    let encmedia = await Skye.sendImageAsSticker(m.chat, media, m, {
                        packname: packname,
                        author: author
                    })
                    await fs.unlinkSync(encmedia)
                } else if (isVideo || /video/.test(mime)) {
                    if ((quoted.msg || quoted).seconds > 30) return SkyeEnviar('Psiu! No vídeo de no máximo 30 segundos, hein?')
                    let media = await quoted.download()
                    let encmedia = await Skye.sendVideoAsSticker(m.chat, media, m, {
                        packname: packname,
                        author: pushname
                    })
                    await fs.unlinkSync(encmedia)
                } else {
                    return SkyeEnviar(`Envie imagem ou vídeo para transformar em figurinhas!\nDuração do vídeo de 1 a 30 segundos viu?`)
                }
            }
                break

            // Case para fazer figurinhas com legendas com dois textos
            case 'meme': {
                let respond = `❗️ Enviar/Responder imagem/adesivo com legenda ${prefix + command} texto1/texto2`
                if (!/image/.test(mime)) return SkyeEnviar(respond)
                if (!text) return SkyeEnviar(respond)
                SkyeEnviar(SkyeMensagens.wait)
                atas = text.split('/')[1] ? text.split('/')[1] : '-'
                bawah = text.split('/')[0] ? text.split('/')[0] : '-'
                let dwnld = await Skye.downloadAndSaveMediaMessage(qmsg)
                let fatGans = await TelegraPh(dwnld)
                let smeme = `https://api.memegen.link/images/custom/${encodeURIComponent(bawah)}/${encodeURIComponent(atas)}.png?background=${fatGans}`
                let pop = await Skye.sendImageAsSticker(m.chat, smeme, m, { // Aqui o BOT vai enviar a imagem como sticker
                    packname: packname,
                    author: author
                })
                fs.unlinkSync(pop)
            }
                break

            // Case para definir o *packname* e o *author* da figurinha para o solicitado do usuário
            case 'roubar': {
                if (!args.join(" ")) return SkyeEnviar(`❗️ Por favor insira o texto!`)
                const swn = args.join(" ")
                const pcknm = swn.split("/")[0]
                const atnm = swn.split("/")[1]
                if (m.quoted.isAnimated === true) {
                    Skye.downloadAndSaveMediaMessage(quoted, "gifee")
                    Skye.sendMessage(from, { sticker: fs.readFileSync("gifee.webp") }, { quoted: m })
                } else if (/image/.test(mime)) {
                    let media = await quoted.download()
                    let encmedia = await Skye.sendImageAsSticker(m.chat, media, m, { packname: pcknm, author: atnm })
                } else if (/video/.test(mime)) {
                    if ((quoted.msg || quoted).seconds > 30) return SkyeEnviar('❌ Máximo 30 segundos!')
                    let media = await quoted.download()
                    let encmedia = await Skye.sendVideoAsSticker(m.chat, media, m, { packname: pcknm, author: atnm })
                } else {
                    SkyeEnviar(`❓ Certifique-se que seja uma foto ou vídeo!`)
                }
            }
                break

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Conversores

            // Conversor de figurinha para imagem 
            case 'toimage':
            case 'toimg': {
                if (!/webp/.test(mime)) return SkyeEnviar(`❗️ Adesivo de resposta com legenda *${prefix + command}*`)
                SkyeEnviar(SkyeMensagens.wait)
                let media = await Skye.downloadAndSaveMediaMessage(qmsg)
                let ran = await getRandom('.png')
                exec(`ffmpeg -i ${media} ${ran}`, (err) => {
                    fs.unlinkSync(media)
                    if (err) return err
                    let buffer = fs.readFileSync(ran)
                    Skye.sendMessage(m.chat, {
                        image: buffer
                    }, {
                        quoted: m
                    })
                    fs.unlinkSync(ran)
                })

            }
                break

            // Conversor de figurinha animada para imagem
            case 'tomp4':
            case 'tovideo': {
                if (!/webp/.test(mime)) return SkyeEnviar(`❗️ Adesivo de resposta com legenda *${prefix + command}*`)
                SkyeEnviar(SkyeMensagens.wait)
                let media = await Skye.downloadAndSaveMediaMessage(qmsg)
                let webpToMp4 = await webp2mp4File(media)
                await Skye.sendMessage(m.chat, {
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

            // Conversor de video para imagem
            case 'toaudio': {
                if (!/video/.test(mime) && !/audio/.test(mime)) return SkyeEnviar(`❗️ Enviar/Responder Vídeo/Áudio que você deseja transformar em áudio com legenda ${prefix + command}`)
                SkyeEnviar(SkyeMensagens.wait)
                let media = await Skye.downloadMediaMessage(qmsg)
                let audio = await toAudio(media, 'mp4')
                Skye.sendMessage(m.chat, {
                    audio: audio,
                    mimetype: 'audio/mpeg'
                }, {
                    quoted: m
                })

            }
                break

            // Conversor de video para formato MP3
            case 'tomp3': {
                if (!/video/.test(mime) && !/audio/.test(mime)) return SkyeEnviar(`❗️ Enviar/Responder Vídeo/Áudio que você deseja transformar em MP3 com legenda ${prefix + command}`)
                SkyeEnviar(SkyeMensagens.wait)
                let media = await Skye.downloadMediaMessage(qmsg)
                let audio = await toAudio(media, 'mp4')
                Skye.sendMessage(m.chat, {
                    document: audio,
                    mimetype: 'audio/mp3',
                    fileName: `dgxeon.mp3`
                }, {
                    quoted: m
                })

            }
                break

            // Conversor de audio para ficar como se o BOT tivesse enviado
            case 'tovn': {
                if (!/video/.test(mime) && !/audio/.test(mime)) return SkyeEnviar(`❗️ Responder vídeo/áudio que você deseja transformar em VN com legenda ${prefix + command}`)
                SkyeEnviar(SkyeMensagens.wait)
                let media = await Skye.downloadMediaMessage(qmsg)
                let {
                    toPTT
                } = require('./lib/converter')
                let audio = await toPTT(media, 'mp4')
                Skye.sendMessage(m.chat, {
                    audio: audio,
                    mimetype: 'audio/mpeg',
                    ptt: true
                }, {
                    quoted: m
                })

            }
                break

            // Conversor de figurinha animada para GIF
            case 'togif': {
                if (!/webp/.test(mime)) return SkyeEnviar(`❗️ Adesivo de resposta com legenda *${prefix + command}*`)
                SkyeEnviar(SkyeMensagens.wait)
                let media = await Skye.downloadAndSaveMediaMessage(qmsg)
                let webpToMp4 = await webp2mp4File(media)
                await Skye.sendMessage(m.chat, {
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

            // Conversor de imagem para URL
            case 'tourl': {
                SkyeEnviar(SkyeMensagens.wait)
                let media = await Skye.downloadAndSaveMediaMessage(qmsg)
                if (/image/.test(mime)) {
                    let anu = await TelegraPh(media)
                    SkyeEnviar(util.format(anu))
                } else if (!/image/.test(mime)) {
                    let anu = await UploadFileUgu(media)
                    SkyeEnviar(util.format(anu))
                }
                await fs.unlinkSync(media)

            }
                break

            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

            // Case de junção de sticker 
            case 'emojimix': {
                let [emoji1, emoji2] = text.split`+`
                if (!emoji1) return SkyeEnviar(`❗️ Exemplo: ${prefix + command} 😅+🤔`)
                if (!emoji2) return SkyeEnviar(`❗️ Exemplo: ${prefix + command} 😅+🤔`)
                SkyeEnviar(SkyeMensagens.wait)
                let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
                for (let res of anu.results) {
                    let encmedia = await Skye.sendImageAsSticker(m.chat, res.url, m, {
                        packname: global.packname,
                        author: global.author,
                        categories: res.tags
                    })
                    await fs.unlinkSync(encmedia)
                }
            }
                break

            // Case para o BOT enviar midia com visualização unica
            case 'toonce':
            case 'visuunica': {
                if (!quoted) return SkyeEnviar(`❌ Por favor responder vídeo ou imagem!`)
                if (/image/.test(mime)) {
                    anuan = await Skye.downloadAndSaveMediaMessage(quoted)
                    Skye.sendMessage(m.chat, {
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
                    anuanuan = await Skye.downloadAndSaveMediaMessage(quoted)
                    Skye.sendMessage(m.chat, {
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

            // Case para gerar um QRCode com o texto solicitado pelo usuário
            case 'qr':
            case 'qrcode': {
                if (!q) return SkyeEnviar('❗️ Por favor inclua link ou texto!')
                const QrCode = require('qrcode-reader')
                const qrcode = require('qrcode')
                let qyuer = await qrcode.toDataURL(q, {
                    scale: 35
                })
                let data = new Buffer.from(qyuer.replace('data:image/png;base64,', ''), 'base64')
                let buff = getRandom('.jpg')
                await fs.writeFileSync('./' + buff, data)
                let medi = fs.readFileSync('./' + buff)
                await Skye.sendMessage(from, {
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


            case 'adddono':
                if (!SkyeCreator) return SkyeEnviar(SkyeMensagens.dono)
                if (!args[0]) return SkyeEnviar(`👉🏼 Utilize ${prefix + command} número\nExemplo ${prefix + command} ${ownernumber}`)
                bnnd = q.split("|")[0].replace(/[^0-9]/g, '')
                let ceknye = await Skye.onWhatsApp(bnnd)
                if (ceknye.length == 0) return SkyeEnviar(`🛑 Insira um número válido e registrado no WhatsApp!`)
                dono.push(bnnd)
                fs.writeFileSync('./database/dono.json', JSON.stringify(dono))
                SkyeEnviar(`✅ O número ${bnnd} tornou-se proprietário!`)
                break

            case 'deldono':
                if (!SkyeCreator) return SkyeEnviar(SkyeMensagens.dono)
                if (!args[0]) return SkyeEnviar(`👉🏼 Utilize ${prefix + command} número\nExemplo ${prefix + command} ${ownernumber}`)
                ya = q.split("|")[0].replace(/[^0-9]/g, '')
                unp = dono.indexOf(ya)
                dono.splice(unp, 1)
                fs.writeFileSync('./database/dono.json', JSON.stringify(dono))
                SkyeEnviar(`✅ O número ${ya} foi excluído da lista de proprietários!`)
                break

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

            // Case para fazer figurinhas QC
            case 'qc': {
                const {
                    quote
                } = require('./lib/quote.js')
                if (!q) return SkyeEnviar('❗️ Por gentileza, insira um texto!')
                SkyeEnviar(`✅ *${pushname}* aguarde um momento enquanto eu processo as informações!`);
                let ppnyauser = await await Skye.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/6880771a42bad09dd6087.jpg')
                const rest = await quote(q, pushname, ppnyauser)
                SkyeEnviar(SkyeMensagens.wait)
                Skye.sendImageAsSticker(m.chat, rest.result, m, {
                    packname: `SkyeBOT 🤖`,
                    author: `Sticker feito por: ${pushname}`
                })
            }
                break

            // Case para enviar mensagens para algum usuário utilizando o BOT
            case 'mensagem':
                if (!SkyeCreator) return SkyeEnviar(SkyeMensagens.owner) // Somente o dono tem permissão para este comando
                if (!text) return SkyeEnviar(`Nenhum número e/ou texto informados.\nExemplo: ${prefix + command} numero/texto`)
                try {
                    numero = text.split('/ ')[0] ? text.split('/')[0] : '-'
                    texto = text.split('/')[1] ? text.split('/')[1] : '-'
                    if (numero.includes("-")) return reply('O número precisa ser junto e não conter "-"')
                    if (numero.includes("+")) return reply('❌ Precisa ser número junto sem "+", e não pode tá separado da /!')
                    Skye.sendMessage(`${numero}@s.whatsapp.net`, { text: texto })
                    SkyeEnviar(`✅ Mensagem enviada com sucesso!`)
                } catch (e) {
                    SkyeEnviar("Um erro ocorreu. Contate um desenvolvedor para que verifique as logs do console.")
                    console.log(e)
                }
                break

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ PIX

            // Case PIX
            case 'pix':
                let txtapoie = `\n*E aí ${pushname}!* \nConsidere em apoiar meus desenvolvedores!\n\nA Skye é um projeto *sem fins lucrativos*. TODAS as doações são reinvestidas para aprimorar e criar novas funcionalidades. Qualquer apoio é valioso. Para doações simbólicas, envie um comprovante aos nossos desenvolvedores para acessar novas funcionalidades antecipadamente!\n\nBasta digitar "pix valor" (exemplo: pix 1)\n\nA confirmação de pagamento é automática, com QRCode e link gerados.\n\n*Obrigada!* 💜`

                if (args.length == 0) return Skye.sendMessage(m.chat, {
                    image: fs.readFileSync('./Medias/apoienos.png'),
                    caption: txtapoie
                }, {
                    quoted: m
                })

                var pagament = new payment("APP_USR-9003413286845800-120115-c75f7b28d3d7cd3705de9516f8965231-311715545");
                try {
                    let inf = await pagament.create_payment(args.join(" "))
                    console.log("🛑 Um novo pagamento foi gerado!") //+inf
                    await Skye.sendMessage(from, { image: Buffer.from(inf.qr_code, "base64"), caption: `✅ QRCode gerado com sucesso!` })
                    await Skye.sendMessage(from, { text: '👇🏼 Olha só, esse é o código copia e cola caso não consiga usar a imagem acima.' })
                    await Skye.sendMessage(from, { text: inf.copy_paste })

                    let check = await pagament.check_payment();

                    while (check.status == 'pending') { check = await pagament.check_payment() }
                    if (check.status == "approved") { return console.log("✅  Novo pagamento aprovado!") + SkyeEnviar("Oba! Seu pagamento foi aprovado e reconhecido.\n *Muuuito obrigada!* 💜") + Skye.sendMessage(`5511941212232@s.whatsapp.net`, { text: "✅ Novo pagamento aprovado verique o Mercado Pago!" }) + Skye.sendMessage(`5585991487204@s.whatsapp.net`, { text: "✅ Novo pagamento aprovado verique o Mercado Pago!" }) }
                    return SkyeEnviar("Eita! Parece que o tempo de pagamento expirou.")
                } catch (e) {
                    console.log(e)
                    return SkyeEnviar(`Ei! Acho que esse valor é inválido, hein?`)
                }
                break

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Scrappers de download

            // Scrapper TiktokAudio
            case 'tiktokaudio': {
                if (!q) return SkyeEnviar(`❗️ Exemplo: ${prefix + command} link do vídeo cade?`)
                if (!q.includes('tiktok')) return SkyeEnviar(`❌ O Link está inválido`)
                SkyeEnviar(SkyeMensagens.wait)
                require('./lib/tiktok').Tiktok(q).then(data => {
                    Skye.sendMessage(from, { audio: { url: data.audio }, mimetype: 'audio/mp4' }, { quoted: m })
                })
            }
                break

            // Scrapper TiktokVideo
            case 'tiktok': {
                if (!q) return SkyeEnviar(`❗️ Exemplo: ${prefix + command} link do vídeo`)
                if (!q.includes('tiktok')) return SkyeEnviar(`❌ O link esta inválido`)
                SkyeEnviar(SkyeMensagens.wait)
                require('./lib/tiktok').Tiktok(q).then(data => {
                    Skye.sendMessage(from, { caption: `✅ Vídeo baixado com sucesso!`, video: { url: data.watermark } })
                })
            }
                break

            // Scrapper Instagram (Reels, Stories, Postagens)
            case 'insta':
            case 'instagram':
            case 'ig': {
                if (!q) return SkyeEnviar(`❗️ Exemplo: ${prefix + command} link do vídeo/stories/postagem`)
                SkyeEnviar(SkyeMensagens.wait)
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
                                $('div:nth-child(1)').each(function (a, b, c, d) {
                                    link = $(b).find('a').attr('href')
                                    extensao = $(b).find('a').attr('data-mediatype')
                                    if (link != undefined && extensao != undefined) {
                                        array.push({ link: link, extensao })
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
                            await Skye.sendMessage(from, { image: { url: a.link }, mimetype: "image/png", caption: `✅ Baixado com sucesso!` }, { quoted: m }).catch(e => {
                                SkyeEnviar("❌ Erro!")
                            })
                        } else {
                            await sleep(500)
                            await Skye.sendMessage(from, { video: { url: a.link }, caption: `✅ Baixado com sucesso!` }, { quoted: m }).catch(e => {
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
                                await Skye.sendMessage(from, { image: { url: openig.Midias[a].link }, mimetype: "image/png", caption: `✅ Baixado com sucesso!` }, { quoted: m })
                                    .catch(e => { SkyeEnviar("❌ Erro!") })
                            } else {
                                await sleep(500)
                                await Skye.sendMessage(from, { video: { url: openig.Midias[a].link }, mimetype: "video/mp4", caption: `✅ Baixado com sucesso!` }, { quoted: m })
                                    .catch(e => { SkyeEnviar("❌ Erro!") })
                            }
                        }
                    } catch (e) {
                        console.log(e)
                    }
                }
            }
                break

            // Scrapper Twiiter
            case 'twitter': {
                if (!q) return SkyeEnviar(`❗️ Exemplo: ${prefix + command} link do vídeo`)
                SkyeEnviar(SkyeMensagens.wait)
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
                await Skye.sendMessage(from, { video: { url: res.Midias[2] ? res.Midias[2].link : res.Midias[1].link }, caption: `✅ Video baixado com sucesso!` }, { quoted: m })
            }
                break



            /*
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
            */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Menus

            // Case menu para donos
            case 'menudono':
                if (!SkyeCreator) return SkyeEnviar(SkyeMensagens.dono)
                let skyemenudono = `👋 Olá, como vai *${pushname}*?
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
• sairgp
`

                Skye.sendMessage(m.chat, {
                    image: fs.readFileSync('./Medias/thumb.jpg'),
                    caption: skyemenudono
                }, {
                    quoted: m
                })
                break

                // Case menu para grupos
                case 'menugrupos':
                case 'menugrupo':
                    if (!m.isGroup && !SkyeCreator && !isAdmins && !isGroupOwner) return SkyeEnviar(SkyeMensagens.group)
                    let skyemenu2 = `👋 Olá, como vai *${pushname}*?
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
• revoke
`
    
                    Skye.sendMessage(m.chat, {
                        image: fs.readFileSync('./Medias/thumb.jpg'),
                        caption: skyemenu2
                    }, {
                        quoted: m
                    })
                    break

            // Case menu geral
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
                break

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
