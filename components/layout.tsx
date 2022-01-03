import Header from "./Header";
import Link from "next/link";

export default function Layout({children}) {
    return (
        <>
            <div className="h-screen overflow-hidden bg-gold-100">
                <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
                    <div className="px-5 py-5">
                        History DB
                    </div>
                </nav>
                <div className="flex overflow-hidden w-full pt-16">
                    <aside id="sidebar"
                           className="fixed z-20 h-full top-0 left-0 pt-16 flex flex-col w-64 bg-white"
                           aria-label="Sidebar">
                        <ul className="space-y-2 pb-2 px-3 pt-5">
                            <li>
                                <Link href="/">
                                    <a className="text-base text-gray-900 font-normal rounded-lg block p-2 hover:bg-yellow-100">
                                        Home
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/persons">
                                    <a className="text-base text-gray-900 font-normal rounded-lg block p-2 hover:bg-yellow-100">
                                        人物
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/activities">
                                    <a className="text-base text-gray-900 font-normal rounded-lg block p-2 hover:bg-yellow-100">
                                        アクティビティ
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/person-relations">
                                    <a className="text-base text-gray-900 font-normal rounded-lg block p-2 hover:bg-yellow-100">
                                        関連
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </aside>
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