import { supabase } from "../../../utils/supabaseClient";
import withAuth from "../../../utils/withAuth";

async function handler(req, res) {

    const { id } = req.query

    if (req.method === "DELETE") {
        const { data: answers, error: answersError } = await supabase.from("answers").delete().eq("slide_id", id)
        const { data, error } = await supabase.from("slides").delete().eq("id", id)
        res.status(200).json({
            data,
            error
        })
    }

    if (req.method === "GET") {
        const { data, error } = await supabase.from("slides").select(`*, answers(*)`).eq("id", id).single()
        res.status(200).json({
            data,
            error
        })
    }

    if (req.method === "UPDATE") {
        const { data, error } = await supabase.from("slides").upsert(req.body).eq("id", id).select()
        res.status(200).json({
            data,
            error
        })
    }
}

export default withAuth(handler)