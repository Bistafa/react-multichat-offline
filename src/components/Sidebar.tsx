import { useChatStore } from '../stores/chatStore'
import SidebarItem from './SidebarItem'

export default function Sidebar() {
    const conversations = useChatStore((state) => state.conversations)
    const activeConversationId = useChatStore(
        (state) => state.activeConversationId,
    )
    const createConversation = useChatStore(
        (state) => state.createConversation,
    )

    return (
        <aside
            aria-label="Conversas"
            className="flex h-dvh w-64 shrink-0 flex-col border-r border-stone-200 bg-stone-100"
        >
            <div className="p-4">
                <button
                    className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-violet-700 px-4 text-sm font-semibold text-white outline-none hover:bg-violet-800 focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2"
                    onClick={createConversation}
                    type="button"
                >
                    <svg
                        aria-hidden="true"
                        className="size-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            d="M12 5v14m-7-7h14"
                        />
                    </svg>
                    Nova conversa
                </button>
            </div>
            <nav
                aria-label="Lista de conversas"
                className="min-h-0 flex-1 overflow-y-auto px-3 pb-4"
            >
                <ul className="grid gap-1">
                    {conversations.map((conversation) => (
                        <SidebarItem
                            key={conversation.id}
                            conversationId={conversation.id}
                            isActive={conversation.id === activeConversationId}
                        />
                    ))}
                </ul>
            </nav>
        </aside>
    )
}
