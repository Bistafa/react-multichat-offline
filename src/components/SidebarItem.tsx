import { useChatStore } from '../stores/chatStore'

type SidebarItemProps = {
    conversationId: string
    isActive: boolean
}

export default function SidebarItem({
    conversationId,
    isActive,
}: SidebarItemProps) {
    const selectConversation = useChatStore(
        (state) => state.selectConversation,
    )
    const deleteConversation = useChatStore(
        (state) => state.deleteConversation,
    )

    return (
        <li className="flex min-w-0 items-center gap-1">
            <button
                aria-current={isActive ? 'page' : undefined}
                className={`min-h-11 min-w-0 flex-1 truncate rounded-lg px-3 text-left text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-violet-600 ${
                    isActive
                        ? 'bg-stone-200 font-semibold text-stone-900'
                        : 'text-stone-700 hover:bg-stone-200'
                }`}
                onClick={() => selectConversation(conversationId)}
                title={conversationId}
                type="button"
            >
                {conversationId}
            </button>
            <button
                aria-label={`Excluir conversa ${conversationId}`}
                className="grid size-10 shrink-0 place-items-center rounded-lg text-stone-500 outline-none transition-colors hover:bg-red-100 hover:text-red-700 focus-visible:ring-2 focus-visible:ring-red-600"
                onClick={() => deleteConversation(conversationId)}
                title="Excluir conversa"
                type="button"
            >
                <svg
                    aria-hidden="true"
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.8"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 7h16m-10 4v6m4-6v6M5 7l1 13h12l1-13M9 7V4h6v3"
                    />
                </svg>
            </button>
        </li>
    )
}
