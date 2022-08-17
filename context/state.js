import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

const Context = createContext()

export function Wrapper({ children }) {

    const [session, setSession] = useState(null)

    async function getSession() {
        setSession(await supabase.auth.getSession())
    }

    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            setSession(session)
        })
    }, [])

    getSession()

    return (
        <Context.Provider value={{
            session
        }}>
            {children}
        </Context.Provider>
    )

}

export function useAppContext() {
    return useContext(Context)
}