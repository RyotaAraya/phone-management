'use client'
import useStore from '../../../store'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { TrashIcon } from '@heroicons/react/24/solid'
import supabase from '../../../utils/supabase'
import type { Database } from '../../../database.types'
import { useFetch } from '../../../hooks/useFetch'

type Subuser = Database['public']['Tables']['subusers']['Row']
type Props = {
    rows: Subuser[]
}
export const PhoneList = ({ rows }: Props) => {
    const { fetchPhone } = useFetch()
    const {
        originPhonesList,
        editedPhonesList,
        setPhones,
        deletePhone,
        updatePhones,
        resetEditedTask,
    } = useStore((state) => state)

    const updateMutate = async (id: string, name: string) => {
        await supabase.from('subusers').update({ name: name }).eq('id', id)
        fetchPhone()
        resetEditedTask()
    }
    const updateList = (id: string, e: any) => {
        const newList = editedPhonesList.map((List) => {
            if (List.id === id) {
                return {
                    id: List.id,
                    name: e.target.value,
                    user_id: List.user_id,
                    created_at: List.created_at,
                }
            }
            return List
        })
        updatePhones(newList)
    }
    const onBlur = (id: string) => {
        const list = editedPhonesList.find((list) => String(list.id) === id)
        if (list === undefined) return
        updateMutate(id, list.name)
    }
    const deleteList = (id: string) => {
        deletePhone(id)
        deleteMutate(id)
    }
    const deleteMutate = async (id: string) => {
        await supabase.from('subusers').delete().eq('id', id)
        fetchPhone()
    }

    //useStoreに初期値登録
    useEffect(() => {
        setPhones(rows)
        updatePhones(rows)
    }, [])

    return (
        <ul className="my-6 mx-3">
            {originPhonesList &&
                originPhonesList?.map((subuser) => (
                    <li key={subuser.id} className="my-2">
                        <input
                            className="mr-1"
                            type="text"
                            defaultValue={subuser.name}
                            onChange={(e) => updateList(subuser.id, e)}
                            onBlur={(e) => onBlur(subuser.id)}
                        />
                        <div className="float-right ml-20 flex">
                            <TrashIcon
                                className="h-5 w-5 cursor-pointer text-blue-500"
                                onClick={() => {
                                    deleteList(subuser.id)
                                }}
                            />
                        </div>
                    </li>
                ))}
        </ul>
    )
}
