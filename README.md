# Chat Offline

Uma interface local para simular uma conversa entre usuario e robo. As mensagens sao adicionadas manualmente e ficam apenas na memoria da pagina: nao ha conexao com API, respostas automaticas ou persistencia.

## Requisitos

- Node.js compativel com Vite 8
- npm

## Comecar

Instale as dependencias e inicie o servidor de desenvolvimento:

```bash
npm install
npm run dev
```

O Vite mostrara no terminal o endereco local para abrir no navegador.

## Uso

- Digite uma mensagem no campo na parte inferior da tela.
- Escolha se a proxima mensagem sera enviada como usuario ou robo.
- Envie pelo botao ou pela tecla Enter; use Shift+Enter para inserir uma nova linha.
- O historico permanece disponivel enquanto a pagina estiver aberta. Ao recarrega-la, a conversa volta a mensagem inicial.

## Scripts

| Comando | Descricao |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento do Vite. |
| `npm run build` | Executa a verificacao TypeScript e gera a versao de producao em `dist/`. |
| `npm run lint` | Analisa o codigo com Oxlint. |
| `npm run preview` | Serve localmente a versao gerada para inspecao. |

## Tecnologias

- React 19
- TypeScript
- Vite 8
- Tailwind CSS 4

## Estrutura

```text
src/
  components/  Componentes da conversa e do campo de composicao
  types/       Tipos das mensagens e dos remetentes
  App.tsx      Estado e fluxo principal do chat
  index.css    Estilos globais
```