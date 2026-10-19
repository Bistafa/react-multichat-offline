## feature: single-chat to multi_chat

preciso transformar o chat de conversa única para multiplas conversas.


### Aspectos técnicos
Vamos usar a biblioteca zustand para genrenciamento de estado

-Store na biblioteca zustand armazenando duas informações:
    -historico de conversa individualmente (com todas as informações do type Message)
    -qual chat está ativo (com um ID)

A store do zustand deve ficar em src/stores.

### fluxo de informações 
Ao abrir o site, nao estará em nenhuma conversa (empty state)



### Aspectos visuais

no sidebar teremos a lista das conversas e um botao para criar uma nova conversa

A indentificaçao do chat no sidebar é exibindo o proprio ID dele

Sidebar do lado esquerdo, sendo retratil no celular(botao hamburguer no canto superior esquerdo) 

O input fica desabilitado quando nao ha conversas ativas(opacidade 50% e botoes nao funcionam)
