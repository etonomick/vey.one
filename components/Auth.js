import { useEffect, useMemo, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import Button from "./ui/Button";
import Vey from "./ui/Vey";
import Heading from "./ui/Heading";
import { FaDiscord } from "react-icons/fa";

export default function Auth() {

    const [location, setLocation] = useState(null)

    useEffect(() => {
        setLocation(window.location.href)
    }, [])

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center gap-5">
            <Vey />
            <Heading>Sign In</Heading>
            <Button onClick={() => {
                supabase.auth.signIn({
                    provider: "discord"
                }, {
                    redirectTo: location
                })
            }}><FaDiscord /> Discord</Button>
        </div>
    )
}