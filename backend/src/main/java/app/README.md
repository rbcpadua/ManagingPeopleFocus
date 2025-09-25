# Documentação da API

Esta API está rodando em `http://localhost:7000/api` e gerencia **perfis**, **usuários** e **projetos**. As rotas estão organizadas por recurso.

---

## 1. Perfis (`/profiles`)

Gerencia os perfis de usuários na plataforma.

### Listar Perfis

- **GET** `/api/profiles`
- **Descrição:** Retorna a lista de todos os perfis.
- **Resposta:** `200 OK`
- **Exemplo de Resposta:**
  ```json
  [
    { "id": 1, "name": "Admin" },
    { "id": 2, "name": "Analista" }
  ]
  ```

### Criar Perfil

- **POST** `/api/profiles`
- **Descrição:** Cria um novo perfil.
- **Corpo da Requisição:**
  ```json
  {
    "name": "Nome do Perfil"
  }
  ```
- **Resposta:** `201 Created`

### Atualizar Perfil

- **PUT** `/api/profiles/{id}`
- **Descrição:** Atualiza um perfil existente.
- **Parâmetros da URL:** `{id}` (ID do perfil a ser atualizado)
- **Corpo da Requisição:**
  ```json
  {
    "name": "Novo Nome do Perfil"
  }
  ```
- **Resposta:** `200 OK`

---

## 2. Usuários (`/users`)

Gerencia as contas dos usuários.

### Listar Usuários

- **GET** `/api/users`
- **Descrição:** Retorna a lista de todos os usuários.
- **Resposta:** `200 OK`
- **Exemplo de Resposta:**
  ```json
  [
      {"id": 1, "fullname": "João da Silva", ...}
  ]
  ```

### Criar Usuário

- **POST** `/api/users`
- **Descrição:** Cria um novo usuário.
- **Corpo da Requisição:**
  ```json
  {
    "fullname": "Nome Completo",
    "email": "email@exemplo.com",
    "document": "12345678901",
    "role": "Função do Usuário",
    "login": "login_usuario",
    "password": "senha",
    "profileId": 1
  }
  ```
- **Resposta:** `201 Created`

### Atualizar Usuário

- **PUT** `/api/users/{id}`
- **Descrição:** Atualiza um usuário existente.
- **Parâmetros da URL:** `{id}` (ID do usuário a ser atualizado)
- **Corpo da Requisição:** Os mesmos campos do POST.
- **Resposta:** `200 OK`

### Login

- **POST** `/api/login`
- **Descrição:** Autentica um usuário e retorna seus dados.
- **Corpo da Requisição:**
  ```json
  {
    "login": "login_usuario",
    "password": "senha"
  }
  ```
- **Respostas:**
  - `200 OK`: Credenciais válidas. Retorna o objeto do usuário.
  - `401 Unauthorized`: Credenciais inválidas. Retorna um erro JSON.

---

## 3. Projetos (`/projects`)

Gerencia os projetos na plataforma.

### Listar Projetos

- **GET** `/api/projects`
- **Descrição:** Retorna a lista de todos os projetos.
- **Resposta:** `200 OK`
- **Exemplo de Resposta:**
  ```json
  [
      {"id": 1, "name": "Projeto A", "status": "em_andamento", ...}
  ]
  ```

### Criar Projeto

- **POST** `/api/projects`
- **Descrição:** Cria um novo projeto.
- **Corpo da Requisição:**
  ```json
  {
    "name": "Nome do Projeto",
    "description": "Descrição do projeto.",
    "createdAt": "2025-09-25T10:00:00Z",
    "endDate": "",
    "status": "em_andamento",
    "createdBy": "Nome do Criador",
    "userId": 1
  }
  ```
- **Resposta:** `201 Created`

### Atualizar Projeto

- **PUT** `/api/projects/{id}`
- **Descrição:** Atualiza um projeto existente.
- **Parâmetros da URL:** `{id}` (ID do projeto a ser atualizado)
- **Corpo da Requisição:** Os mesmos campos do POST. Se você alterar o status para `"concluido"`, a `endDate` será preenchida automaticamente.
- **Resposta:** `200 OK`
