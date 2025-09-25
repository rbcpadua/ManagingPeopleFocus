# ManagingPeopleFocus

Um sistema de gerenciamento de usuários, projetos e perfis desenvolvido em **Java** utilizando o padrão de arquitetura **MVC (Model–View–Controller)**.
Na parte de persistencia, o banco escolhido foi o **Render**, banco PostgreSQL gratuito na nuvem, para que você possa testar o projeto de forma facilitada sem precisar intslar nada localmente.
No frontend, o design system utilizado é o **MUI (Material UI)**, garantindo uma interface moderna, a linguagem escolhida para o desenvolvimento é **React com Typescript**, essa escolha foi baseada em minha experiencia profissional.

---

## 🚀 Tecnologias utilizadas

- **Java 17 (OpenJDK)** – linguagem principal pelo back end
- **MVC (Model–View–Controller)** – padrão de arquitetura de software
- **VS Code** – IDE recomendada para desenvolvimento
- **React 18** - linguagem principal pelo front end
- **MUI (Material UI)** – design system aplicado no frontend

---

## 📂 Estrutura do Projeto

```bash
ManagingPeopleFocus/
backend/
├── .vscode/
├── src/
│ └── main/
│ └── java/
| | └── app/
| │ ├── controller/
| │ ├── model/
| │ ├── repository/
| │ ├── utils/
| │ └── ApiServer.java
└── frontend/
├── public/
├── src/
| ├── assets/
| ├── contexts/ # Parte de Autenticação da app
| ├── hooks/ # Interação com a API fornecida pelo JAVA
│ ├── components/ 
│ ├── pages/ # Páginas principais
| ├── routes/ 
│ └── App.js # Ponto de entrada do frontend
```
---

## ⚙️ Instalação

### 1. Pré-requisitos

- Clone o projeto pelo git

```bash
  git clone https://github.com/rbcpadua/ManagingPeopleFocus.git
```

- Ter instalado:

  - [Java 17+](https://adoptium.net/) (JDK)
  - [VS Code](https://code.visualstudio.com/) com **Extension Pack for Java**
  - [Node.js 24.8.0] passo a passo para instalação da versão correta estará abaixo

- Verifique a instalação do Java e do Node:

```bash
    java -version
    javac -version
    node -v
    npm -v
```

### 2. Rodando o projeto localmente

- Rode o front para validar a funcionalidade do projeto, pois o comportamento do back end está sendo disponibilizado em uma API para consumo do front, sendo assim todos os CRUDs que se encontram na pasta controller podem ser testados pela interface.

#### Rodando o JAVA

- Vá até a pasta /backend e rode no seu terminal os comando abaixo:

- Build o projeto com Maven (Gerenciador de dependencias do JAVA):

```bash
  mvn clean install
```

- Habilite a porta 7000 (Para rodar a api):

```bash
 java -jar target/ManagingPeopleFocus-1.0.0-SNAPSHOT.jar
```

#### Rodando apenas a API + JAVA

- Caso prefira rodar a API pelo postman, sugiro que leia o README.md da API que se encontra na pasta backend/src/main/java/app

#### Rodando o REACT

No seu terminal

- Baixe o NVM

```bash
 curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

Depois atualize o terminal

Atualizar:

```bash
 source ~/.bashrc
```

ou para OhMyZsh

```bash
source ~/.zshrc
```

- Depois Instalar o Node:

```bash
  nvm install node
```

- Rode o comando para usar a versão correta, o projeto possui o arquivo .nvmrc com a versão usada no projeto:

```bash
  nvm use node
```

- Instale o yarn caso não tenha:

```bash
  npm install -g yarn
```

- Rode o comando para instalar as dependendias que estão no package.json

```bash
  yarn install
```

- Rode o comando para rodar o projeto localmente

```bash
  yarn dev
```

- Quando ver a tela de login, logue com a conta de administrador:

```
  Login: HaruPan
  Senha: 123456
```

\*\* Depois disso fique a vontada para criar e excluir usuarios conforme o seu perfil, interaja com a plataforma.
