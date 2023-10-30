// -------------------------------------
//
// Copyright (c) 2003 Skye WhatsApp Services Inc.
// All Rights Reserved
//
// This product is protected by copyright and distributed under
// licenses restricting copying, distribution, and decompilation.
//
// -------------------------------------

const fs = require('fs')
const chalk = require('chalk')

// Detalhes de contato
global.ownernomer = "5511941212232"
global.ownername = "john"
global.ytname = "."
global.socialm = "."
global.location = "Brasil, Pernambuco, Recife"

global.ownernumber = '5511941212232'  // Número do criador
global.ownername = 'john' // Nome do Dono
global.botname = 'Skye' // Nome do BOT

// Detalhes no console
global.devum = 'john'
global.devdois = 'neast'
global.botnameconsole = 'SKYE'
global.hostname = 'LunarCloud Service'

// Detalhes do Sticker
global.packname = '📸 Sticker feito por'
global.author = 'Skye BOT'

// Ver o tema no console
global.themeemoji = '📝'
global.wm = "SkyeBOT"

// Link do tema
global.link = ''

// Prefix customizados
global.prefa = ['/']

// false = desativado and true = ativado
global.autoRecording = false // Gravando áudio automático
global.autoTyping = true // Escrevendo automático
global.autorecordtype = false // Escrevendo e gravando áudio automático
global.autoread = false // Ler as mensagens no automático
global.autobio = false // Atualizar a bio do BOT automaticamente
global.anti92 = false // Bloquear automaticamente pais +92 (Paquistão)
global.autoread_status = false // Visualizar automaticamente os status dos usuários

// Tipo do menu
global.typemenu = 'v1'

// Respostas pré feitas
global.SkyeMensagens = {
    done: '✅ Concluido com sucesso!',
    prem: 'Opa, somente usuários apoiadores podem utilizar esse recurso.',
    admin: 'Somente o(s) administrador(es) pode usar esse recurso.',
    botAdmin: 'Puts, eu preciso ser administradora do grupo para fazer isso.',
    owner: 'Eita, parece que esse é um comando dos meus desenvolvedores.',
    group: 'Esse é um recurso para ser usado em grupos!',
    private: 'Psiu! Você deve utilizar esse comando no privado comigo.',
    wait: '🕘 Processando a solicitação, aguarde...',    
    error: 'Eita, parece que houve um erro por aqui.'
}

// Imagem do Menu
global.thumb = fs.readFileSync('./Medias/thumb.jpg')

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`❗️ Atualização detectada em '${__filename}'`))
    delete require.cache[file]
    require(file)
})