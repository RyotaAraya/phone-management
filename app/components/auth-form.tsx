'use client'
import { useState, FormEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import supabase from '../../utils/supabase'
import useStore from '../../store'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
    email: string
    password: string
}

export default function AuthForm() {
    const { loginUser, resetLoginUser } = useStore()
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const {
        register,
        handleSubmit,
        setError,
        watch,
        formState: { errors },
    } = useForm<Inputs>()

    useEffect(() => {
        setError('email', {
            type: 'manual',
            message: '',
        })
    }, [setError])

    const onSubmit = async () => {
        //e.preventDefault()
        if (isLogin) {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })
            setEmail('')
            setPassword('')
            if (error) {
                alert(error.message)
            } else {
                router.push('/auth/phone')
            }
        } else {
            const { error } = await supabase.auth.signUp({
                email,
                password,
            })
            setEmail('')
            setPassword('')
            if (error) {
                alert(error.message)
            }
        }
    }
    return (
        <div className="flex flex-col items-center justify-center">
            <p>{loginUser.email}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input
                        type="text"
                        {...register('email', {
                            maxLength: 256,
                            required: 'Emailを入力してください。',
                        })}
                        className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:outline-none"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    />
                    <div className="text-sm text-red-500">
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>
                </div>
                <div>
                    <input
                        type="password"
                        {...register('password', {
                            maxLength: 256,
                            minLength: 8,
                            required: 'パスワードを入力してください。',
                        })}
                        className="my-2 rounded border border-gray-300 px-3 py-2 text-sm  placeholder-gray-500 focus:outline-none"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                    <div className="text-sm text-red-500">
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>
                </div>
                <div className="my-6 flex justify-center text-sm">
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-800 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700"
                    >
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </div>
            </form>
            <p
                onClick={() => setIsLogin(!isLogin)}
                className="my-10 cursor-pointer font-medium hover:text-indigo-800"
            >
                {isLogin ? 'Register?' : 'Login?'}
            </p>
        </div>
    )
}
