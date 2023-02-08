import { Suspense } from 'react'
import Spinner from '../../../components/atom/Spinner'
import ChatGPTTemplae from '../../../components/templates/ChatGPTTemplate'

export default function PhonePage() {
    return (
        <div className="m-10">
            <Suspense fallback={<Spinner />}>
                {/* @ts-ignore*/}
                <ChatGPTTemplae />
            </Suspense>
        </div>
    )
}
