'use client'
import Link from 'next/link'
import useStore from '../../store'
import { useEffect } from 'react'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'
import supabase from '../../utils/supabase'

export default function NavBar() {
    const { loginUser, resetLoginUser } = useStore()
    function signOut() {
        supabase.auth.signOut()
        resetLoginUser()
    }
    const LoggedIn = ({ loginUser }: any) => {
        if (
            loginUser &&
            loginUser.id !== '' &&
            loginUser.id !== undefined &&
            loginUser.id !== null
        ) {
            return (
                <>
                    {' '}
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
                    <ArrowRightOnRectangleIcon
                        className="my-6 h-6 w-6 cursor-pointer text-blue-500"
                        onClick={signOut}
                    />
                </>
            )
        }
        return null
    }
    useEffect(() => {
        LoggedIn({ loginUser })
    }, [loginUser])
    return (
        <header className="bg-gray-800 p-4">
            <nav className="space-x-4">
                <Link
                    href="/"
                    className="rounded bg-gray-700 px-3 py-2 text-white hover:bg-gray-500"
                >
                    Home
                </Link>
                <LoggedIn loginUser={loginUser} />
            </nav>
        </header>
    )
}
