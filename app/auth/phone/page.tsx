import { Suspense } from 'react'
import Spinner from '../../components/spinner'
import PhoneTemplate from '../../components/templates/PhoneTemplate'
import SubUserCreate from '../../components/subuser-create'

export default function PhonePage() {
    return (
        <div className="m-10">
            <SubUserCreate />
            <Suspense fallback={<Spinner />}>
                {/* @ts-ignore*/}
                <PhoneTemplate />
            </Suspense>
        </div>
    )
}
