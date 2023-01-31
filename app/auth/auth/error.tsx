'use client'
import Auth from '../../components/templates/AuthTemplate'

export default function Error({ error }: { error: Error }) {
    return (
        <main
            className={`flex h-[calc(100vh-56px)] flex-col items-center justify-center`}
        >
            <p className="mt-6 text-center text-red-500">認証エラー</p>

            <Auth />
        </main>
    )
}
