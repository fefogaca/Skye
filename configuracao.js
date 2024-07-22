// -------------------------------------
//
// Copyright (c) 2003 Skye WhatsApp Services Inc.
// All Rights Reserved
//
// This product is protected by copyright and distributed under
// licenses restricting copying, distribution, and decompilation.
//
// -------------------------------------

// Importa o módulo 'fs' para manipulação de arquivos e 'chalk' para colorir o texto no console
const fs = require('fs');
const chalk = require('chalk');

// Detalhes de contato do bot e do criador
global.ownernomer = "5511941212232"; // Número de telefone do dono
global.ownername = "john"; // Nome do dono
global.ytname = "."; // Nome do canal do YouTube (não definido)
global.socialm = "."; // Nome das redes sociais (não definido)
global.location = "Brasil, Pernambuco, Recife"; // Localização

// Dados principais do bot
global.ownernumber = '5511941212232'; // Número do criador
global.ownername = 'john'; // Nome do dono
global.botname = 'Skye'; // Nome do BOT

// Detalhes do desenvolvedor e do console
global.devum = 'john'; // Nome do primeiro desenvolvedor
global.devdois = 'neast'; // Nome do segundo desenvolvedor
global.botnameconsole = 'SKYE'; // Nome do bot no console
global.hostname = 'https://panel.felipefogaca.net'; // URL do painel de controle

// Detalhes do Sticker (adesivo)
global.packname = '📸 Sticker feito por'; // Nome do pacote de adesivo
global.author = 'Skye BOT'; // Autor do adesivo

// Configurações para exibição no console
global.themeemoji = '📝'; // Emoji usado para o tema
global.wm = "SkyeBOT"; // Marca d'água do bot

// Link do tema (não definido)
global.link = '';

// Prefixos customizados para comandos
global.prefa = ['/']; // Prefixo para comandos (aqui é apenas '/')

// Configurações de comportamento automático do bot
global.autoRecording = false; // Desativa a gravação automática de áudio
global.autoTyping = true; // Ativa a digitação automática
global.autorecordtype = false; // Desativa gravação e digitação automáticas
global.autoread = false; // Desativa a leitura automática de mensagens
global.autobio = false; // Desativa a atualização automática da bio do bot
global.anti92 = false; // Desativa o bloqueio automático de números do Paquistão (+92)
global.autoread_status = false; // Desativa a visualização automática de status dos usuários

// Tipo do menu do bot
global.typemenu = 'v1'; // Define o tipo de menu como 'v1'

// Chave de API para acessar recursos externos
global.skyeapikey = 'johnvps'; // Chave de API

// Respostas pré-definidas que o bot pode usar
global.SkyeMensagens = {
    done: '✅ Concluído com sucesso!', // Mensagem para ações bem-sucedidas
    prem: 'Opa, somente usuários apoiadores podem utilizar esse recurso.', // Mensagem para recursos exclusivos de apoiadores
    admin: 'Somente o(s) administrador(es) pode(m) usar esse recurso.', // Mensagem para comandos de administrador
    botAdmin: 'Puts, eu preciso ser administradora do grupo para fazer isso.', // Mensagem quando o bot não é administrador
    owner: 'Eita, parece que esse é um comando dos meus desenvolvedores.', // Mensagem para comandos reservados aos desenvolvedores
    group: 'Esse é um recurso para ser usado em grupos!', // Mensagem para comandos disponíveis apenas em grupos
    private: 'Psiu! Você deve utilizar esse comando no privado comigo.', // Mensagem para comandos disponíveis apenas em privado
    wait: '🕘 Processando a solicitação, aguarde...', // Mensagem enquanto a solicitação está sendo processada
    error: 'Eita, parece que houve um erro por aqui.' // Mensagem de erro genérica
};

// Carrega a imagem do menu do bot
global.thumb = fs.readFileSync('./Medias/thumb.jpg'); // Lê a imagem do arquivo e armazena em 'global.thumb'

// Monitora o arquivo atual para detectar alterações
let file = require.resolve(__filename); // Resolve o caminho do arquivo atual
fs.watchFile(file, () => {
    fs.unwatchFile(file); // Para de observar o arquivo após a mudança
    console.log(chalk.redBright(`❗️ Atualização detectada em '${__filename}'`)); // Loga uma mensagem de atualização detectada
    delete require.cache[file]; // Remove o cache do módulo para forçar o recarregamento
    require(file); // Recarrega o módulo atualizado
    process.exit(); // Encerra o processo para reiniciar o bot
});
