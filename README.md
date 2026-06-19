# SIG-GCM - Sistema Integrado de Gestão da Guarda Civil Municipal

## Sobre o Projeto

O SIG-GCM é um sistema desenvolvido para apoiar o gerenciamento operacional da Guarda Civil Municipal, permitindo a administração de efetivos, postos de serviço, lotações, escalas de trabalho e consultas pelos próprios guardas.

O sistema foi projetado utilizando uma arquitetura em camadas, separando completamente o frontend, backend e banco de dados, permitindo manutenção, escalabilidade e acesso simultâneo por múltiplos usuários.

---

# Arquitetura do Projeto

```
SIG-GCM
│
├── backend
│   ├── src
│   ├── pom.xml
│   ├── mvnw
│   └── docker-compose.yml
│
├── frontend
│   ├── src
│   ├── angular.json
│   ├── package.json
│   └── ...
│
├── .github
└── README.md
```

---

# Tecnologias Utilizadas

## Frontend

- Angular 21
- TypeScript
- Signals
- Standalone Components
- Angular Router
- HttpClient
- CSS

---

## Backend

- Java 21
- Spring Boot
- Spring MVC
- Spring Data JPA
- Spring Security
- Hibernate
- Maven

---

## Banco de Dados

- PostgreSQL
- Supabase (Banco remoto)

---

## Desenvolvimento Local

- Docker Desktop
- PostgreSQL (opcional para desenvolvimento)

---

# Arquitetura da Aplicação

```
             Usuário

                │

                ▼

       Angular (Frontend)

                │
        Requisições REST

                ▼

      Spring Boot (API REST)

                │

      Spring Data JPA/Hibernate

                │

                ▼

      PostgreSQL (Supabase)
```

Todo o acesso ao banco de dados ocorre exclusivamente pelo backend.

O frontend nunca acessa diretamente o banco de dados.

---

# Estrutura do Frontend

```
frontend
│
├── src
│
├── app
│   ├── core
│   │   ├── guards
│   │   ├── interceptors
│   │   ├── models
│   │   ├── services
│   │   └── stores
│   │
│   ├── features
│   │   ├── auth
│   │   ├── dashboard
│   │   ├── guardas
│   │   ├── postos
│   │   ├── lotacoes
│   │   ├── escalas
│   │   ├── relatorios
│   │   └── area-guarda
│   │
│   └── shared
│
└── environments
```

---

# Estrutura do Backend

```
backend
│
├── controllers
├── dtos
├── entities
├── enums
├── mappers
├── repositories
├── security
├── services
├── config
└── resources
```

---

# Principais Funcionalidades

## Administração

- Cadastro de Guardas
- Cadastro de Postos
- Cadastro de Lotações
- Geração de Escalas
- Consulta de Relatórios

---

## Guarda

- Login
- Consulta da Escala Mensal
- Consulta do Posto de Trabalho
- Calendário Mensal de Serviço

---

# Tipos de Escala

O sistema suporta atualmente:

## 24x120

- Escala por grupos (A-F)
- Rotação automática
- Controle de serviços extras

---

## 12x60

- Turno Dia
- Turno Noite

---

## Administrativo

- Segunda à Sexta
- Turno Manhã
- Turno Tarde

---

# Persistência dos Dados

O sistema utiliza PostgreSQL hospedado no Supabase.

Isso permite:

- Persistência permanente dos dados;
- Acesso simultâneo por vários usuários;
- Compartilhamento do banco entre diferentes computadores;
- Eliminação da necessidade de manter um banco local para utilização do sistema.

Durante o desenvolvimento também é possível utilizar PostgreSQL local através do Docker.

---

# Docker

O backend possui suporte ao Docker para desenvolvimento local.

Exemplo de utilização:

```
docker compose up -d
```

O Docker é utilizado apenas para ambiente de desenvolvimento.

Em produção o sistema utiliza PostgreSQL remoto no Supabase.

---

# Executando o Projeto

## 1 - Backend

Entrar na pasta:

```
backend
```

Compilar:

```
mvn clean install
```

Executar:

```
mvn spring-boot:run
```

ou

```
.\mvnw spring-boot:run
```

Caso utilize perfil específico:

```
.\mvnw spring-boot:run "-Dspring-boot.run.profiles=supabase"
```

O backend ficará disponível em:

```
http://localhost:8080
```

---

## 2 - Frontend

Entrar na pasta:

```
frontend
```

Instalar dependências:

```
npm install
```

Executar:

```
ng serve
```

ou

```
npm start
```

O frontend ficará disponível em:

```
http://localhost:4200
```

---

# Fluxo da Aplicação

```
Navegador

      │

      ▼

Angular

      │

HTTP REST

      ▼

Spring Boot

      │

Hibernate / JPA

      ▼

PostgreSQL (Supabase)
```

---

# Organização do Projeto

O projeto foi organizado seguindo os princípios de separação de responsabilidades:

- Frontend responsável apenas pela interface do usuário;
- Backend responsável pelas regras de negócio;
- Banco de dados responsável apenas pela persistência.

Essa arquitetura facilita manutenção, testes, escalabilidade e evolução do sistema.

---

# Autor

Desenvolvido como projeto da disciplina **Programação Web I** do curso de **Tecnólogo em Sistemas para Internet**.

Instituto Federal da Paraíba – IFPB.
