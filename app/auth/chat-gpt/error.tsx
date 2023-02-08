'use client'

export default function Error({ error }: { error: Error }) {
    return (
        <div>
            <p className="mt-6 text-center text-red-500">
                Chat GPTとの接続でエラーが発生しました。しばらく経ってからお試しください。
            </p>
        </div>
    )
}
