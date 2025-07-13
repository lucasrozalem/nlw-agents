# 🌐 Frontend - NLW Agents

> Interface moderna e responsiva para o sistema de Q&A com IA

## 📋 Sobre

Este é o frontend do projeto NLW Agents, uma aplicação React moderna que oferece uma interface intuitiva para interação com o sistema de perguntas e respostas alimentado por inteligência artificial.

## 🛠️ Tecnologias

### ⚛️ Core
- **React 19+**: Biblioteca principal com hooks modernos
- **TypeScript**: Tipagem estática para maior segurança
- **Vite 7+**: Build tool ultra-rápida com HMR

### 🎨 Interface & Estilização
- **TailwindCSS 4+**: Framework CSS utility-first
- **Radix UI**: Componentes acessíveis e sem estilo
- **Shadcn/ui**: Sistema de design components
- **Lucide React**: Biblioteca de ícones moderna
- **Class Variance Authority**: Gerenciamento de variantes de componentes

### 🔄 Gerenciamento de Estado
- **TanStack Query v5**: Gerenciamento de estado servidor
- **React Hook Form**: Formulários performáticos
- **Zod**: Validação de schemas TypeScript-first

### 🧭 Roteamento & Navegação
- **React Router DOM v7**: Roteamento declarativo
- **Day.js**: Manipulação de datas leve

## 🏗️ Estrutura do Projeto

```
web/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── ui/             # Componentes base (Shadcn/ui)
│   │   ├── create-room-form.tsx
│   │   ├── question-form.tsx
│   │   ├── question-list.tsx
│   │   └── ...
│   ├── pages/              # Páginas da aplicação
│   │   ├── create-room.tsx
│   │   ├── room.tsx
│   │   └── record-room-audio.tsx
│   ├── https/              # Hooks de API
│   │   ├── types/          # Tipos TypeScript
│   │   ├── use-rooms.ts
│   │   ├── use-create-room.ts
│   │   └── ...
│   ├── lib/                # Utilitários
│   │   ├── utils.ts        # Helpers gerais
│   │   └── dayjs.ts        # Configuração do Day.js
│   ├── app.tsx             # Componente raiz
│   ├── main.tsx            # Entry point
│   └── index.css           # Estilos globais
├── public/                 # Arquivos estáticos
├── package.json
├── vite.config.ts         # Configuração do Vite
└── tailwind.config.js     # Configuração do Tailwind
```

## 🎯 Funcionalidades

### 🏠 Gerenciamento de Salas
- ✅ Listagem de salas recentes
- ✅ Criação de novas salas
- ✅ Navegação entre salas
- ✅ Contadores de perguntas por sala

### ❓ Sistema de Perguntas
- ✅ Formulário de criação de perguntas
- ✅ Listagem de perguntas e respostas
- ✅ Estados de carregamento para respostas da IA
- ✅ Timestamps relativos (ex: "2 minutos atrás")

### 🎤 Gravação de Áudio
- ✅ Interface de gravação em tempo real
- ✅ Detecção de suporte do navegador
- ✅ Upload automático de chunks de áudio
- ✅ Feedback visual do estado de gravação

### 🎨 Interface
- ✅ Design system consistente
- ✅ Tema escuro por padrão
- ✅ Componentes acessíveis
- ✅ Layout responsivo
- ✅ Animações suaves

## 🚀 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Gera build de produção
npm run preview      # Preview do build local

# Tipo checking
tsc -b              # Verificação de tipos TypeScript
```

## 🔧 Configuração

### 📄 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3333

# Application
VITE_APP_NAME="Let me Ask"
VITE_APP_VERSION="1.0.0"
```

### ⚙️ Configurações Principais

**Vite** (`vite.config.ts`):
```typescript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

**TailwindCSS** - Usando a nova versão 4+ com configuração inline no CSS.

## 🎨 Sistema de Design

### 🎭 Componentes Base
- **Button**: Variantes (default, outline, ghost, etc.)
- **Card**: Layout para containers
- **Form**: Formulários com validação
- **Input/Textarea**: Campos de entrada
- **Badge**: Labels e tags

### 🌈 Tema
- **Cores**: Sistema baseado em variáveis CSS
- **Tipografia**: Escalas responsivas
- **Espaçamento**: Grid system consistente
- **Bordas**: Radius configurável

## 📱 API Integration

### 🔌 Hooks Customizados

**Salas**:
```typescript
const { data: rooms } = useRooms()
const { mutateAsync: createRoom } = useCreateRoom()
```

**Perguntas**:
```typescript
const { data: questions } = useRoomQuestions(roomId)
const { mutateAsync: createQuestion } = useCreateQuestion(roomId)
```

### 📊 Gerenciamento de Cache
- Cache automático com TanStack Query
- Invalidação inteligente de queries
- Estados de loading/error consistentes

## 🎤 Gravação de Áudio

### 🎯 Funcionalidades
- Gravação em chunks de 5 segundos
- Upload automático para o backend
- Suporte para `audio/webm`
- Configurações otimizadas:
  - Echo cancellation
  - Noise suppression
  - Sample rate: 44.1kHz
  - Bitrate: 64kbps

### 🔧 Implementação
```typescript
const recorder = new MediaRecorder(stream, {
  mimeType: 'audio/webm',
  audioBitsPerSecond: 64_000,
})
```

## 🧪 Desenvolvimento

### 📋 Requisitos
- Node.js 20+
- npm ou yarn
- Browser moderno com suporte a:
  - MediaRecorder API
  - getUserMedia API
  - ES2022+ features

### 🔄 Fluxo de Desenvolvimento
1. Clone o repositório
2. Instale as dependências: `npm install`
3. Configure o `.env`
4. Inicie o desenvolvimento: `npm run dev`
5. Acesse: http://localhost:5173

---

<div align="center">
  <strong>Frontend moderno para o NLW Agents</strong><br>
  Feito com React, TypeScript e muito ☕
</div>
