import { useEffect, useMemo, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import Button from "./ui/Button";

export default function Auth() {

    const [location, setLocation] = useState(null)

    useEffect(() => {
        setLocation(window.location.href)
    }, [])

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center">
            <Button onClick={() => {
                supabase.auth.signIn({
                    provider: "discord"
                }, {
                    redirectTo: location
                })
            }}>Sign in with Discord</Button>
        </div>
    )
}