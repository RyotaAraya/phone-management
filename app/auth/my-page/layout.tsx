export default async function TodoLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className="flex">
            <aside className={`h-[calc(100vh-56px)] w-1/4 bg-gray-200`}></aside>
            <main className="flex flex-1 justify-center">{children}</main>
        </section>
    )
}
