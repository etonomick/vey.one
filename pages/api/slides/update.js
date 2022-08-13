import { supabase } from "../../../utils/supabaseClient";
import withAuth from "../../../utils/withAuth";

async function hander(req, res) {

    const { data, error } = await supabase.from("slides").upsert(req.body)
    
    res.status(200).json({
        data,
        error
    })

}

export default withAuth(hander)