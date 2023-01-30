import { Suspense } from 'react'
import Spinner from '../../components/spinner'
import PhoneTemplate from '../../components/templates/PhoneTemplate'

export default function PhonePage() {
    return (
        <div className="m-10">
            <Suspense fallback={<Spinner />}>
                {/* @ts-ignore*/}
                <PhoneTemplate />
            </Suspense>
        </div>
    )
}
