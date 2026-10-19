# proejto: chat offline

projeto de uma janela unica de chat em que  eu consigo enviar mensagens como usuario e como robo (atraves de um toggle no iinput de mensagem )


# aspectos tecnicos

projeto feito em vite + react + typescript + tailwind
todos os types sao salvos na pasta  src/types (usando type e nao interface)
todos os componentes salvos na pasta src/components
o historico do chat deve estar em um state sem persistencia






# aspectos visuais

a tela vai ter um fundo marrom bem claro

todo o chat (incluindo historico de mensagens e input) terao uma largura maxima(2xl), centralizado em tela maior

o input sera em um card com fundo branco e altura ajustada conforme a mensagem

o card ficara no canto inferior o tempo inteiro

dentro do card do input, do lado direito:
- botao de enviar, que fica desaabilitado quanto nao tiver mensagem digitada

dentro do card do input, do lado esquerdo:
- um botao que servira como toggle para marcar se a mensagem enviada sera via usuario (e fica do lado direito do historico)
- quando o toggle estiver ativado(robo) o card do input tera uma borda roxa, indicando visualmente que a mensagem enviada sera como robo e nao usuario.


