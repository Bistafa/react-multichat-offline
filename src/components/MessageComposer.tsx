import {
    useRef,
    useState,
    type FormEvent,
    type KeyboardEvent,
} from 'react'
import RoleToggle from './RoleToggle'
import type { MessageRole } from '../types/chat'

type MessageComposerProps = {
    role: MessageRole
    onRoleChange: (role: MessageRole) => void
    onSend: (text: string) => void
}

export default function MessageComposer({
    role,
    onRoleChange,
    onSend,
}: MessageComposerProps) {
    const [text, setText] = useState('')
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const canSend = text.trim().length > 0

    function handleChange(value: string) {
        setText(value)
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const message = text.trim()
        if (!message) return

        onSend(message)
        setText('')
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.focus()
        }
    }

    function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
        if (
            event.key !== 'Enter' ||
            event.shiftKey ||
            event.nativeEvent.isComposing
        ) {
            return
        }

        event.preventDefault()
        if (canSend) event.currentTarget.form?.requestSubmit()
    }

    return (
        <div className="shrink-0 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
            <form
                aria-label="Composição da mensagem"
                className={`rounded-xl border bg-white px-4 py-3 shadow-sm transition-colors ${role === 'bot' ? 'border-violet-500' : 'border-stone-200'}`}
                onSubmit={handleSubmit}
            >
                <div className="mb-3">
                    <p className="mb-2 text-xs font-medium text-stone-600">
                        Próxima mensagem
                    </p>
                    <RoleToggle role={role} onRoleChange={onRoleChange} />
                </div>
                <div className="flex items-end gap-2">
                    <label className="sr-only" htmlFor="message-text">
                        Mensagem
                    </label>
                    <textarea
                        autoComplete="off"
                        className="max-h-36 min-h-11 min-w-0 flex-1 resize-none overflow-y-auto rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-base leading-6 text-stone-900 outline-none placeholder:text-stone-500 focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-1"
                        id="message-text"
                        onChange={(event) => handleChange(event.currentTarget.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Escreva uma mensagem..."
                        ref={textareaRef}
                        rows={1}
                        value={text}
                    />
                    <button
                        className="min-h-11 shrink-0 rounded-lg bg-violet-700 px-4 text-sm font-semibold text-white outline-none hover:bg-violet-800 focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-600"
                        disabled={!canSend}
                        type="submit"
                    >
                        Enviar
                    </button>
                </div>
            </form>
        </div>
    )
}