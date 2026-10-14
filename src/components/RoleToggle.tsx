import type { MessageRole } from '../types/chat'

type RoleToggleProps = {
    role: MessageRole
    onRoleChange: (role: MessageRole) => void
}

export default function RoleToggle({ role, onRoleChange }: RoleToggleProps) {
    const isBot = role === 'bot'

    function toggleRole() {
        onRoleChange(isBot ? 'user' : 'bot')
    }

    return (
        <button
            aria-label={`Remetente da próxima mensagem: ${isBot ? 'robô' : 'usuário'}. Alternar para ${isBot ? 'usuário' : 'robô'}`}
            aria-pressed={isBot}
            className="inline-flex min-h-11 items-center gap-3 rounded-lg text-left outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
            onClick={toggleRole}
            title={`Alternar para ${isBot ? 'usuário' : 'robô'}`}
            type="button"
        >
            <span
                aria-hidden="true"
                className={`grid size-10 shrink-0 place-items-center rounded-full text-sm font-semibold ${isBot ? 'bg-violet-100 text-violet-800' : 'bg-stone-100 text-stone-700'
                    }`}
            >
                {isBot ? (
                    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m-5 3h10a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z" />
                        <path strokeLinecap="round" d="M9 12h.01M15 12h.01M9 16h6" />
                    </svg>
                ) : (
                    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                        <circle cx="12" cy="8" r="3.25" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.5 20a6.5 6.5 0 0 1 13 0" />
                    </svg>
                )}
            </span>
            <span className="grid gap-0.5">
                <span className="text-sm font-semibold text-stone-800">
                    {isBot ? 'Robô' : 'Usuário'}
                </span>
                <span className="text-xs text-stone-500">
                    Toque para alternar
                </span>
            </span>
        </button>
    )
}