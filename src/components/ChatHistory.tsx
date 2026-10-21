import MessageBubble from './MessageBubble'
import type { ChatMessage } from '../types/chat'

type ChatHistoryProps = {
    messages: ChatMessage[]
    emptyMessage: string
}

export default function ChatHistory({
    messages,
    emptyMessage,
}: ChatHistoryProps) {
    return (
        <section
            aria-label="Histórico da conversa"
            aria-live="polite"
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-6"
            role="log"
        >
            <div className="mx-auto flex h-full w-full flex-col gap-4">
                {messages.length === 0 ? (
                    <p className="my-auto text-center text-sm text-stone-500">
                      {emptyMessage}
                    </p>
                ) : (
                    messages.map((message) => (
                      <MessageBubble key={message.id} message={message} />
                    ))
                )}
            </div>
        </section>
    )
}