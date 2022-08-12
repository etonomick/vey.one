import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Dashboard from "../components/layouts/Dashboard";
import "../styles/globals.css";
import { supabase } from "../utils/supabaseClient";

function Vey({ Component, pageProps }) {

    const router = useRouter()

    const [session, setSesion] = useState(supabase.auth.session())

    useEffect(() => {
        supabase.auth.onAuthStateChange((_event, session) => {
            setSesion(session)
        })
    }, [])

    return (
        <>
        {router.pathname.split("/")[1] === "dashboard" ? <Dashboard><Component {...pageProps} /></Dashboard> : <Component {...pageProps} />}
        </>
    )
}

export default Vey