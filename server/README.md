# ⚙️ Backend - NLW Agents API

> API robusta para sistema de Q&A com IA e transcrição de áudio

## 📋 Sobre

Este é o backend do projeto NLW Agents, uma API REST construída com Node.js e Fastify que fornece endpoints para gerenciamento de salas, perguntas, respostas com IA e processamento de áudio com embeddings vetoriais.

## 🛠️ Tecnologias

### 🚀 Core
- **Node.js 20+**: Runtime JavaScript moderno
- **TypeScript**: Execução nativa com `--experimental-strip-types`
- **Fastify 5+**: Framework web ultra-rápido e eficiente

### 🗄️ Banco de Dados
- **PostgreSQL 17**: Banco de dados principal
- **pgvector**: Extensão para embeddings vetoriais
- **Drizzle ORM**: ORM TypeScript-first moderna
- **Drizzle Kit**: Ferramentas de migração

### 🤖 Inteligência Artificial
- **Google Gemini AI**: Geração de respostas contextualizadas
- **Embeddings**: Processamento vetorial para busca semântica

### 🔧 Ferramentas
- **Zod**: Validação de schemas e tipos
- **Fastify Multipart**: Upload de arquivos
- **Fastify CORS**: Configuração de CORS
- **Fastify Type Provider Zod**: Integração TypeScript + Zod

## 🏗️ Arquitetura

```
server/
├── src/
│   ├── db/                    # Banco de dados
│   │   ├── schema/           # Schemas das tabelas
│   │   │   ├── rooms.ts
│   │   │   ├── questions.ts
│   │   │   ├── audio-chunks.ts
│   │   │   └── index.ts
│   │   ├── migrations/       # Migrações SQL
│   │   ├── connection.ts     # Configuração do banco
│   │   └── seed.ts          # População inicial
│   ├── http/
│   │   └── routes/          # Rotas da API
│   │       ├── get-rooms.ts
│   │       ├── create-rooms.ts
│   │       ├── get-room-questions.ts
│   │       ├── create-question.ts
│   │       └── upload-audio.ts
│   ├── services/            # Serviços externos
│   │   └── gemini.ts       # Integração Google AI
│   ├── env.ts              # Validação de variáveis
│   └── server.ts           # Configuração do servidor
├── docker/
│   └── setup.sql           # Script de inicialização do DB
├── docker-compose.yml      # Configuração do PostgreSQL
└── drizzle.config.ts      # Configuração do Drizzle
```

## 🌐 API Endpoints

### 🏠 Salas (Rooms)

**Listar Salas**
```http
GET /rooms
```
- Retorna todas as salas com contagem de perguntas
- Ordenadas por data de criação

**Criar Sala**
```http
POST /rooms
Content-Type: application/json

{
  "name": "Nome da Sala",
  "description": "Descrição opcional"
}
```

### ❓ Perguntas (Questions)

**Listar Perguntas da Sala**
```http
GET /rooms/{roomId}/questions
```
- Retorna perguntas ordenadas por data (mais recentes primeiro)
- Inclui respostas geradas pela IA

**Criar Pergunta**
```http
POST /rooms/{roomId}/questions
Content-Type: application/json

{
  "question": "Sua pergunta aqui"
}
```

### 🎤 Áudio (Audio)

**Upload de Áudio**
```http
POST /rooms/{roomId}/audio
Content-Type: multipart/form-data

file: [arquivo de áudio]
```
- Aceita arquivos em formato WebM
- Processa transcrição automaticamente
- Gera embeddings vetoriais

### 🩺 Health Check

**Status da API**
```http
GET /health
```
- Retorna "OK" se a API estiver funcionando

## 🗄️ Estrutura do Banco

### 📋 Schema das Tabelas

**Salas (rooms)**
```sql
CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);
```

**Perguntas (questions)**
```sql
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID REFERENCES rooms(id) NOT NULL,
  question TEXT NOT NULL,
  answer TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);
```

**Chunks de Áudio (audio_chunks)**
```sql
CREATE TABLE audio_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID REFERENCES rooms(id) NOT NULL,
  transcription TEXT NOT NULL,
  embeddings VECTOR(768) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);
```

### 🔍 Índices e Performance
- Índices automáticos em chaves primárias
- Índices em foreign keys para joins eficientes
- Suporte a busca vetorial com pgvector

## 🤖 Integração com IA

### 🧠 Google Gemini AI
- Geração de respostas contextualizadas
- Processamento de linguagem natural
- Integração com embeddings para contexto

### 📊 Embeddings Vetoriais
- Dimensões: 768 (compatível com modelos modernos)
- Busca por similaridade semântica
- Contexto baseado em transcrições de áudio

## 🚀 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Servidor com hot reload

# Produção
npm start               # Servidor de produção

# Banco de Dados
npm run db:generate     # Gerar migrações
npm run db:migrate      # Executar migrações
npm run db:seed         # Popular banco com dados de teste
```

## 🔧 Configuração

### 📄 Variáveis de Ambiente

Crie um arquivo `.env` baseado no `.env.example`:

```env
# Servidor
PORT=3333

# Banco de Dados
DATABASE_URL=postgresql://docker:docker@localhost:5432/agents

# IA (Opcional)
GOOGLE_GENAI_API_KEY=sua_api_key_aqui
```

### 🐳 Docker Setup

**Iniciar PostgreSQL**:
```bash
podman compose up -d
# ou
docker compose up -d
```

**Verificar Container**:
```bash
podman ps
# Deve mostrar o container pgvector rodando na porta 5432
```

## 🛠️ Desenvolvimento

### 📋 Pré-requisitos
- Node.js 20+
- Docker/Podman
- PostgreSQL com pgvector

### 🔄 Setup Local

1. **Clone e instale**:
```bash
cd server
npm install
```

2. **Configure banco**:
```bash
# Subir PostgreSQL
podman compose up -d

# Executar migrações
npm run db:migrate

# Popular com dados de teste
npm run db:seed
```

3. **Configurar variáveis**:
```bash
cp .env.example .env
# Editar .env conforme necessário
```

4. **Iniciar desenvolvimento**:
```bash
npm run dev
```

### 🧪 Testando a API

**Usando curl**:
```bash
# Health check
curl http://localhost:3333/health

# Listar salas
curl http://localhost:3333/rooms

# Criar sala
curl -X POST http://localhost:3333/rooms \
  -H "Content-Type: application/json" \
  -d '{"name": "Teste", "description": "Sala de teste"}'
```

**Usando o arquivo `client.http`**:
- Abra `client.http` no VS Code
- Use a extensão REST Client para executar requests

## 📊 Performance e Otimizações

### ⚡ Fastify Features
- Serialização JSON otimizada
- Validação de schemas automática
- Plugins modulares
- Logging estruturado

### 🗄️ Banco de Dados
- Conexões em pool
- Prepared statements via Drizzle
- Índices otimizados
- Suporte a transações

### 🔍 Monitoring
- Health check endpoint
- Logs estruturados
- Error handling centralizado

## 🔒 Segurança

### 🛡️ Medidas Implementadas
- Validação de entrada com Zod
- CORS configurado
- Rate limiting (recomendado para produção)
- Sanitização de uploads

### 📝 Recomendações para Produção
- Implementar autenticação/autorização
- Rate limiting por IP
- Logs centralizados
- Monitoring de performance
- Backup automático do banco

---

<div align="center">
  <strong>API robusta e escalável para o NLW Agents</strong><br>
  Construída com Fastify, PostgreSQL e IA ⚡
</div>
