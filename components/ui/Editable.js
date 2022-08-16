import { useState } from "react"
import useSWR from "swr"
import fetcher from "../../utils/fetcher"
import withToken from "../../utils/withToken"

export default function Editable({ id, children }) {

    const { data, error } = useSWR(withToken(`/api/answers/${id}`), fetcher)

    const handler = (e) => {
        
    }

    return (
        <div>
            <div contentEditable={data ? true : "false"} onInput={handler}>{!data ? "Loading..." : data ?? {}.data ?? {}.title ?? ""}</div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}