import Link from "next/link"

export default function Home() {
    return <div className="text-white tracking-tight min-h-screen bg-black flex flex-col justify-center gap-6 items-center">
        <Link href={"https://x.com/realshl0ms"} className="px-4 py-2 hover:border hover:rounded-full font-semibold text-lg tracking-wide font-mono">
            Twitter
        </Link>
        <Link href={"https://x.com/realshl0ms"} className="px-4 py-2 hover:border hover:rounded-full font-semibold text-lg tracking-wide font-mono">
            Buy
        </Link>
    </div>
}