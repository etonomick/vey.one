import { supabase } from "../../../utils/supabaseClient"
import withAuth from "../../../utils/withAuth"

const hander = async (req, res) => {

    const { data, error } = await supabase.from("projects").select(`*, slides(count)`).eq("user_id", req.user.id)
    res.status(200).json({
        data,
        error
    })

}

export default withAuth(hander)