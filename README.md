# SIG-GCM - Sistema Integrado de Gestão da Guarda Civil Municipal

## Sobre o Projeto

O SIG-GCM é um sistema completo para gestão operacional da Guarda Civil Municipal, permitindo o controle de guardas, lotações, postos, escalas de serviço e relatórios gerenciais.

A solução é composta por:
- Backend em Spring Boot (Java 21)
- Frontend em Angular moderno com Signals
- Arquitetura REST desacoplada
- Persistência em banco relacional (PostgreSQL)

---

## Arquitetura do Sistema

O sistema segue uma arquitetura em camadas e separação por domínio.

### Backend (Spring Boot)

Arquitetura baseada em camadas:

- Controllers → exposição da API REST
- Services → regras de negócio
- Repositories → acesso ao banco de dados
- Entities → modelo de domínio JPA
- Mappers → conversão Entity ↔ DTO
- DTOs → comunicação com o frontend

### Frontend (Angular)

Arquitetura baseada em features:

- Core:
  - services (API HTTP)
  - stores (state management com Signals)
  - guards (controle de acesso)
  - interceptors (loading/auth)
  - models (tipagem do domínio)

- Features:
  - auth
  - guardas
  - escalas
  - lotações
  - postos
  - relatórios
  - área do guarda

---

## Principais Funcionalidades

### Gestão de Guardas
- Cadastro, atualização e remoção
- Controle de status (ativo/inativo)
- Vinculação automática com usuário do sistema

### Gestão de Postos
- Definição de local, tipo de escala e capacidade mínima
- Suporte a múltiplos modelos de escala

### Gestão de Lotações
- Associação entre guarda e posto
- Controle de grupo e turno
- Regras de lotação ativa única por guarda

### Geração de Escalas
- Tipos suportados:
  - 24x120
  - 12x60
  - Administrativo
- Geração automática baseada em regras de rodízio
- Controle de grupos (A–F / A–C)
- Validação de sequência mensal

### Consulta de Escalas
- Visualização por guarda
- Visualização por posto
- Calendário mensal

### Relatórios
- Resumo geral do sistema
- Escalas por tipo
- Exportação de escala em PDF

---

## Tecnologias Utilizadas

### Backend
- Java 21
- Spring Boot 3+
- Spring Data JPA
- PostgreSQL
- OpenPDF
- Lombok

### Frontend
- Angular (Signals API)
- TypeScript
- RxJS (interop)
- HttpClient
- LocalStorage (sessão)
- Interceptors (loading/auth)

---

## Autenticação e Segurança

- Autenticação baseada em login/senha
- Sessão armazenada no localStorage
- Perfis:
  - ADMINISTRADOR
  - GUARDA

- Controle de acesso via Guards no frontend

---

## Fluxo do Sistema

1. Usuário realiza login
2. Sistema identifica perfil
3. Guarda acessa sua área personalizada
4. Escalas são consultadas por posto e período
5. Administrador gerencia:
   - Guardas
   - Lotações
   - Postos
   - Geração de escalas
6. Relatórios são gerados sob demanda

---

## Estrutura do Projeto

### Backend

backend/
└── src/main/java/br/com/siggcm
    ├── config
    │   └── Configurações da aplicação e inicialização de dados (DatabaseSeeder).
    │
    ├── controllers
    │   └── Endpoints REST responsáveis por receber as requisições HTTP.
    │
    ├── dtos
    │   └── Objetos de transferência de dados entre Backend e Frontend.
    │
    ├── entities
    │   └── Entidades JPA que representam as tabelas do banco de dados.
    │
    ├── enums
    │   └── Enumerações utilizadas pelo domínio da aplicação.
    │
    ├── mappers
    │   └── Classes responsáveis pela conversão entre Entities e DTOs, │isolando a camada de persistência da camada de apresentação e         │ reduzindo o acoplamento entre o domínio e a API.
    │
    ├── repositories
    │   ├── Interfaces Spring Data JPA para acesso aos dados.
    │   └── projections
    │       └── Projeções utilizadas para consultas otimizadas.
    │
    ├── services
    │   └── Implementação das regras de negócio da aplicação.
    │
    └── SigGcmApiApplication.java
        └── Classe principal responsável por inicializar a aplicação Spring Boot.

### Frontend

src/app
├── core
│ ├── services
│ ├── stores
│ ├── guards
│ ├── interceptors
│ └── models
└── features
├── auth
├── guardas
├── escalas
├── lotações
├── postos
└── relatórios

---

## Status do Projeto

- Backend: ✔ Completo
- Frontend: ✔ Estruturado e funcional
- Integração: ✔ REST API consolidada
- Arquitetura: ✔ Escalável e modular

---

## Observações

O sistema foi projetado com foco em:
- escalabilidade
- separação de responsabilidades
- baixa complexidade no frontend
- regras de negócio centralizadas no backend

---

## Futuras melhorias

- Autenticação JWT completa
- Refresh token
- Auditoria de ações
- Logs centralizados
- Testes automatizados (JUnit + Cypress)
- Dockerização completa

---

## Projeto acadêmico / institucional

Sistema desenvolvido para gestão operacional da Guarda Civil Municipal, com foco em automação de escalas e controle de efetivo.