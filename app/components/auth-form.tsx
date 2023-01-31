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
    const router = useRouter()
    const {
        register,
        handleSubmit,
        setError,
        watch,
        formState: { errors },
        reset,
    } = useForm<Inputs>()

    useEffect(() => {
        setError('email', {
            type: 'manual',
            message: '',
        })
    }, [setError])

    const onSubmit = async (data: any) => {
        const email = data.email
        const password = data.password
        if (isLogin) {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })
            reset(password)
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
            reset()
            if (error) {
                alert(error.message)
            } else {
                router.push('/auth/phone')
            }
        }
    }
    console.log('errors', errors)
    return (
        <div className="flex flex-col items-center justify-center">
            <p>{loginUser.email}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input
                        type="text"
                        {...register('email', {
                            maxLength: {
                                value: 255,
                                message: '255文字以下で入力してください',
                            },
                            required: 'Emailを入力してください。',
                        })}
                        className={`${
                            errors.email?.message
                                ? 'border-red-300'
                                : 'border-gray-300'
                        } my-2 rounded border  px-3 py-2 text-sm placeholder-gray-500 focus:outline-none`}
                        placeholder="Email"
                    />
                    <div className="text-sm text-red-500">
                        {errors.email && <span>{errors.email.message}</span>}
                    </div>
                </div>
                <div>
                    <input
                        type="password"
                        {...register('password', {
                            maxLength: {
                                value: 255,
                                message: '255文字以下で入力してください',
                            },
                            minLength: {
                                value: 8,
                                message: '8文字以上で入力してください',
                            },
                            required: 'パスワードを入力してください',
                        })}
                        className={`${
                            errors.password?.message
                                ? 'border-red-300'
                                : 'border-gray-300'
                        } my-2 rounded border  px-3 py-2 text-sm placeholder-gray-500 focus:outline-none`}
                        placeholder="Password"
                    />
                    <div className="text-sm text-red-500">
                        {errors.password && (
                            <span>{errors.password.message}</span>
                        )}
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
