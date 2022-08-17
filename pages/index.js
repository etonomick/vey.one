import Link from "../components/ui/Link";
import { useAppContext } from "../context/state";

export default function Index() {

    const context = useAppContext()

    return (
        <div>
            <Link href="/dashboard">Dashboard</Link>
        </div>
    )
}