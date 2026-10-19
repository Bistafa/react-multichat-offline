# PRD: Múltiplas conversas

## 1. Visão geral

Evoluir o chat offline de uma única conversa para múltiplas conversas independentes, permitindo criar e alternar entre elas sem perder suas mensagens durante a sessão atual.

## 2. Contexto

Hoje, o aplicativo mantém uma única lista de mensagens em estado React local. Ao abrir o site, essa conversa começa com uma mensagem de boas-vindas. O histórico não é persistido após recarregar a página.

Este recurso adiciona uma lista de conversas e uma conversa ativa. O gerenciamento do estado compartilhado entre a interface deve usar Zustand, com a store em `src/stores`.

## 3. Objetivos

- Permitir criar várias conversas independentes.
- Permitir alternar entre conversas sem misturar seus históricos.
- Manter a experiência atual de enviar mensagens como usuário ou robô.
- Oferecer acesso às conversas em um sidebar responsivo.
- Manter o comportamento offline e sem persistência do histórico.

## 4. Fora de escopo

- Persistir conversas após recarregar ou fechar o site.
- Sincronizar conversas entre dispositivos ou com um servidor.
- Renomear ou excluir conversas.
- Integrar um modelo de IA ou automatizar respostas do robô.

## 5. Requisitos funcionais

### RF-1 — Estado inicial sem conversa ativa

- Ao abrir ou recarregar o site, nenhuma conversa estará ativa e não haverá conversas carregadas.
- A interface deve apresentar um estado vazio que oriente a criação de uma conversa.
- O compositor de mensagens deve continuar visível, mas desabilitado enquanto não houver conversa ativa. O card deve ter 50% de opacidade e nenhum controle deve executar ações.

### RF-2 — Criar conversa

- O sidebar deve oferecer uma ação para criar uma conversa.
- A nova conversa deve receber um UUID gerado com `crypto.randomUUID()`.
- Ao ser criada, a conversa deve se tornar imediatamente a conversa ativa.
- Uma nova conversa deve começar com a mensagem de boas-vindas atual: “Olá! Sua conversa offline começa aqui.”, com o papel `bot`.
- O identificador da conversa deve ser exibido no sidebar.

### RF-3 — Histórico independente

- Cada conversa deve ter seu próprio histórico de mensagens, mantendo todos os campos do tipo `ChatMessage` (`id`, `text` e `role`).
- Enviar uma mensagem deve adicioná-la apenas ao histórico da conversa ativa.
- Alternar entre conversas deve exibir o histórico correspondente sem alterar os demais.
- As mensagens continuam identificadas individualmente por UUID.

### RF-4 — Alternar entre conversas

- Selecionar uma conversa no sidebar deve torná-la ativa e exibir seu histórico.
- A conversa ativa deve ter um indicador visual claro no sidebar.
- A lista deve ser ordenada por uso recente: a conversa criada, ativada ou que recebeu uma mensagem mais recentemente aparece primeiro.

### RF-5 — Rascunho e remetente por conversa

- O texto ainda não enviado deve ser preservado separadamente para cada conversa.
- A seleção do remetente (`Usuário` ou `Robô`) também deve ser preservada separadamente por conversa.
- Ao voltar a uma conversa, o compositor deve restaurar seu rascunho e remetente.
- Uma conversa recém-criada começa sem rascunho e com o remetente `Usuário`.

### RF-6 — Sidebar responsivo

- Em telas maiores, o sidebar deve ficar à esquerda da área de conversa.
- Em dispositivos móveis, o sidebar deve poder ser recolhido e aberto por um botão de menu hambúrguer no canto superior esquerdo.
- No celular, selecionar uma conversa não deve fechar automaticamente o sidebar.
- A lista do sidebar deve identificar cada conversa pelo próprio UUID.

### RF-7 — Compositor sem conversa ativa

- Quando não houver conversa ativa, o campo de texto, o toggle de remetente e o botão de envio devem estar desabilitados.
- Os controles desabilitados não devem permitir edição, alternância ou envio.
- O estado visual deve comunicar a indisponibilidade com 50% de opacidade.

## 6. Requisitos técnicos

- Usar Zustand para o estado compartilhado de conversas e conversa ativa.
- Criar a store em `src/stores`.
- A store deve manter, por conversa, o UUID, o histórico de `ChatMessage`, o rascunho, o remetente selecionado e os dados necessários para ordenar por uso recente.
- A store deve manter o ID da conversa ativa; sem conversas no estado inicial, esse valor deve indicar que não há conversa ativa.
- Não habilitar persistência da store em `localStorage`, `sessionStorage` ou outro meio durável.
- Manter os tipos de domínio em `src/types`, usando `type` em vez de `interface`, conforme o padrão do projeto.

## 7. Fluxo principal

1. A pessoa abre o site e vê o estado vazio, sem conversa ativa.
2. A pessoa cria uma conversa.
3. O aplicativo gera um UUID, cria o histórico com a mensagem de boas-vindas e ativa a conversa.
4. A pessoa envia mensagens como usuário ou robô; elas são adicionadas ao histórico ativo.
5. A pessoa cria outras conversas ou seleciona uma conversa existente no sidebar.
6. Ao alternar, o aplicativo restaura o histórico, rascunho e remetente daquela conversa.
7. Ao recarregar o site, o estado volta ao início sem conversas, conforme a regra atual de não persistência.

## 8. Critérios de aceite

- [ ] Ao iniciar ou recarregar o aplicativo, não há conversa ativa e nenhum histórico anterior é restaurado.
- [ ] O estado vazio orienta a criação de uma conversa e o compositor aparece desabilitado com 50% de opacidade.
- [ ] Criar uma conversa gera um UUID, ativa a conversa e mostra a mensagem de boas-vindas com papel `bot`.
- [ ] Cada conversa aparece no sidebar identificada pelo seu UUID.
- [ ] A conversa mais recentemente criada, ativada ou atualizada por envio de mensagem aparece primeiro.
- [ ] Mensagens enviadas aparecem somente no histórico da conversa ativa e mantêm os campos `id`, `text` e `role`.
- [ ] Ao alternar entre conversas, o histórico, o rascunho e o remetente de cada uma são restaurados sem contaminação entre conversas.
- [ ] Uma conversa nova inicia com rascunho vazio e remetente `Usuário`.
- [ ] Em telas grandes, o sidebar fica à esquerda; em telas móveis, pode ser aberto e recolhido pelo botão hambúrguer.
- [ ] No celular, selecionar uma conversa não fecha o sidebar.
- [ ] Sem conversa ativa, o campo de mensagem, toggle e envio não aceitam interação.

## 9. Decisões confirmadas

- O histórico continua sem persistência.
- Conversas novas incluem a mensagem de boas-vindas existente.
- IDs de conversa são UUIDs.
- O sidebar ordena por uso recente, com o item mais recente primeiro.
- Rascunho e remetente são independentes por conversa e preservados ao alternar.
- O sidebar móvel permanece aberto após a seleção de uma conversa.
