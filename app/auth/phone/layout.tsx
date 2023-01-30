import { Suspense } from 'react'
import Spinner from '../../components/spinner'
import EditTask from '../../components/todo-edit'
import PhoneList from '../../components/phone-list'

export default async function PhoneLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex">
      <aside className={`h-[calc(100vh-56px)] w-1/4 bg-gray-200`}>
        <Suspense fallback={<Spinner />}>
          {/* @ts-ignore*/}
          <PhoneList />
        </Suspense>
      </aside>
      <main className="flex flex-1 justify-center">{children}</main>
    </section>
  )
}
