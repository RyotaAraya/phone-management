import { headers, cookies } from 'next/headers'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '../../database.types'
import PhoneItem from './phone-item'

type Props = {
    params: {
        userId: string
    }
}

export default async function PhoneList({ params }: Props) {
    console.log('params', params)
    const supabase = createServerComponentSupabaseClient<Database>({
        headers,
        cookies,
    })
    const { data: subusers } = await supabase
        .from('subusers')
        .select()
        .order('created_at', { ascending: true })

    console.log('subusers', subusers)
    return (
        <ul className="my-6 mx-3">
            {subusers?.map((subuser) => (
                <PhoneItem key={subuser.id} {...subuser} />
            ))}
        </ul>
    )
}
