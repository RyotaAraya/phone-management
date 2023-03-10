'use client'
import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useStore from '../../../store'
import supabase from '../../../utils/supabase'
import { useFetch } from '../../../hooks/useFetch'

export default function PhoneCreate() {
    const { fetchPhone } = useFetch()
    const {
        creatingPhone,
        createPhone,
        setPhones,
        loginUser,
        resetCreatingPhone,
    } = useStore((state) => state)

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const val = creatingPhone.name
        const id = loginUser.id
        if (val === '' || id === undefined) return

        const { error } = await supabase
            .from('subusers')
            .insert({ name: val, user_id: id })
        fetchPhone()
        resetCreatingPhone()
    }

    const handleChangeName = (e: any) => {
        if (
            e.target.value === '' ||
            loginUser.id === '' ||
            loginUser.id === undefined
        )
            return
        createPhone(loginUser.id, e.target.value)
    }

    return (
        <div className="m-5 text-center">
            <form onSubmit={submitHandler}>
                <input
                    type="text"
                    className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:outline-none"
                    placeholder="New ?"
                    value={creatingPhone.name}
                    onChange={handleChangeName}
                />
                <button
                    type="submit"
                    className="ml-2 rounded bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700 "
                >
                    {'Create'}
                </button>
            </form>
        </div>
    )
}
