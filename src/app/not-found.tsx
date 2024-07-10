import Link from "next/link";

export default function NotFound() {
    return (
        <div>
            <h1>
                Page Not Found
            </h1>
            <h3>
                <Link href="/">Home</Link>
            </h3>
        </div>
    );
}
