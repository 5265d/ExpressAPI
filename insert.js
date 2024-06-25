const { Pool } = require('pg');
const readline = require('readline');
require("dotenv").config();

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function insertItem() {
  try {
    const id = await askQuestion('ID do Item: ');
    const nome = await askQuestion('Nome do Item: ');
    const quantidade = await askQuestion('Quantidade do Item: ');
    const dataEntrada = await askQuestion('Data de Entrada (AAAA-MM-DD): ');
    const dataSaida = await askQuestion('Data de Saída (AAAA-MM-DD): ');

    const query = 'INSERT INTO itens (id, item, quant, datalote, datavenda) VALUES ($1, $2, $3, $4, $5)';
    const values = [id, nome, quantidade, dataEntrada, dataSaida];

    await pool.query(query, values);

    console.log('Inserção realizada com sucesso!');
    process.exit(0); 
  } catch (error) {
    console.error('Erro ao inserir o item:', error);
    process.exit(1); 
  }
}

function askQuestion(question) {
  return new Promise((resolve, reject) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

insertItem();
