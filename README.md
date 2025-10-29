<!--START_SECTION:header-->
<div align="center">
  <p align="center">
    <h1>📘 Documentação do Projeto — CRUD de Produtos com Node.js e SQLite</h1>
  </p>
</div>

<br/>
<br/>

## 💻 Descrição Do Projeto

Esta aplicação é um sistema de gerenciamento de produtos desenvolvido em Node.js com SQLite como banco de dados.
O projeto implementa um CRUD completo (Create, Read, Update, Delete), permitindo cadastrar, listar, atualizar e excluir registros diretamente pelo terminal, sem interface gráfica.

Apesar do recurso principal ser “produto”, o sistema foi adaptado para poder representar livros como o exemplo prático para o cadastro.
Dessa forma, cada “produto” corresponde a um livro, contendo propriedades como nome, descrição, preço, quantidade e a data de lançamento.

A aplicação tem como objetivo demonstrar o funcionamento básico das operações de um banco de dados e a manipulação das informações pelo terminal.

## 🏗️ Recurso Escolhido: Biblioteca de Livros

O recurso principal da aplicação são livros, que representam um item disponível no sistema.
A tabela do produto é criada automaticamente no banco de dados SQLite na inicialização da aplicação.

| Campo             | Tipo de Dado                | Obrigatório | Descrição                                              |
| ----------------- | --------------------------- | ----------- | ------------------------------------------------------ |
| **id**            | INTEGER (PK, AUTOINCREMENT) | Sim         | Identificador único do livro.                        |
| **nome**          | TEXT                        | Sim         | Nome do livro.                                       |
| **descricao**     | TEXT                        | Não         | Descrição opcional do livro.                         |
| **preco**         | REAL                        | Sim         | Preço unitário do livro.                             |
| **quantidade**    | INTEGER                     | Sim         | Quantidade disponível em estoque.                      |
| **data_lancamento** | TEXT                        | Não         | Data de lançamento do livro (formato ISO: YYYY-MM-DD). |


## 💻 Linguagem e Tecnologias

Linguagem: JavaScript (Node.js)

Banco de Dados: SQLite

Dependências principais:

sqlite3 — para interação com o banco de dados
inquirer — para interface via linha de comando
path — para manipulação de caminhos no sistema de arquivos

## ⚙️ Instalação e Configuração
1. Clonar o projeto

```shell
 git clone https://github.com/mozzori/CRUD.git          
```

2. Acessar a pasta do projeto

```shell
 cd nodejs-sqlite-crud          
```

3. Instalar as dependências

```shell
 npm install          
```


Isso instalará automaticamente os módulos sqlite3 e inquirer, definidos no arquivo package.json.

## 🚀 Executando a Aplicação
Iniciar o CLI:
```shell
 node cli.js          
```

O sistema exibirá o menu interativo no terminal, permitindo escolher entre as opções de CRUD (criar, listar, atualizar, excluir e sair).

## 🧠 Estrutura do Projeto

```shell
nodejs-sqlite-crud/
│
├── cli.js              
├── database.js         
├── database.sqlite     
├── migrations.sql      
├── package.json        
├── README.md           
└── .gitignore          
```

## 🧱 Script SQL (migrations.sql)
```shell
CREATE TABLE IF NOT EXISTS produto (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  descricao TEXT,
  preco REAL NOT NULL,
  quantidade INTEGER NOT NULL,
  data_lancamento TEXT
);
```

## 🧩 Funcionalidades da Aplicação
1. Criar um novo produto

Permite adicionar um novo produto informando nome, descrição, preço, quantidade e data de lançamento.

## Exemplo de uso (via CLI):

```shell
> Cadastrar produto
Nome: Percy Jackson e os Olimpianos
Descrição: Ação; Aventura; Comédia; Fantasia.
Preço: 34.50
Quantidade: 500
Data de lançamento: 2005-01-01
```


Resultado:

```shell
Produto criado com sucesso! ID: 1
```

## 2. Listar produtos cadastrados

Exibe todos os livros presentes no banco de dados.

Exemplo de saída:
```shell

ID | Nome                            | Preço  | Quantidade  | Lançamento
-------------------------------------------------------------------------
1  | Percy Jackson e os Olimpianos   | 34.50  | 500         | 2005-01-01 |
2  | Jogos Vorazes                   | 46.50  | 300         | 2013-09-15 |

```
## 3. Buscar produto por ID

Exibe os detalhes de um produto específico.

Exemplo:

Digite o ID do produto: 1


Saída:

```shell
Produto encontrado:
Nome: Percy Jackson e os Olimpianos
Descrição: Ação; Aventura; Comédia; Fantasia.
Preço: 34.50
Quantidade: 500
Data de lançamento: 2005-01-01
```

## 4. Atualizar produto existente

Permite modificar um ou mais atributos de um produto já cadastrado.

Exemplo:

Digite o ID do produto: 1
Novo preço: 8.50
Nova quantidade: 60


Saída:
```shell
Produto atualizado com sucesso!
```

## 5. Excluir produto

Remove permanentemente um produto do banco.

Exemplo:
```shell
Digite o ID do produto: 2
Produto excluído com sucesso!
```

## 6. Sair

Finalize a execução da aplicação.

<!--START_SECTION:footer-->

<br />
<br />
