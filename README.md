# MotoCare Front

Interface web do **MotoCare**, sistema desenvolvido para auxiliar no gerenciamento de veículos, manutenções e gastos relacionados à manutenção veicular.

O frontend foi desenvolvido com **React e Vite** e se comunica através de requisições REST com a API própria do MotoCare.

A aplicação também apresenta informações provenientes da tabela FIPE, obtidas através da integração realizada pelo backend com a BrasilAPI.

---

## Tecnologias utilizadas

- React
- Vite
- JavaScript
- CSS
- React Router
- Recharts
- Fetch API
- Docker
- Nginx

---

## Funcionalidades

A aplicação disponibiliza:

- Dashboard com resumo dos dados
- Visualização dos veículos cadastrados
- Cadastro de veículos
- Edição de veículos
- Exclusão de veículos
- Visualização das manutenções
- Cadastro de manutenções
- Edição de manutenções
- Exclusão de manutenções
- Consulta de marcas pela FIPE
- Consulta de modelos pela FIPE
- Consulta de anos pela FIPE
- Consulta de detalhes e valor FIPE
- Exibição de gráficos de gastos
- Feedback ao usuário através de notificações
- Comunicação com a API MotoCare através de REST

---

## Estrutura do projeto

```text
motocare-front/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── CardManutencao/
│   │   ├── CardResumo/
│   │   ├── CardVeiculo/
│   │   ├── GraficoGastos/
│   │   ├── Header/
│   │   ├── Modal/
│   │   ├── ModalManutencao/
│   │   ├── ModalVeiculo/
│   │   └── Toast/
│   │
│   ├── contexts/
│   │   ├── ToastContext.js
│   │   ├── ToastProvider.jsx
│   │   └── useToast.js
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Manutencoes.jsx
│   │   ├── NotFound.jsx
│   │   └── Veiculos.jsx
│   │
│   ├── services/
│   │   └── motocareService.js
│   │
│   ├── styles/
│   │   ├── dashboard.css
│   │   ├── forms.css
│   │   ├── global.css
│   │   ├── manutencoes.css
│   │   └── veiculos.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .dockerignore
├── .env.example
├── .gitignore
├── Dockerfile
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

---

## Pré-requisitos

Para executar o projeto localmente é necessário possuir:

- Node.js
- npm
- MotoCare API em execução

Para execução utilizando container também é necessário:

- Docker

---

## Configuração da API

O endereço da API é configurado através da variável de ambiente:

```env
VITE_API_URL=http://127.0.0.1:5000
```

Crie um arquivo `.env` na raiz do projeto utilizando o `.env.example` como referência.

Exemplo:

```text
motocare-front/
├── .env
├── .env.example
└── ...
```

O arquivo `.env` não é versionado no repositório.

Caso a variável `VITE_API_URL` não seja definida, a aplicação utiliza como endereço padrão:

```text
http://127.0.0.1:5000
```

---

## Executando localmente

### 1. Clone o repositório

git clone https://github.com/MateusAtaide/motocare-front.git

Entre na pasta:

```bash
cd motocare-front
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o ambiente

Crie o arquivo `.env`:

```env
VITE_API_URL=http://127.0.0.1:5000
```

Certifique-se também de que a **MotoCare API** esteja sendo executada na porta `5000`.

### 4. Execute o frontend

```bash
npm run dev
```

O Vite informará no terminal o endereço utilizado para acessar a aplicação.

---

## Build da aplicação

Para gerar a versão de produção:

```bash
npm run build
```

Os arquivos serão gerados no diretório:

```text
dist/
```

Para verificar possíveis problemas de lint:

```bash
npm run lint
```

---

## Integração com a MotoCare API

O frontend utiliza o arquivo:

```text
src/services/motocareService.js
```

para centralizar as requisições realizadas à API.

A comunicação utiliza requisições HTTP REST.

Entre as operações utilizadas estão:

| Método | Recurso | Finalidade |
|---|---|---|
| GET | `/veiculos` | Consultar veículos |
| POST | `/veiculos` | Cadastrar veículo |
| PUT | `/veiculos/{id}` | Atualizar veículo |
| DELETE | `/veiculos/{id}` | Excluir veículo |
| GET | `/manutencoes` | Consultar manutenções |
| POST | `/manutencoes` | Cadastrar manutenção |
| PUT | `/manutencoes/{id}` | Atualizar manutenção |
| DELETE | `/manutencoes/{id}` | Excluir manutenção |

Dessa forma, a interface utiliza diferentes métodos HTTP para executar as operações da aplicação.

---

## Integração com a FIPE

Durante o cadastro de um novo veículo, o frontend disponibiliza consultas à tabela FIPE.

O fluxo permite selecionar:

1. Tipo do veículo
2. Marca
3. Modelo
4. Ano

Após a seleção, são apresentados dados retornados pela consulta FIPE, como valor, código FIPE e mês de referência.

O frontend não realiza a chamada diretamente para a BrasilAPI.

A comunicação ocorre da seguinte forma:

```text
MotoCare Front
      │
      │ REST
      ▼
MotoCare API
      │
      │ HTTP
      ▼
BrasilAPI / FIPE
```

As rotas utilizadas pelo frontend são:

```text
GET /fipe/marcas/{tipo}

GET /fipe/modelos/{tipo}/{marca}

GET /fipe/anos/{tipo}/{marca}/{modelo}

GET /fipe/detalhes/{tipo}/{marca}/{modelo}/{ano}
```

O backend é responsável por consultar o serviço externo, tratar os dados recebidos e retornar as informações para o frontend.

---

## Dashboard

A aplicação possui um dashboard que utiliza os dados cadastrados para apresentar informações resumidas ao usuário.

Entre os elementos apresentados estão:

- Resumo de veículos
- Informações de manutenção
- Gastos relacionados às manutenções
- Representação gráfica dos gastos

Os gráficos são construídos utilizando a biblioteca **Recharts**.

---

## Docker

O frontend possui um `Dockerfile` com processo de build em múltiplas etapas.

Na primeira etapa, o Node.js é utilizado para instalar as dependências e gerar o build da aplicação.

Na segunda etapa, os arquivos gerados são disponibilizados através do **Nginx**.

### Criar a imagem

Na raiz do projeto:

```bash
docker build -t motocare-front .
```

### Executar o container

```bash
docker run --name motocare-front-container -p 8080:80 motocare-front
```

Depois, acesse:

```text
http://localhost:8080
```

A API deve estar disponível no endereço configurado em `VITE_API_URL`.

---

## Executando frontend e backend com Docker

Com a imagem da API e a imagem do frontend criadas, os dois componentes podem ser executados separadamente.

### Backend

```bash
docker run --name motocare-api-container -p 5000:5000 -v motocare-data:/app/database motocare-api
```

### Frontend

```bash
docker run --name motocare-front-container -p 8080:80 motocare-front
```

A aplicação estará disponível em:

```text
http://localhost:8080
```

E a API em:

```text
http://127.0.0.1:5000
```

---

## Arquitetura

A arquitetura utilizada no projeto é composta pelo frontend, pela API própria e por um serviço externo.

![Arquitetura do MotoCare](docs/arquitetura-motocare.png)

---

## Repositório da API

A API do MotoCare é mantida em um repositório separado:

https://github.com/MateusAtaide/motocare-api

---

## Autor

Desenvolvido por **Mateus Ataide da Silva**.