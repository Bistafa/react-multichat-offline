import ChatHistory from './components/ChatHistory'
import MessageComposer from './components/MessageComposer'
import Sidebar from './components/Sidebar'
import { useChatStore } from './stores/chatStore'

export default function App() {
  const conversations = useChatStore((state) => state.conversations)
  const activeConversationId = useChatStore(
    (state) => state.activeConversationId,
  )
  const activeConversation = conversations.find(
    (conversation) => conversation.id === activeConversationId,
  )

  return (
    <main className="flex min-h-dvh bg-[#f3eee8]">
      <Sidebar />
      <section className="flex min-w-0 flex-1 justify-center">
        <div className="flex h-dvh w-full max-w-2xl flex-col">
          <ChatHistory
            emptyMessage={
              activeConversation
                ? 'Nenhuma mensagem ainda. Envie a primeira!'
                : 'Crie ou selecione uma conversa'
            }
            messages={activeConversation?.messages ?? []}
          />
          <MessageComposer disabled={!activeConversation} />
        </div>
      </section>
    </main>
  )
}