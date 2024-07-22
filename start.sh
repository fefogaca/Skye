#!/bin/bash

# -------------------------------------
# SkyeBOT - Script de Inicialização
# Versão 1.0
# Desenvolvido por johNN
# -------------------------------------

# Função para exibir uma mensagem de status
status_message() {
    printf "\n\033[1;32m🌟 SkyeBOT está inicializando... \033[0m\n"
    printf "\033[1;34m📜 Script Anti-Quedas Ativado \033[0m\n"
}

# Função para exibir uma mensagem de erro
error_message() {
    printf "\n\033[1;31m❗ Erro: ${1} \033[0m\n"
}

# Mensagem de boas-vindas
status_message

while true; do
    # Executa o script Node.js
    node index.js

    # Verifica o código de saída do script Node.js
    if [ $? -eq 0 ]; then
        printf "\n\033[1;32m✅ SkyeBOT foi encerrado com sucesso. Reiniciando... \033[0m\n"
    else
        error_message "Ocorreu um erro durante a execução do SkyeBOT. Reiniciando em breve..."
    fi

    # Pausa antes de reiniciar
    printf "\n⏳ Aguardando 5 segundos antes de reiniciar...\n"
    sleep 5
done
