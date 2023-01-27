'use client'
import Auth from './auth'
import useStore from '../../store'

export default function Home() {
    const { loginUser } = useStore()
    console.log(loginUser)
    let move = <Auth />
    if (loginUser.id !== '') {
        move = (
            <>
                <h1>{`${loginUser.email}ログイン済み`}</h1>
            </>
        )
    }
    return <>{move}</>
}
