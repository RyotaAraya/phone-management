import '../styles/globals.css'
import NavBar from './components/nav-bar'
import { headers, cookies } from 'next/headers'
import SupabaseListener from './components/supabase-listener'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '../database.types'

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = createServerComponentSupabaseClient<Database>({
        headers,
        cookies,
    })
    const {
        data: { session },
    } = await supabase.auth.getSession()
    return (
        <html>
            <body>
                <NavBar />
                <SupabaseListener accessToken={session?.access_token} />
                {children}
            </body>
        </html>
    )
}
