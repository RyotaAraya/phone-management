'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid'
import supabase from '../../utils/supabase'
import useStore from '../../store'
import type { Database } from '../../database.types'

type Subuser = Database['public']['Tables']['subusers']['Row']

export default function PhoneItem(subuser: Subuser) {
    const router = useRouter()
    const updateTask = useStore((state) => state.updateEditedTask)
    const resetTask = useStore((state) => state.resetEditedTask)
    async function updateMutate(id: string, name: string) {
        console.log('update', id)
        console.log('name', name)
        await supabase.from('subusers').update({ name: name }).eq('id', id)
        resetTask()
        router.refresh()
    }
    async function deleteMutate(id: string) {
        await supabase.from('subusers').delete().eq('id', id)
        router.refresh()
    }
    const handleChangeName = (e, id) => {
        updateMutate(id, e.target.value)
    }
    return (
        <li className="my-2">
            <input
                className="mr-1"
                type="text"
                defaultValue={subuser.name}
                onChange={(e) => handleChangeName(e, subuser.id)}
            />
            <div className="float-right ml-20 flex">
                <TrashIcon
                    className="h-5 w-5 cursor-pointer text-blue-500"
                    onClick={() => {
                        deleteMutate(subuser.id)
                    }}
                />
            </div>
        </li>
    )
}
