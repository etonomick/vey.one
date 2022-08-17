import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Dashboard from "../components/layouts/Dashboard";
import { Wrapper } from "../context/state";
import "../styles/globals.css";
import { supabase } from "../utils/supabaseClient";

function Vey({ Component, pageProps }) {

    const router = useRouter()

    return (
        <Wrapper>
            {/* {JSON.stringify(session)} */}
            {router.pathname.split("/")[1] === "dashboard" ? <Dashboard><Component {...pageProps} /></Dashboard> : <Component {...pageProps} />}
        </Wrapper>
    )
}

export default Vey