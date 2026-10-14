# PRD - Chat Offline

## 1. Visao geral

O Chat Offline e uma interface de conversa local, executada inteiramente no navegador, que permite registrar mensagens manualmente como `usuario` ou `robo`. O remetente da proxima mensagem e escolhido por um controle visual no card de composicao.

O produto nao se conecta a uma API, nao gera respostas automaticamente e nao persiste o historico. Seu objetivo e oferecer uma experiencia simples para simular uma conversa entre os dois papeis.

## 2. Objetivo

Entregar uma janela unica de chat, responsiva e mobile first, na qual o usuario consiga:

- visualizar uma mensagem inicial;
- escrever uma mensagem;
- alternar o remetente entre usuario e robo;
- enviar a mensagem manualmente;
- distinguir visualmente mensagens de usuario e robo;
- continuar a conversa enquanto a pagina estiver aberta.

## 3. Escopo

### Incluido

- Interface de chat em uma unica tela.
- Mensagem inicial exibida no historico.
- Historico mantido somente em estado React.
- Composicao de mensagens com altura ajustavel ao conteudo.
- Alternancia visual entre os remetentes `usuario` e `robo`.
- Envio por botao.
- Botao de envio desabilitado quando nao houver mensagem valida para enviar.
- Indicacao visual de que o modo robo esta ativo.
- Layout responsivo com estrategia mobile first.
- Implementacao em Vite, React, TypeScript e Tailwind CSS.

### Fora do escopo

- Respostas automaticas ou integracao com inteligencia artificial.
- Backend, autenticacao ou sincronizacao entre dispositivos.
- `localStorage`, IndexedDB ou qualquer outra persistencia.
- Edicao, exclusao ou limpeza individual de mensagens.
- Multiplas conversas, abas ou navegacao entre telas.
- Upload de arquivos, anexos, emojis ou formatacao rica.
- Streaming, notificacoes ou atualizacao em tempo real.

## 4. Publico e contexto de uso

O usuario precisa testar ou simular uma conversa local, controlando manualmente os dois lados do dialogo. A interacao deve ser compreensivel sem configuracao previa e funcionar principalmente em telas pequenas, sem perder conforto em telas maiores.

## 5. Requisitos funcionais

### RF01 - Exibir a tela de chat

A aplicacao deve renderizar uma unica tela com:

- area de historico;
- card de composicao fixado visualmente na parte inferior da janela;
- controle de remetente;
- campo de mensagem;
- botao de envio.

### RF02 - Exibir mensagem inicial

Ao abrir a aplicacao, o historico deve conter uma mensagem inicial de boas-vindas. Essa mensagem deve seguir o mesmo modelo de dados das demais mensagens e possuir um remetente definido.

O texto exato da mensagem pode ser escolhido durante a implementacao, desde que seja curto, claro e coerente com o produto.

### RF03 - Escrever mensagem

O usuario deve conseguir inserir texto no campo de composicao. O campo deve aceitar mensagens com mais de uma linha e expandir sua altura conforme o conteudo, respeitando limites praticos de layout.

### RF04 - Alternar remetente

O controle visual localizado no lado esquerdo do card deve alternar o remetente da proxima mensagem entre `usuario` e `robo`.

O controle nao precisa ser um componente textual complexo, mas deve deixar perceptivel qual modo esta selecionado por meio de estado visual, acessibilidade e, quando aplicavel, tooltip ou nome acessivel.

### RF05 - Indicar modo robo

Quando o remetente selecionado for `robo`, o card de composicao deve receber uma borda roxa. Quando o remetente for `usuario`, deve voltar ao estilo padrao.

### RF06 - Enviar mensagem

Ao acionar o botao de envio com uma mensagem valida:

1. Uma nova mensagem deve ser adicionada ao final do historico.
2. A mensagem deve registrar o texto e o remetente atualmente selecionado.
3. O campo deve ser limpo.
4. O foco deve continuar em uma posicao utilizavel para a proxima mensagem.

Mensagens compostas apenas por espacos devem ser consideradas vazias e nao podem ser enviadas.

### RF07 - Exibir historico

As mensagens devem ser exibidas em ordem cronologica, com diferenciacao visual entre usuario e robo. O historico deve continuar utilizavel quando houver muitas mensagens e nao pode ficar escondido atras do card inferior.

### RF08 - Manter estado apenas durante a sessao

