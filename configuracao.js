// OBS NAO FUI EU QUEM CRIO ESTE BOT SO FIZ TRADUZIR E ADICIONEI ALGUNS COMANDO DE MÚSICA APENAS NAO VEM COPIAR E DIZER QUE FOI VC QUE FEZ CRÉDITOS AO XEON
const fs = require('fs')
const chalk = require('chalk')

//contact details
global.ownernomer = "5511941212232"
global.ownername = "john"
global.ytname = "."
global.socialm = "."
global.location = "Brasil, Pernambuco, Recife"

global.ownernumber = '5511941212232'  //creator number
global.ownername = 'john' //owner name
global.botname = 'AuroraBOT' //name of the bot

//sticker details
global.packname = '📸 Sticker feito por'
global.author = 'AuroraBOT 🤖'

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
    prem: '❌ Este recurso pode ser usado apenas por usuários premium!',
    admin: '❌ Este recurso pode ser usado apenas pelo administrador!',
    botAdmin: '❌ Este recurso só pode ser usado quando o BOT é administrador do grupo!',
    owner: '❌ Este recurso pode ser usado apenas pelo proprietário!',
    group: '❌ Este recurso é apenas para grupos',
    private: '❌ Este recurso é apenas para bate-papos privados',
    wait: '🕘 Processando por favor aguarde...',    
    error: '❌ Erro!',
}

global.thumb = fs.readFileSync('./Medias/thumb.jpg')

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`❗️ Atualização detectada em '${__filename}'`))
    delete require.cache[file]
    require(file)
})