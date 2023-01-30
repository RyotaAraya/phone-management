import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs' //middlewareの中でsupabaseのインスタンスを作成

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()
    const supabase = createMiddlewareSupabaseClient({ req, res })
    //middlewareの中でセッション情報を取得
    const {
        data: { session },
    } = await supabase.auth.getSession()

    //未ログインであればauthにリダイレクト
    if (!session && req.nextUrl.pathname.startsWith('/auth/phone')) {
        const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = '/auth'
        return NextResponse.redirect(redirectUrl)
    }
    return res
}
