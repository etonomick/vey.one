import { supabase } from "./supabaseClient"

const withAuth = (handler) => {
    
    return async (req, res) => {

        const jwt = req.headers["authorization"]
        // console.log(jwt)

        if (!jwt) {
            return res.status(401).json({
                error: {
                    message: "Token is missing"
                }
            })
        }

        const { data: { user }, error } = await supabase.auth.getUser(jwt)
        
        if (error) {
            res.status(401).json({
                error: {
                    message: "User not found"
                }
            })
        }

        req.user = user
        // console.log(user)

        return handler(req, res)

    }

}

export default withAuth