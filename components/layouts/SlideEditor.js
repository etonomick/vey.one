import { useState } from "react"
import useSWR, { mutate } from "swr"
import fetcher from "../../utils/fetcher"
import { supabase } from "../../utils/supabaseClient"
import withToken from "../../utils/withToken"
import Heading from "../ui/Heading"

export default function SlideEditor({ slide }) {

    const { id } = slide

    const { data, error } = useSWR(withToken(`/api/slides/${id}`), fetcher)
    const [newAnswerTitle, setNewAnswerTitle] = useState("")

    const types = [
        "Text Input",
        "Poll",
        "Multiple choice"
    ]

    if (error) {
        return (
            <div>Error</div>
        )
    }

    if (!data) {
        return (
            <div>Loading slide {slide.id}...</div>
        )
    }

    return (
        <div className="flex flex-col gap-5">
            <div>
                <Heading>{slide.title}</Heading>
            {data.data.answers.map(answer => (
                <div>{answer.title}</div>
            ))}
            <input className="border" type="text" value={newAnswerTitle} onChange={e => {
                setNewAnswerTitle(e.target.value)
            }} onKeyDown={(e) => {
                if (e.key === "Enter") {
                    fetch("/api/answers/create", {
                        method: "POST",
                        headers: {
                            "Authorization": supabase.auth.session().access_token,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            slide_id: id,
                            title: newAnswerTitle
                        })
                    }).then(res => res.json()).then(data => {
                        setNewAnswerTitle("")
                        mutate(withToken(`/api/slides/${id}`))
                    })
                }
            } }/>
            </div>
            <div>
                <div>Settings</div>
                {types.map(type => (
                    <div>{type}</div>
                ))}
            </div>
            <div className="bg-gray-100 rounded-2xl p-5">

            <pre className="text-xs">{JSON.stringify(data, null, 2)}</pre>
            </div>
            
        </div>
    )
}