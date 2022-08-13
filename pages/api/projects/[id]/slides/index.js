import { supabase } from "../../../../../utils/supabaseClient";
import withAuth from "../../../../../utils/withAuth";

async function hander(req, res) {

    const { id } = req.query

    const { data, error } = await supabase.from("slides").select("*").eq("project_id", id).order("position")
    
    res.status(200).json({
        data,
        error
    })

}

export default withAuth(hander)