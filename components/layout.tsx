import Header from "./Header";

export default function Layout({ children }) {
    return (
        <>
            <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
                <Header />
                {children}
            </main>
        </>
    )
}