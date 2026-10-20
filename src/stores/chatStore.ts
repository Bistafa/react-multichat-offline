import { create } from 'zustand'
import type { Conversation } from '../types/conversation'
import type { ChatMessage, MessageRole } from '../types/chat'

type ChatState = {
    conversations: Conversation[]
    activeConversationId: string | null
    sender: MessageRole
    createConversation: () => void
    selectConversation: (id: string) => void
    deleteConversation: (id: string) => void
    addMessage: (text: string) => void
    toggleSender: () => void
}

export const useChatStore = create<ChatState>((set) => ({
    conversations: [],
    activeConversationId: null,
    sender: 'user',
    createConversation: () =>
        set((state) => {
            const conversation: Conversation = {
                id: crypto.randomUUID(),
                messages: [],
            }

            return {
                conversations: [...state.conversations, conversation],
                activeConversationId: conversation.id,
            }
        }),
    selectConversation: (id) =>
        set((state) =>
            state.conversations.some((conversation) => conversation.id === id)
                ? { activeConversationId: id }
                : state,
        ),
    deleteConversation: (id) =>
        set((state) => ({
            conversations: state.conversations.filter(
                (conversation) => conversation.id !== id,
            ),
            activeConversationId:
                state.activeConversationId === id
                    ? null
                    : state.activeConversationId,
        })),
    addMessage: (text) =>
        set((state) => {
            const messageText = text.trim()
            if (!messageText || !state.activeConversationId) return state

            const message: ChatMessage = {
                id: crypto.randomUUID(),
                text: messageText,
                role: state.sender,
            }

            return {
                conversations: state.conversations.map((conversation) =>
                    conversation.id === state.activeConversationId
                        ? {
                              ...conversation,
                              messages: [...conversation.messages, message],
                          }
                        : conversation,
                ),
            }
        }),
    toggleSender: () =>
        set((state) => ({
            sender: state.sender === 'user' ? 'bot' : 'user',
        })),
}))
