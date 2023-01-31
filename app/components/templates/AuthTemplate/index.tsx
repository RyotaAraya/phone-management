'use client'
import AuthForm from '../../organisms/AuthForm'
import useStore from '../../../../store'

export default function Auth() {
    const { loginUser, resetLoginUser } = useStore()
    const Auth = () => {
        if (
            loginUser &&
            loginUser.id !== '' &&
            loginUser.id !== undefined &&
            loginUser.id !== null
        )
            return <h1>ログイン済み</h1>
        return <AuthForm />
    }
    return <Auth />
}
