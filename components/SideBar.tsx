import Link from "next/link";
import { useRouter } from "next/router";

export default function SideBar() {
    const router = useRouter();
    const aClassName = (path) => {
        let className = "text-base text-gray-900 font-normal rounded-lg block p-2 hover:bg-yellow-100";
        if (path == router.pathname) {
            className += " bg-yellow-100"
        }
        return className;
    }
    return (
        <aside id="sidebar"
               className="fixed z-20 h-full top-0 left-0 pt-16 flex flex-col w-64 bg-white"
               aria-label="Sidebar">
            <ul className="space-y-2 pb-2 px-3 pt-5">
                <li>
                    <Link href="/">
                        <a className={aClassName("/")}>Home</a>
                    </Link>
                </li>
                <li>
                    <Link href="/persons">
                        <a className={aClassName("/persons")}>人物</a>
                    </Link>
                </li>
                <li>
                    <Link href="/activities">
                        <a className={aClassName("/activities")}>アクティビティ</a>
                    </Link>
                </li>
                <li>
                    <Link href="/person-relations">
                        <a className={aClassName("/person-relations")}>関連</a>
                    </Link>
                </li>
                <li>
                    <Link href="/sources">
                        <a className={aClassName("/sources")}>出典</a>
                    </Link>
                </li>
            </ul>
        </aside>
    )
}