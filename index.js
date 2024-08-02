// -------------------------------------
//
// Copyright (c) 2003 Skye WhatsApp Services Inc.
// All Rights Reserved
//
// This product is protected by copyright and distributed under
// licenses restricting copying, distribution, and decompilation.
//
// -------------------------------------

// Importa a função 'spawn' do módulo 'child_process' para criar processos filhos
const { spawn } = require('child_process');
// Importa o módulo 'path' para manipulação de caminhos de arquivos
const path = require('path');
// Importa o módulo 'express' para criar um servidor web
const express = require('express');

// Função para iniciar o processo principal
function start() {
    // Cria um array de argumentos que inclui o caminho para o arquivo 'main.js' e quaisquer argumentos passados para o script
    let args = [path.join(__dirname, 'main.js'), ...process.argv.slice(2)];
    
    // Exibe o comando que será executado no console
    console.log([process.argv[0], ...args].join('\n'));
    
    // Cria um novo processo filho para executar o arquivo 'main.js'
    let p = spawn(process.argv[0], args, {
        // Configura o fluxo de entrada e saída para herdar da entrada e saída do processo pai
        // 'ipc' é usado para comunicação entre processos
        stdio: ['inherit', 'inherit', 'inherit', 'ipc']
    })
    // Configura um ouvinte para mensagens enviadas pelo processo filho
    .on('message', data => {
        // Se a mensagem recebida for 'reset'
        if (data === 'reset') {
            // Exibe uma mensagem indicando que o bot está sendo reiniciado
            console.log('🔌 Reiniciando o BOT...');
            // Encerra o processo filho
            p.kill();
            // Inicia um novo processo
            start();
            // Remove a referência ao processo atual
            delete p;
        }
    })
    // Configura um ouvinte para o evento de saída do processo filho
    .on('exit', code => {
        // Exibe uma mensagem no console indicando o código de saída do processo
        console.error('🔌 Saiu com código:', code);
        // Se o código de saída indicar um erro ou se for zero
        if (code === 1 || code === 0) start();
    });
}

// Função para iniciar o servidor Express
function startServer() {
    const app = express();
// Caso o node mude de porta, coloque a porta nova abaixo
    const port = 25573;

    // Define uma rota para responder com "online"
    app.get('/', (req, res) => {
        res.send('online');
    });

    // Inicia o servidor na porta especificada
	// Função para monitorar a atividade do BOT para a StatusPage
    app.listen(port, () => {
        console.log(`✅ Monitorador Web iniciado com sucesso na porta ${port}`);
    });
}

// Inicia o processo principal
start();
// Inicia o servidor web
startServer();