O historico deve ser armazenado em estado React, sem persistencia. Ao recarregar a pagina, a aplicacao deve voltar ao estado inicial, contendo somente a mensagem de boas-vindas.

## 6. Requisitos nao funcionais

### RNF01 - Responsividade

O layout deve ser desenvolvido mobile first e funcionar em celulares, tablets e desktops. Em telas maiores, o conteudo do chat deve ter largura maxima `2xl` e permanecer centralizado.

### RNF02 - Usabilidade

- O botao de envio deve apresentar estado desabilitado quando nao houver mensagem valida.
- Todos os controles devem ser operaveis por teclado.
- O campo deve possuir nome ou rotulo acessivel.
- O estado `usuario`/`robo` deve ser identificavel por tecnologia assistiva, mesmo que a indicacao visual seja compacta.
- O historico deve manter contraste suficiente entre texto, fundo e estados do remetente.

### RNF03 - Aparencia

- O fundo geral deve ser marrom bem claro.
- O card de composicao deve ter fundo branco.
- O card deve permanecer na parte inferior da janela durante o uso.
- O modo robo deve usar uma borda roxa como sinal de estado.
- O historico e o campo de composicao devem compartilhar a mesma largura maxima.
- A interface deve evitar deslocamentos bruscos quando o campo crescer ou quando novas mensagens forem adicionadas.

### RNF04 - Tecnologia e organizacao

- Usar Vite, React, TypeScript e Tailwind CSS ja presentes no projeto.
- Declarar os tipos em `src/types` usando `type`, nunca `interface`.
- Manter os componentes em `src/components`.
- Manter o estado e as regras de envio no componente de tela ou em uma composicao local apropriada, sem introduzir gerenciamento global.

## 7. Modelo de dados

O historico deve ser representado por um tipo semelhante a:

```ts
type MessageRole = 'user' | 'bot'

type ChatMessage = {
  id: string
  text: string
  role: MessageRole
}
```

Os nomes podem seguir a convencao escolhida no projeto, mas o modelo precisa separar explicitamente o texto do papel do remetente. O `id` deve ser estavel durante a renderizacao da lista.

## 8. Estrutura sugerida

Uma organizacao minima esperada:

```text
src/
  components/
    ChatHistory.tsx
    MessageBubble.tsx
    MessageComposer.tsx
    RoleToggle.tsx
  types/
    chat.ts
  App.tsx
  index.css
```

A separacao pode ser ajustada se um componente ficar pequeno demais, mas os limites devem preservar responsabilidades claras:

- `ChatHistory`: renderiza a lista e trata o estado vazio caso ele seja necessario.
- `MessageBubble`: apresenta uma mensagem conforme seu papel.
- `MessageComposer`: controla campo, toggle e envio visual.
- `RoleToggle`: encapsula a alternancia do remetente e seu estado acessivel.
- `App`: coordena o estado do historico e o fluxo de envio.

## 9. Criterios de aceite

- Ao abrir a aplicacao, uma mensagem inicial aparece no historico.
- O usuario consegue digitar uma mensagem de uma ou varias linhas.
- O envio fica desabilitado para campo vazio ou composto somente por espacos.
- Ao enviar como usuario, a mensagem aparece identificada como usuario.
- Ao alternar para robo, o card recebe borda roxa e a proxima mensagem e registrada como robo.
- A mensagem enviada aparece no final do historico e o campo e limpo.
- O historico nao e salvo apos recarregar a pagina.
- O card de composicao permanece na parte inferior sem cobrir as mensagens.
- Em viewport mobile, nenhum controle ou texto essencial fica cortado ou sobreposto.
- Em viewport desktop, o chat fica centralizado e respeita largura maxima `2xl`.
- A aplicacao passa em `npm run build` e `npm run lint`.

## 10. Plano de implementacao progressivo

As tarefas abaixo devem ser executadas na ordem indicada. Cada etapa deve deixar a aplicacao em um estado verificavel antes do inicio da proxima.

### Tarefa 1: Confirmar a base do projeto

- [x] Verificar o funcionamento do Vite e dos scripts existentes.
- [x] Confirmar que Tailwind CSS esta carregado pelo `src/index.css`.
- [x] Manter o estado inicial vazio de `App.tsx` ate que a primeira estrutura de tela esteja pronta.

**Resultado:** a base tecnica esta executavel e pronta para receber a interface.

### Tarefa 2: Criar os tipos do dominio

