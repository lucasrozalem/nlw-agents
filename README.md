# 🎙️ NLW Agents - Sistema de Transcrição e Q&A com IA

![NLW Agents](https://img.shields.io/badge/NLW-Agents-purple?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-20+-green?style=for-the-badge&logo=node.js)
![React](https://img.shields.io/badge/React-19+-blue?style=for-the-badge&logo=react)

> 🚀 Projeto desenvolvido durante o evento **NLW Agents** da [Rocketseat](https://rocketseat.com.br)

## 📋 Sobre o Projeto

O **NLW Agents** é uma aplicação full-stack que permite criar salas de perguntas e respostas com inteligência artificial. O sistema possui funcionalidades de transcrição de áudio em tempo real, armazenamento de embeddings vetoriais e geração de respostas contextualizadas usando Google Gemini AI.

### ✨ Principais Funcionalidades

- 🏠 **Criação de Salas**: Crie salas temáticas para organizar perguntas
- ❓ **Sistema de Q&A**: Faça perguntas e receba respostas geradas por IA
- 🎤 **Transcrição de Áudio**: Grave áudio e converta automaticamente em texto
- 🧠 **IA Contextualizada**: Respostas baseadas no contexto da sala e áudios transcritos
- 📊 **Embeddings Vetoriais**: Busca semântica usando pgvector
- ⚡ **Tempo Real**: Interface responsiva e atualizada dinamicamente

## 🏗️ Arquitetura do Sistema

```
nlw-agents/
├── 🌐 web/          # Frontend React + Vite
├── ⚙️  server/       # Backend Node.js + Fastify
└── 🐳 docker/       # Configurações do PostgreSQL
```

## 🛠️ Tecnologias Utilizadas

### 🌐 Frontend (Web)
- **Framework**: React 19+ com TypeScript
- **Build Tool**: Vite 7+
- **Roteamento**: React Router DOM v7
- **Gerenciamento de Estado**: TanStack Query (React Query)
- **Formulários**: React Hook Form + Zod
- **Estilização**: TailwindCSS 4+ 
- **Componentes**: Radix UI + Shadcn/ui
- **Ícones**: Lucide React
- **Data/Hora**: Day.js

### ⚙️ Backend (Server)
- **Runtime**: Node.js 20+ com TypeScript nativo
- **Framework**: Fastify 5+
- **Banco de Dados**: PostgreSQL 17 + pgvector
- **ORM**: Drizzle ORM
- **Validação**: Zod
- **IA**: Google Gemini AI
- **Upload**: Fastify Multipart
- **CORS**: Fastify CORS

### 🗄️ Banco de Dados
- **PostgreSQL 17**: Banco principal
- **pgvector**: Extensão para embeddings vetoriais
- **Docker**: Containerização do banco

## � Tutorial Completo: Como Executar o Projeto

Este tutorial irá guiá-lo passo a passo para executar o projeto NLW Agents em sua máquina local.

### 🔧 Passo 1: Preparação do Ambiente

#### 1.1 Verificar Pré-requisitos

Certifique-se de ter instalado:

```bash
# Verificar Node.js (versão 20+)
node --version

# Verificar npm
npm --version

# Verificar Docker ou Podman
docker --version
# ou
podman --version

# Verificar Git
git --version
```

#### 1.2 Clonar o Repositório

```bash
# Clone o projeto
git clone <url-do-repositorio>

# Entre no diretório
cd nlw-agents

# Verifique a estrutura
ls -la
```

### 🗄️ Passo 2: Configurar o Banco de Dados

#### 2.1 Subir o PostgreSQL com Docker

```bash
# Entre no diretório do servidor
cd server

# Suba o container PostgreSQL com pgvector
podman compose up -d
# ou se usar Docker:
# docker compose up -d

# Verifique se o container está rodando
podman ps
# Deve mostrar um container com PostgreSQL na porta 5432
```

#### 2.2 Verificar Conexão com o Banco

```bash
# Teste a conexão
podman exec -it server-nlw-agents-pg-1 psql -U docker -d agents -c "SELECT version();"

# Verifique se a extensão vector foi criada
podman exec -it server-nlw-agents-pg-1 psql -U docker -d agents -c "SELECT extname FROM pg_extension WHERE extname = 'vector';"
```

### ⚙️ Passo 3: Configurar o Backend

#### 3.1 Instalar Dependências

```bash
# Certifique-se de estar no diretório server/
cd server

# Instale as dependências
npm install

# Verifique se não há erros
npm list
```

#### 3.2 Configurar Variáveis de Ambiente

```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o arquivo .env (use seu editor favorito)
# Windows: notepad .env
# Linux/Mac: nano .env ou code .env
```

Conteúdo do `.env`:
```env
PORT=3333
DATABASE_URL=postgresql://docker:docker@localhost:5432/agents
```

#### 3.3 Executar Migrações e Seed

```bash
# Gere as migrações (se necessário)
npm run db:generate

# Execute as migrações
npm run db:migrate

# Popule o banco com dados de exemplo
npm run db:seed
```

#### 3.4 Iniciar o Servidor Backend

```bash
# Inicie em modo desenvolvimento
npm run dev

# Você deve ver algo como:
# Server listening at http://localhost:3333
```

#### 3.5 Testar o Backend

Em outro terminal:
```bash
# Teste o health check
curl http://localhost:3333/health

# Teste a API de salas
curl http://localhost:3333/rooms
```

### 🌐 Passo 4: Configurar o Frontend

#### 4.1 Instalar Dependências

```bash
# Abra um novo terminal e navegue para web/
cd ../web
# ou se estiver na raiz: cd web

# Instale as dependências
npm install

# Verifique se não há erros
npm list
```

#### 4.2 Configurar Variáveis de Ambiente (Opcional)

```bash
# Crie arquivo .env para customizações (opcional)
touch .env
```

Conteúdo opcional do `.env`:
```env
VITE_API_BASE_URL=http://localhost:3333
VITE_APP_NAME="NLW Agents"
```

#### 4.3 Iniciar o Frontend

```bash
# Inicie o servidor de desenvolvimento
npm run dev

# Você deve ver algo como:
# ➜  Local:   http://localhost:5173/
```

### 🎯 Passo 5: Testar a Aplicação

#### 5.1 Acessar a Aplicação

1. **Abra o navegador** em http://localhost:5173
2. **Verifique** se a página carrega corretamente
3. **Teste** criar uma nova sala
4. **Teste** fazer uma pergunta

#### 5.2 Testar Funcionalidades

**Criação de Sala:**
1. Na página inicial, preencha o formulário "Criar sala"
2. Adicione um nome e descrição
3. Clique em "Criar sala"
4. Verifique se a sala aparece na lista

**Sistema de Perguntas:**
1. Clique em "Entrar" em uma das salas
2. Digite uma pergunta no formulário
3. Clique em "Enviar pergunta"
4. Aguarde a resposta da IA aparecer

**Gravação de Áudio:**
1. Na página da sala, clique em "Gravar Áudio"
2. Permita acesso ao microfone quando solicitado
3. Clique em "Gravar áudio"
4. Fale algo e clique em "Pausar gravação"

### 🐛 Passo 6: Solução de Problemas Comuns

#### Backend não inicia
```bash
# Verifique se o PostgreSQL está rodando
podman ps

# Verifique as variáveis de ambiente
cat .env

# Verifique os logs
npm run dev
```

#### Frontend não conecta com Backend
```bash
# Verifique se o backend está rodando
curl http://localhost:3333/health

# Verifique CORS no backend
# O CORS deve estar configurado para http://localhost:5173
```

#### Erro de permissão no PowerShell (Windows)
```powershell
# Execute como administrador
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### Container PostgreSQL não inicia
```bash
# Verifique se a porta 5432 está livre
netstat -an | findstr :5432

# Se houver conflito, pare outros serviços PostgreSQL
# ou mude a porta no docker-compose.yml
```

### 🎉 Passo 7: Pronto para Desenvolver!

Agora você tem:
- ✅ PostgreSQL rodando com pgvector
- ✅ Backend API funcionando na porta 3333
- ✅ Frontend React rodando na porta 5173
- ✅ Banco populado com dados de exemplo
- ✅ Todas as funcionalidades testadas

**URLs importantes:**
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3333
- **Health Check**: http://localhost:3333/health
- **Documentação da API**: Veja `server/client.http`

**Próximos passos:**
- Explore o código fonte
- Teste todas as funcionalidades
- Customize conforme necessário
- Adicione novas features

## �🚀 Como Executar o Projeto (Resumo Rápido)

### 📋 Pré-requisitos

- Node.js 20+ 
- Docker ou Podman
- Git

### 🔧 Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd nlw-agents
```

2. **Configure o banco de dados**
```bash
cd server
podman compose up -d
# ou docker compose up -d
```

3. **Configure as variáveis de ambiente**
```bash
# No diretório server/
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. **Execute as migrações**
```bash
cd server
npm install
npm run db:migrate
npm run db:seed
```

5. **Inicie o backend**
```bash
npm run dev
```

6. **Inicie o frontend**
```bash
cd ../web
npm install
npm run dev
```

### 🌍 Acessando a Aplicação

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3333
- **Health Check**: http://localhost:3333/health

## 📡 API Endpoints

### 🏠 Salas
- `GET /rooms` - Lista todas as salas
- `POST /rooms` - Cria uma nova sala

### ❓ Perguntas
- `GET /rooms/:roomId/questions` - Lista perguntas de uma sala
- `POST /rooms/:roomId/questions` - Cria nova pergunta

### 🎤 Áudio
- `POST /rooms/:roomId/audio` - Upload e transcrição de áudio

## 🗄️ Estrutura do Banco

### 📋 Tabelas Principais

- **rooms**: Armazena informações das salas
- **questions**: Perguntas e respostas geradas por IA
- **audio_chunks**: Transcrições e embeddings dos áudios

### 🔍 Exemplo de Schema

```sql
-- Extensão para vetores
CREATE EXTENSION IF NOT EXISTS vector;

-- Tabela de salas
CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de áudio com embeddings
CREATE TABLE audio_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID REFERENCES rooms(id),
  transcription TEXT NOT NULL,
  embeddings VECTOR(768) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🔧 Troubleshooting Avançado

### 🐳 Problemas com Docker/Podman

**Container não inicia:**
```bash
# Verificar se há conflitos de porta
netstat -an | findstr :5432

# Verificar logs do container
podman logs server-nlw-agents-pg-1

# Recriar container se necessário
podman compose down
podman compose up -d --force-recreate
```

**Extensão vector não encontrada:**
```bash
# Verificar se a extensão foi criada
podman exec -it server-nlw-agents-pg-1 psql -U docker -d agents -c "SELECT extname FROM pg_extension;"

# Criar manualmente se necessário
podman exec -it server-nlw-agents-pg-1 psql -U docker -d agents -c "CREATE EXTENSION IF NOT EXISTS vector;"
```

### ⚙️ Problemas com Backend

**Erro de conexão com banco:**
```bash
# Verificar variáveis de ambiente
cat server/.env

# Testar conexão direta
podman exec -it server-nlw-agents-pg-1 psql -U docker -d agents -c "SELECT 1;"

# Verificar se o banco 'agents' existe
podman exec -it server-nlw-agents-pg-1 psql -U docker -l
```

**Erro nas migrações:**
```bash
# Limpar migrações e recriar
rm -rf server/src/db/migrations/*

# Gerar novas migrações
cd server
npm run db:generate

# Aplicar migrações
npm run db:migrate
```

### 🌐 Problemas com Frontend

**Erro de CORS:**
- Verifique se o backend está configurado para aceitar `http://localhost:5173`
- Verifique se o frontend está fazendo requests para `http://localhost:3333`

**Componentes não carregam:**
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install

# Verificar versões das dependências
npm outdated
```

### 🎤 Problemas com Gravação de Áudio

**Navegador não suporta:**
- Use Chrome, Firefox ou Edge atualizados
- Certifique-se de que está em HTTPS ou localhost

**Permissão de microfone negada:**
- Verifique as configurações do navegador
- Tente recarregar a página e permitir novamente

### 🖥️ Problemas no Windows

**PowerShell não executa scripts:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Comando 'npm' não encontrado:**
- Reinstale Node.js do site oficial
- Verifique se está no PATH do sistema

### 🐧 Problemas no Linux/Mac

**Permissões de arquivo:**
```bash
# Dar permissão de execução se necessário
chmod +x scripts/*

# Verificar proprietário dos arquivos
ls -la
```

**Podman vs Docker:**
```bash
# Se usar Docker em vez de Podman, substitua nos comandos:
docker compose up -d
docker ps
docker exec -it container_name psql...
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🎓 Sobre o NLW

O **Next Level Week (NLW)** é um evento online e gratuito da Rocketseat onde desenvolvedores de todos os níveis se reúnem para construir uma aplicação completa, aprender novas tecnologias e acelerar sua carreira.

### 🔗 Links Úteis

- [Rocketseat](https://rocketseat.com.br)
- [Discord da Rocketseat](https://discord.gg/rocketseat)
- [YouTube da Rocketseat](https://youtube.com/rocketseat)

---

<div align="center">
  Feito com 💜 durante o NLW Agents da <strong>Rocketseat</strong>
</div>
