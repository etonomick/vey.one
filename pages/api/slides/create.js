import { supabase } from "../../../utils/supabaseClient"
import withAuth from "../../../utils/withAuth"

async function handler (req, res) {

    const { project_id, title, position } = req.body

    const { data, error } = await supabase.from("slides").insert({
        project_id,
        title,
        position
    })

    res.status(200).json({
        data,
        error
    })

}

export default withAuth(handler)