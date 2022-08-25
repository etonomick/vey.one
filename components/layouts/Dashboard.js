import { useEffect, useState } from "react";
import { useAppContext } from "../../context/state";
import { supabase } from "../../utils/supabaseClient";
import Auth from "../Auth";
import Button from "../ui/Button";
import Link from "../ui/Link"
import Vey from "../ui/Vey";

export default function Dashboard({ children }) {

    const [loading, setLoading] = useState(true)
    
    const { session } = useAppContext()

    useEffect(() => {
        setLoading(false)
    }, [session])

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">Loading...</div>
        )
    }

    if (!session) {
        return (
            <Auth />
        )
    }

    return (
        <div className="flex flex-col space-y-5 pb-10">
            <div className="flex flex-row items-center place-content-between p-5">
                <div><Link href="/dashboard"><Vey /></Link></div>
                <div className="flex flex-row items-center gap-3">
                    {/* <div>
                        <Link href="/dashboard/profile">{session.user.email}</Link>
                    </div> */}
                    <Button onClick={() => {
                        supabase.auth.signOut()
                    }}>Sign Out</Button>
                </div>
            </div>
            <div className="container mx-auto pt-5 px-5">
                {children}
            </div>
        </div>
    )

}