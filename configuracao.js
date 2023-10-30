// OBS NAO FUI EU QUEM CRIO ESTE BOT SO FIZ TRADUZIR E ADICIONEI ALGUNS COMANDO DE MÚSICA APENAS NAO VEM COPIAR E DIZER QUE FOI VC QUE FEZ CRÉDITOS AO XEON
const fs = require('fs')
const chalk = require('chalk')

// CONTACT DETAILS
global.ownernomer = "5511941212232"
global.ownername = "john"
global.ytname = "."
global.socialm = "."
global.location = "Brasil, Pernambuco, Recife"

global.ownernumber = '5511941212232'  //creator number
global.ownername = 'john' //owner name
global.botname = 'Skye BOT' //name of the bot

// CONSOLE DETAILS
global.devum = 'john'
global.devdois = 'neast'
global.botnameconsole = 'SKYE'
global.hostname = 'LunarCloud Service'

// STICKER DETAILS
global.packname = '📸 Sticker feito por'
global.author = 'Skye BOT'

//console view/theme
global.themeemoji = '📝'
global.wm = "AuroraBOT"

//theme link
global.link = ''

//custom prefix
global.prefa = ['/']

//false=disable and true=enable
global.autoRecording = false //auto recording
global.autoTyping = true //auto typing
global.autorecordtype = false //auto typing + recording
global.autoread = false //auto read messages
global.autobio = false //auto update bio
global.anti92 = false //auto block +92 
global.autoread_status = false //auto view status/story

//menu type 
//v1 is image menu, 
//v2 is link + image menu,
//v3 is video menu,
//v4 is call end menu
global.typemenu = 'v1'

//reply messages
global.mess = {
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

global.thumb = fs.readFileSync('./Medias/thumb.jpg')

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`❗️ Atualização detectada em '${__filename}'`))
    delete require.cache[file]
    require(file)
})