// Importa o módulo 'requests.js' para realizar requisições HTTP
const requests = require("./utils/requests.js");
// Importa o módulo 'uuid' para gerar identificadores únicos
const uuid = require('uuid'); 

// Define a classe 'payment' para gerenciar pagamentos
class payment {
  // Construtor da classe que inicializa o token de acesso
  constructor(access_token) {
    this.access_token = "Bearer " + access_token; // Adiciona o prefixo 'Bearer' ao token de acesso
    this.user_id = null; // Inicializa o ID do usuário como null
    this.payment_id = null; // Inicializa o ID do pagamento como null
    this.user_name = null; // Inicializa o nome do usuário como null
    this.value = null; // Inicializa o valor do pagamento como null
  }

  // Método assíncrono para calcular a data de expiração do pagamento
  async expire_date(time) {
    // Define a data atual
    this.date = new Date();
    // Adiciona 30 minutos à data atual
    this.date.setMinutes(this.date.getMinutes() + 30);
    // Converte o tempo de expiração de minutos para segundos
    this.sum_time = time * 60;
    // Calcula a data de expiração adicionando o tempo de expiração à data atual
    this.max_time = new Date(
      (this.date.getTime() + this.sum_time - this.date.getTimezoneOffset() * 60000)
    );
    // Retorna a data de expiração no formato ISO 8601 com o fuso horário ajustado para -03:00
    return this.max_time.toISOString().slice(0, -1) + "-03:00";
  }

  // Método assíncrono para criar um pagamento
  async create_payment(value, time = 30) {
    // Calcula a data de expiração do pagamento
    this.expire = await this.expire_date(time);
    // Realiza uma requisição POST para criar um pagamento
    this.response = await requests.requests({
      method: "POST",
      uri: "https://api.mercadopago.com/v1/payments",
      headers: {
        Authorization: this.access_token, // Adiciona o token de acesso no cabeçalho
        'X-Idempotency-Key': uuid.v4() // Gera e adiciona uma chave única para idempotência
      },
      json: {
        transaction_amount: parseFloat(value), // Valor da transação
        description: "PixSkye", // Descrição do pagamento
        payment_method_id: "pix", // Método de pagamento (PIX)
        payer: {
          email: "hello@felipefogaca.net", // Email do pagador
          identification: { type: "cpf", number: "00000000272" }, // Identificação do pagador (CPF)
          address: {} // Endereço do pagador (vazio)
        },
        date_of_expiration: this.expire // Data de expiração do pagamento
      }
    });

    // Armazena a resposta do pagamento
    this.payment = this.response.res.body;

    // Verifica a estrutura da resposta
    if (!this.payment || !this.payment.id) {
      throw new Error("Invalid response structure from API"); // Lança um erro se a resposta estiver inválida
    }

    // Armazena o ID do pagamento como uma string
    this.payment_id = this.payment.id.toString();

    // Retorna os detalhes do pagamento
    return {
      payment_id: this.payment_id,
      copy_paste: this.payment.point_of_interaction.transaction_data.qr_code, // QR Code para copiar e colar
      qr_code: this.payment.point_of_interaction.transaction_data.qr_code_base64, // QR Code em base64
    };
  }

  // Método assíncrono para verificar o status de um pagamento
  async check_payment() {
    // Realiza uma requisição GET para obter o status do pagamento
    this.response = await requests.requests({
      method: "GET",
      uri: "https://api.mercadopago.com/v1/payments/" + this.payment_id, // Adiciona o ID do pagamento à URL
      headers: {
        Authorization: this.access_token // Adiciona o token de acesso no cabeçalho
      }
    });

    // Analisa a resposta da requisição
    this.get_pay = JSON.parse(this.response.res.body);

    // Retorna o status do pagamento
    return { status: this.get_pay.status };
  }
}

// Exporta a classe 'payment' para ser usada em outros módulos
module.exports = { payment };
