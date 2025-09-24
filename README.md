# ManagingPeopleFocus

Um sistema de gerenciamento de usuários, projetos e perfis desenvolvido em **Java** utilizando o padrão de arquitetura **MVC (Model–View–Controller)**.
Na parte de persistencia, o banco escolhido foi o **Render'x'**, banco PostgreSQL gratuito na nuvem, para que você possa testar o projeto de forma facilitada sem precisar intslar nada localmente.
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

ManagingPeopleFocus/
backend/
├── .vscode/
├── src/
│ └── main/
│ └── java/
│ ├── controller/
│ ├── model/
│ ├── repository/
│ ├── utils/
│ └── ApiServer.java
└── frontend/
├── public/ # Arquivos públicos do React
├── src/ # Código-fonte do frontend
│ ├── components/ # Componentes reutilizáveis (MUI)
│ ├── pages/ # Páginas principais
│ └── App.js # Ponto de entrada do frontend

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
  - Node.js

- Verifique a instalação do Java e do Node:

```bash
    java -version
    javac -version
    node -v
    npm -v
```

### 2. Rodando o projeto localmente

- Rode o front para validar a funcionalidade do projeto, pois o comportamento do back end está sendo disponibilizado em uma api para consumo do front, sendo assim todos ops CRUDs que se encontram na pasta controller podem ser testados pela interface.

#### Para o React

- Em andamento

#### Para o Java

- Vá até a pasta /backend e rode no seu terminal os comando abaixo:

- Build o projeto com Maven:

```bash
  mvn clean install
```

- Habilite a porta 7000 (Para rodar a api):

```bash
 java -jar target/ManagingPeopleFocus-1.0.0-SNAPSHOT.jar
```
