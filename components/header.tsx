import Link from 'next/link'

export default function Header() {
    return (<header>
        <div className="flex justify-center items-center">
            <Link href="/">
                <button
                    className="h-10 px-2 py-2 text-indigo-600 bg-transparent border-b-2 border-indigo-500 focus:outline-none">
                    Home
                </button>
            </Link>
            <Link href="/persons">
                <button
                    className="h-10 px-2 py-2 text-indigo-600 bg-transparent border-b-2 border-indigo-500 focus:outline-none">
                    人物
                </button>
            </Link>
        </div>
    </header>);
}