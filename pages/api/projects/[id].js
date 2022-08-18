import { supabase } from "../../../utils/supabaseClient";
import withAuth from "../../../utils/withAuth";

async function handler(req, res) {
    
    const { id } = req.query

    const { data, error } = await supabase.from("projects").select(`*, slides(count)`).eq("user_id", req.user.id).eq("id", id).single()
    if (error) return res.status(500).json(error)
    res.status(200).json(data)

}

export default withAuth(handler)