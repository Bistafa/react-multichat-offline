export type MessageRole = 'user' | 'bot'

export type ChatMessage = {
    id: string
    text: string
    role: MessageRole
}