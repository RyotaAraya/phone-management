'use client'
import Link from 'next/link'
import useStore from '../../store'
import { useEffect } from 'react'
import {
    ArrowRightOnRectangleIcon,
    ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/solid'
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
                    <div className="text-sm lg:flex-grow">
                        <Link
                            href={`/auth/phone/`}
                            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-teal-200 mr-4"
                        >
                            PHONE
                        </Link>
                        <Link
                            href={`/auth/my-page/${loginUser.id}`}
                            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-teal-200 mr-4"
                        >
                            MyPage
                        </Link>
                        <Link
                            href="/auth/todo-crud"
                            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-teal-200"
                        >
                            TODO
                        </Link>
                    </div>
                    <div>
                        <ArrowRightOnRectangleIcon
                            className="inline-block my-1 h-6 w-6 cursor-pointer lg:mt-0 text-white hover:bg-teal-500"
                            onClick={signOut}
                        />
                    </div>
                </>
            )
        }
        return (
            <>
                <div className="text-sm lg:flex-grow"></div>
                <Link href="/auth">
                    <ArrowLeftOnRectangleIcon
                        className="inline-block my-1 h-6 w-6 cursor-pointer lg:mt-0 text-white hover:bg-teal-500"
                        onClick={signOut}
                    />
                </Link>
            </>
        )
    }

    return (
        <header className="bg-neutral-800 p-2">
            <nav className="flex items-center justify-between flex-wrap p-6">
                <Link
                    href="/"
                    className="flex items-center flex-shrink-0 text-white mr-6 hover:text-teal-200"
                >
                    <span className="font-semibold text-xl tracking-tight">
                        Phone Manegement
                    </span>
                </Link>
                <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                    <LoggedIn loginUser={loginUser} />
                </div>
            </nav>
        </header>
    )
}
