const inquirer = require('inquirer');
const db = require('./database');

async function formatProduto(prod) {
  if (!prod) return 'Produto não encontrado.';
  return `ID: ${prod.id}
Nome: ${prod.nome}
Descrição: ${prod.descricao || '-'}
Preço: ${prod.preco}
Quantidade: ${prod.quantidade}
Data lancamento: ${prod.data_lancamento || '-'}`;
}

async function listar() {
  const produtos = await db.allProdutos();
  if (produtos.length === 0) {
    console.log('\nNenhum produto cadastrado.\n');
    return;
  }
  console.log('\n=== Produtos ===');
  produtos.forEach(p => {
    console.log(`${p.id} - ${p.nome} | R$ ${p.preco} | Qtd: ${p.quantidade}`);
  });
  console.log('');
}

async function buscarPorId() {
  const { id } = await inquirer.prompt([{ name: 'id', message: 'ID do produto:', validate: v => v && !isNaN(v) ? true : 'Digite um número válido' }]);
  const prod = await db.getProdutoById(id);
  console.log('\n' + await formatProduto(prod) + '\n');
}

async function cadastrar() {
  const answers = await inquirer.prompt([
    { name: 'nome', message: 'Nome:', validate: v => v ? true : 'Nome é obrigatório' },
    { name: 'descricao', message: 'Descrição (opcional):' },
    { name: 'preco', message: 'Preço:', validate: v => !isNaN(parseFloat(v)) ? true : 'Digite um número' },
    { name: 'quantidade', message: 'Quantidade:', validate: v => Number.isInteger(Number(v)) ? true : 'Digite um inteiro' },
    { name: 'data_lancamento', message: 'Data lançamento (YYYY-MM-DD) (opcional):', validate: v => { if (!v) return true; return /^\d{4}-\d{2}-\d{2}$/.test(v) ? true : 'Formato inválido'; } }
  ]);

  const produto = {
    nome: answers.nome,
    descricao: answers.descricao || null,
    preco: parseFloat(answers.preco),
    quantidade: parseInt(answers.quantidade),
    data_lancamento: answers.data_lancamento || null
  };

  const res = await db.createProduto(produto);
  console.log(`\nProduto criado com sucesso! ID ${res.id}\n`);
}

async function atualizar() {
  const { id } = await inquirer.prompt([{ name: 'id', message: 'ID do produto a atualizar:', validate: v => v && !isNaN(v) ? true : 'Digite um número válido' }]);
  const prod = await db.getProdutoById(id);
  if (!prod) {
    console.log('\nProduto não encontrado.\n');
    return;
  }
  const answers = await inquirer.prompt([
    { name: 'nome', message: `Nome (${prod.nome}):`, default: prod.nome, validate: v => v ? true : 'Nome é obrigatório' },
    { name: 'descricao', message: `Descrição (${prod.descricao || ''}):`, default: prod.descricao || '' },
    { name: 'preco', message: `Preço (${prod.preco}):`, default: prod.preco, validate: v => !isNaN(parseFloat(v)) ? true : 'Digite um número' },
    { name: 'quantidade', message: `Quantidade (${prod.quantidade}):`, default: prod.quantidade, validate: v => Number.isInteger(Number(v)) ? true : 'Digite um inteiro' },
    { name: 'data_lancamento', message: `Data lançamento (${prod.data_lancamento || ''}) (YYYY-MM-DD):`, default: prod.data_lancamento || '', validate: v => { if (!v) return true; return /^\d{4}-\d{2}-\d{2}$/.test(v) ? true : 'Formato inválido'; } }
  ]);

  const produto = {
    nome: answers.nome,
    descricao: answers.descricao || null,
    preco: parseFloat(answers.preco),
    quantidade: parseInt(answers.quantidade),
    data_lancamento: answers.data_lancamento || null
  };

  const res = await db.updateProduto(id, produto);
  console.log(`\nAtualizado. Linhas alteradas: ${res.changes}\n`);
}

async function deletar() {
  const { id } = await inquirer.prompt([{ name: 'id', message: 'ID do produto a deletar:', validate: v => v && !isNaN(v) ? true : 'Digite um número válido' }]);
  const { confirmar } = await inquirer.prompt([{ type: 'confirm', name: 'confirmar', message: `Confirma remover o produto ID ${id}?`, default: false }]);
  if (!confirmar) {
    console.log('\nOperação cancelada.\n');
    return;
  }
  const res = await db.deleteProduto(id);
  console.log(`\nRemovido. Linhas afetadas: ${res.changes}\n`);
}

async function mainMenu() {
  await db.init(); 
  while (true) {
    const { op } = await inquirer.prompt([{
      type: 'list',
      name: 'op',
      message: 'Escolha uma opção',
      choices: [
        { name: 'Listar produtos', value: 'list' },
        { name: 'Buscar produto por ID', value: 'get' },
        { name: 'Cadastrar produto', value: 'create' },
        { name: 'Atualizar produto', value: 'update' },
        { name: 'Deletar produto', value: 'delete' },
        { name: 'Sair', value: 'exit' }
      ]
    }]);

    try {
      if (op === 'list') await listar();
      else if (op === 'get') await buscarPorId();
      else if (op === 'create') await cadastrar();
      else if (op === 'update') await atualizar();
      else if (op === 'delete') await deletar();
      else if (op === 'exit') {
        console.log('Tchau!');
        process.exit(0);
      }
    } catch (err) {
      console.error('Erro:', err.message);
    }
  }
}

mainMenu();
