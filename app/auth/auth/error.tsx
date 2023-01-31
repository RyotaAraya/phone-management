'use client'
import Auth from '../../components/auth'

export default function Error({ error }: { error: Error }) {
    return (
        <>
            <div>
                <p className="mt-6 text-center text-red-500">認証エラー</p>
            </div>
            <Auth />
        </>
    )
}
