import { supabase } from "./supabaseClient"

const withAuth = (handler) => {
    
    return async (req, res) => {

        const jwt = req.headers["authorization"]

        if (!jwt) {
            return res.status(401).json({
                error: {
                    message: "Token is missing"
                }
            })
        }

        const { user, error } = await supabase.auth.api.getUser(jwt)

        if (error) {
            res.status(500).json({
                error: {
                    message: "User not found"
                }
            })
        }

        req.user = user

        return handler(req, res)

    }

}

export default withAuth