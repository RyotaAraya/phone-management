'use client'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'
import AuthForm from './auth-form'
import supabase from '../../utils/supabase'
import useStore from '../../store'

export default function Auth() {
    const { loginUser, resetLoginUser } = useStore()
    const Auth = () => {
        if (
            loginUser &&
            loginUser.id !== '' &&
            loginUser.id !== undefined &&
            loginUser.id !== null
        )
            return <h1>ログイン済み</h1>
        return <AuthForm />
    }
    return <Auth />
}
