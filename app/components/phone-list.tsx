import { headers, cookies } from 'next/headers'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '../../database.types'
import PhoneItem from './phone-item'

export default async function PhoneList() {
    const supabase = createServerComponentSupabaseClient<Database>({
        headers,
        cookies,
    })
    const { data: subusers } = await supabase
        .from('subusers')
        .select()
        .order('created_at', { ascending: true })
    return { ...(subusers && <PhoneItem Subusers={subusers} />) }
}
