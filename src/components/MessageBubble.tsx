import type { ChatMessage } from '../types/chat'

type MessageBubbleProps = {
    message: ChatMessage
}

export default function MessageBubble({ message }: MessageBubbleProps) {
    const isUser = message.role === 'user'

    return (
        <article
            aria-label={`Mensagem de ${isUser ? 'usuário' : 'robô'}`}
            className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
        >
            <p
                className={`max-w-[85%] break-words rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[75%] ${isUser
                        ? 'rounded-br-md bg-stone-800 text-white'
                        : 'rounded-bl-md border border-stone-200 bg-white text-stone-800'
                    }`}
            >
                {message.text}
            </p>
        </article>
    )
}