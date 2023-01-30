import { headers, cookies } from 'next/headers'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '../../../../database.types'
import { PhoneList } from '../../organisms/PhoneList'

export default async function PhoneTemplate() {
    const supabase = createServerComponentSupabaseClient<Database>({
        headers,
        cookies,
    })
    const { data: subusers } = await supabase
        .from('subusers')
        .select()
        .order('created_at', { ascending: true })
    return { ...(subusers && <PhoneList Subusers={subusers} />) }
}
