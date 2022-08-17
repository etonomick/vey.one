import { supabase } from "./supabaseClient"

const fetcher = async (...args) => {

    const { data: { session }, error } = await supabase.auth.getSession()

    const res = await fetch(...args, {
        headers: {
            "Authorization": session.access_token
        }
    }).then(res => res.json())

    return res

}

export default fetcher