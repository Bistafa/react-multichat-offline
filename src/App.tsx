import { useState } from 'react'
import ChatHistory from './components/ChatHistory'
import MessageComposer from './components/MessageComposer'
import type { ChatMessage, MessageRole } from './types/chat'

const initialMessages: ChatMessage[] = [
  {
    id: 'welcome',
    text: 'Olá! Sua conversa offline começa aqui.',
    role: 'bot',
  },
]

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [role, setRole] = useState<MessageRole>('user')

  function handleSend(text: string) {
    setMessages((currentMessages) => [
      ...currentMessages,
      { id: crypto.randomUUID(), text, role },
    ])
  }

  return (
    <main className="min-h-dvh bg-[#f3eee8]">
      <div className="mx-auto flex h-dvh w-full max-w-2xl flex-col">
        <ChatHistory messages={messages} />
        <MessageComposer
          role={role}
          onRoleChange={setRole}
          onSend={handleSend}
        />
      </div>
    </main>
  )
}