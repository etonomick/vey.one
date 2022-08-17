import { useAppContext } from "../context/state"

export default function withToken(endpoint) {

    const { session } = useAppContext()

    return [
        endpoint,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${session.access_token}`
            }
        }
    ]
}