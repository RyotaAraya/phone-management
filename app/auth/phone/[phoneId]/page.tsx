import { notFound } from 'next/navigation'
import { headers, cookies } from 'next/headers'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { format } from 'date-fns'
import type { Database } from '../../../../database.types'

type PageProps = {
    params: {
        userId: string
    }
}

export default async function PhoneDetailPage({ params }: PageProps) {
    const supabase = createServerComponentSupabaseClient<Database>({
        headers,
        cookies,
    })
    const { data: user_profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', params.userId)
        .single()
    if (!user_profiles) return notFound()
    return (
        <div className="mt-16 border-2 p-8">
            <p>ID: {user_profiles.id}</p>
            <p>Name: {user_profiles.name}</p>
            <p>
                Updated at:{' '}
                {user_profiles &&
                    format(
                        new Date(user_profiles.updated_at),
                        'yyyy-MM-dd HH:mm:ss'
                    )}
            </p>
        </div>
    )
}
