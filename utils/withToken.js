import { supabase } from "./supabaseClient";

export default function withToken(endpoint) {
    return [
        endpoint,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": supabase.auth.session().access_token
            }
        }
    ]
}