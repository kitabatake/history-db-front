import SideBar from "./SideBar";

export default function Layout({children}) {
    return (
        <>
            <div className="min-h-screen bg-gold-100">
                <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
                    <div className="px-5 py-5">
                        History DB
                    </div>
                </nav>
                <div className="flex overflow-hidden w-full pt-16">
                    <SideBar/>
                    <div id="main-content" className="h-full w-full relative overflow-y-auto lg:ml-64">
                        <main className="p-4">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </>
    )
}
