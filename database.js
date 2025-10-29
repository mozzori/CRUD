const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.resolve(__dirname, 'database.sqlite');

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Erro ao abrir o banco:', err.message);
    process.exit(1);
  }
});

// cria a tabela produto se ela não existir
const init = () => {
  const sql = `
  CREATE TABLE IF NOT EXISTS produto (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    preco REAL NOT NULL,
    quantidade INTEGER NOT NULL,
    data_lancamento TEXT
  );`;
  return new Promise((resolve, reject) => {
    db.run(sql, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

/* crud */
const allProdutos = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM produto', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const getProdutoById = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM produto WHERE id = ?', [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const createProduto = (produto) => {
  const { nome, descricao, preco, quantidade, data_lancamento } = produto;
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO produto (nome, descricao, preco, quantidade, data_lancamento)
                 VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [nome, descricao || null, preco, quantidade, data_lancamento || null], function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID });
    });
  });
};

const updateProduto = (id, produto) => {
  const { nome, descricao, preco, quantidade, data_lancamento } = produto;
  return new Promise((resolve, reject) => {
    const sql = `UPDATE produto
                 SET nome = ?, descricao = ?, preco = ?, quantidade = ?, data_lancamento = ?
                 WHERE id = ?`;
    db.run(sql, [nome, descricao || null, preco, quantidade, data_lancamento || null, id], function(err) {
      if (err) reject(err);
      else resolve({ changes: this.changes });
    });
  });
};

const deleteProduto = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM produto WHERE id = ?', [id], function(err) {
      if (err) reject(err);
      else resolve({ changes: this.changes });
    });
  });
};

module.exports = {
  db,
  init,
  allProdutos,
  getProdutoById,
  createProduto,
  updateProduto,
  deleteProduto
};
