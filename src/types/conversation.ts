import type { ChatMessage } from './chat'

export type Conversation = {
    id: string
    messages: ChatMessage[]
}
