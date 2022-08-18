import { supabase } from "./supabaseClient"

const fetcher = async (...args) => {

    const { data: { session }, error } = await supabase.auth.getSession()

    const res = await fetch(...args, {
        ...args,
        headers: {
            "Authorization": session.access_token,
            "Content-Type": "application/json"
        }
    }).then(res => res.json())

    return res

}

export default fetcher