- [x] Criar `src/types` caso ainda nao exista.
- [x] Definir o tipo do papel do remetente.
- [x] Definir o tipo de mensagem com identificador, texto e remetente.
- [x] Usar somente declaracoes `type`.

**Resultado:** o contrato de dados do chat esta centralizado e tipado. [x]

### Tarefa 3: Montar a estrutura responsiva da tela

- [x] Criar o container principal da aplicacao.
- [x] Aplicar fundo marrom claro e layout mobile first.
- [x] Criar a area centralizada com largura maxima `2xl` para historico e composicao.
- [x] Reservar espaco suficiente para que o card inferior nao cubra o historico.

- [x] **Resultado:** a tela possui a geometria principal, ainda sem o fluxo completo de mensagens.

### Tarefa 4: Implementar a apresentacao do historico

- [x] Criar os componentes de historico e bolha de mensagem.
- [x] Renderizar a mensagem inicial.
- [x] Diferenciar visualmente usuario e robo por alinhamento, cor ou tratamento de bolha.
- [x] Garantir lista rolavel e leitura adequada em telas pequenas.

**[x] Resultado:** o usuario consegue visualizar uma conversa inicial e distinguir seus remetentes.

### Tarefa 5: Implementar o controle de remetente

- [x] Criar o toggle visual com os estados usuario e robo.
- [x] Manter o remetente selecionado em estado local ou no estado coordenador de `App`.
- [x] Adicionar nome acessivel e suporte a teclado.
- [x] Aplicar borda roxa ao card quando o modo robo estiver ativo.

**[x] Resultado:** o modo da proxima mensagem pode ser alterado e e visualmente evidente.

### Tarefa 6: Implementar a composicao e o envio

- [x] Criar o campo multiline e o botao de envio.
- [x] Controlar o texto digitado.
- [x] Desabilitar o envio para valor vazio ou composto somente por espacos.
- [x] Ao enviar, adicionar uma mensagem ao estado do historico com o remetente atual.
- [x] Limpar o campo depois do envio.
- [x] Preservar uma interacao confortavel apos o envio, incluindo foco quando apropriado.

**[x] Resultado:** o fluxo principal de conversa funciona para os dois remetentes.

### Tarefa 7: Ajustar o comportamento de viewport

- [x] Testar a composicao em celulares estreitos, tablets e desktop.
- [x] Confirmar que o card fica no inferior sem sobrepor o historico.
- [x] Ajustar crescimento do campo multiline e limites de altura.
- [x] Confirmar que a largura maxima e o alinhamento central funcionam em telas grandes.

**[x] Resultado:** a experiencia permanece utilizavel nos tamanhos de tela definidos.

### Tarefa 8: Refinar acessibilidade e estados visuais

- [x] Revisar foco visivel, ordem de tabulacao e nomes acessiveis.
- [x] Revisar contraste de texto, fundo, bordas e estado desabilitado.
- [x] Confirmar que o estado do remetente nao depende somente da cor.
- [x] Garantir que o botao de envio comunique corretamente seu estado.

**[x] Resultado:** a interface e compreensivel e operavel sem depender exclusivamente de percepcao visual ou mouse.

### Tarefa 9: Validar o comportamento completo

- Executar `npm run lint`.
- Executar `npm run build`.
- Verificar manualmente o fluxo de mensagem inicial, envio como usuario, alternancia para robo e envio como robo.
- Recarregar a pagina e confirmar que o historico nao foi persistido.
- Validar a experiencia em viewport mobile e desktop.

**Resultado:** o MVP atende aos criterios de aceite e esta pronto para entrega.

## 11. Riscos e decisoes

- **Card inferior cobrindo mensagens:** reservar espaco no layout e validar com historico longo.
- **Campo multiline alterando a composicao:** aplicar altura minima, limite de crescimento e rolagem interna quando necessario.
- **Toggle pouco claro:** combinar diferenca de estado, nome acessivel e indicacao textual curta ou tooltip.
- **Perda intencional do historico:** nao adicionar mecanismos de persistencia mesmo que o navegador ofereca essa possibilidade.
- **Escopo de robo:** tratar `robo` como papel de autoria manual, sem comportamento autonomo.

## 12. Definicao de pronto

O projeto esta pronto quando a aplicacao implementa o fluxo descrito, atende aos criterios de aceite, funciona em mobile e desktop, segue a organizacao de tipos e componentes definida, e conclui sem erros os comandos `npm run lint` e `npm run build`.