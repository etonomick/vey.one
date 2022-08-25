import { supabase } from "../../../utils/supabaseClient"
import withAuth from "../../../utils/withAuth"

const handler = async (req, res) => {
    
    const { title, description } = req.body

    const { data, error } = await supabase.from("projects").insert({
        user_id: req.user.id,
        title,
        description
    }).select().single()

    res.status(200).json({
        data,
        error
    })
    
}

export default withAuth(handler)