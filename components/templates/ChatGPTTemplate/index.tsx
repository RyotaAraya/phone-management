'use client'
import Image from 'next/image'
import useState from 'react-usestateref'
import userPic from '../../../public/store/user1.svg'
import botPic from '../../../public/store/bot1.svg'
import { Spinner } from '../../atom/Spinner'
enum Creator {
    Me = 0,
    Bot = 1,
}

interface MessageProps {
    text: string
    from: Creator
    key: number
}

interface InputProps {
    onSend: (input: string) => void
    disabled: boolean
}

const ChatMessage = ({ text, from }: MessageProps) => {
    return (
        <>
            {from == Creator.Me && (
                <div className="bg-white p-r rounded-lg flex gap-4 items-center whitespace-pre-wrap">
                    <Image src={userPic} alt="User" width={40} />
                    <p className="text-gray-700">{text}</p>
                </div>
            )}
            {from == Creator.Bot && (
                <div className="bg-gray-100 p-4 rounded-lg flex gap-4 items-center whitespace-pre-wrap">
                    <Image src={botPic} alt="Bot" width={40} />
                    <p className="text-gray-700">{text}</p>
                </div>
            )}
        </>
    )
}

export const ChatGPTTemplae = () => {
    const [input, setInput] = useState('')
    const [message, setMessages, messagesRef] = useState<MessageProps[]>([])
    const [loading, setLoading] = useState(false)

    const callApi = async () => {
        setLoading(true)

        const myMessage: MessageProps = {
            text: input,
            from: Creator.Me,
            key: new Date().getTime(),
        }

        setMessages([myMessage, ...messagesRef.current])

        try {
            const response = await fetch('/api/generate-answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: input,
                }),
            }).then((response) => response.json())
            setLoading(false)

            if (response.text) {
                const botMessage: MessageProps = {
                    text: response.text,
                    from: Creator.Bot,
                    key: new Date().getTime(),
                }
                setMessages([botMessage, ...messagesRef.current])
            } else {
                throw new SyntaxError('レスポンスなし')
            }
        } catch (error) {
            throw new Error('しばらく経ってからお試しください')
        }
    }
    const handleSubmit = () => {
        if (input === '') return
        callApi()
        setInput('')
    }

    return (
        <main className="relative max-w-2x mx-auto">
            <div className="sticky top-0 w-full pt-10 px-4">
                <div className="bg-white border-2 p-2 rounded-lg flex justify-center">
                    <input
                        value={input}
                        onChange={(e: any) => setInput(e.target.value)}
                        className="w-full py-2 px-3 text-gray-800 rounded-lg focus:outline-none"
                        type="text"
                        placeholder="質問をどうぞ"
                        disabled={loading}
                    />
                    {!loading && message.length < 4 && (
                        <button
                            onClick={() => handleSubmit()}
                            className="p-2 bg-gray-200 rounded-md text-gray-500 bottom-1.5 righit-1"
                        >
                            Ask
                        </button>
                    )}
                </div>
                <div className="top-4">
                    {loading && (
                        <p className="text-gray-500 flex justify-center">
                            少々おまちを
                        </p>
                    )}
                    {loading && <Spinner />}
                </div>
            </div>

            <div className="mt-10 px-4">
                {message.map((msg: MessageProps) => (
                    <ChatMessage
                        key={msg.key}
                        text={msg.text}
                        from={msg.from}
                    />
                ))}
                {message.length === 0 && (
                    <p className="text-center text-gray-400">
                        2回質問できます。
                    </p>
                )}
                {message.length >= 4 && (
                    <p className="text-center text-red-400">終了です。</p>
                )}
            </div>
        </main>
    )
}

export default ChatGPTTemplae
