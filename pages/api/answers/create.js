import { supabase } from "../../../utils/supabaseClient";
import withAuth from "../../../utils/withAuth";

async function hander(req, res) {

    const { slide_id, title } = req.body

    const { data, error } = await supabase.from("answers").insert({
        slide_id,
        title
    }).select()

    res.status(200).json({
        data,
        error
    })

}

export default withAuth(hander)