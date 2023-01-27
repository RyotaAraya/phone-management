'use client'
import Link from 'next/link'
import useStore from '../../store'

export default function NavBar() {
    const { loginUser } = useStore()
    return (
        <header className="bg-gray-800 p-4">
            <nav className="space-x-4">
                <Link
                    href="/"
                    className="rounded bg-gray-700 px-3 py-2 text-white hover:bg-gray-500"
                >
                    Home
                </Link>
                <Link
                    href={`/auth/my-page/${loginUser.id}`}
                    className="rounded bg-gray-700 px-3 py-2 text-white hover:bg-gray-500"
                >
                    MyPage
                </Link>
                <Link
                    href="/auth"
                    className="rounded bg-gray-700 px-3 py-2 text-white hover:bg-gray-500"
                >
                    Auth with CRUD
                </Link>
            </nav>
        </header>
    )
}
