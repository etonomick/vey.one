import useSWR from "swr"
import fetcher from "../../utils/fetcher"
import withToken from "../../utils/withToken"

export default function Projects() {

    const { data, error } = useSWR(withToken("/api/projects"), fetcher) 

    return (
        <div>
            {data && JSON.stringify(data)}
            {error && JSON.stringify(error)}
        </div>
    )
}