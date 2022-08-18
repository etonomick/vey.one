import { RadioGroup } from "@headlessui/react"
import { useEffect, useState } from "react"
import useSWR, { mutate } from "swr"
import fetcher from "../../utils/fetcher"
import { supabase } from "../../utils/supabaseClient"
import withToken from "../../utils/withToken"
import Button from "../ui/Button"
import Editable from "../ui/Editable"
import Heading from "../ui/Heading"

export default function SlideEditor({ slide }) {

    if (!slide) {
        return <>empty state</>
    }

    const { id } = slide

    const { data, error } = useSWR(`/api/slides/${id}`, fetcher)
    const [newAnswerTitle, setNewAnswerTitle] = useState("")

    const [title, setTitle] = useState(slide.title)

    const types = [
        "Single choice",
        "Multiple choice",
        "Short answer"
    ]

    const layouts = ["Title Slide", "Content", "Two Cols", "Picture with Caption"]

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
        <div className="flex flex-col gap-5 bg-white p-8 rounded-3xl aspect-4/3 overflow-y-auto">
            <div className={`flex flex-col gap-5`}>

                <Editable>{data.data.title}</Editable>

                <div className="flex flex-col gap-3 border border-neutral-700 p-8 rounded-3xl">
                    {data.data.answers.map(answer => (
                        <div className="flex flex-row w-full items-center">
                            <Editable>{answer.title}</Editable>
                            <div><Button onClick={() => {
                                fetch(`/api/answers/${answer.id}`, {
                                    method: "DELETE",
                                    headers: {
                                        "Authorization": supabase.auth.getSession().access_token,
                                        "Content-Type": "application/json"
                                    }
                                }).then(res => res.json()).then((data) => {
                                    mutate(`/api/slides/${id}`)
                                })
                            }}>Delete</Button></div>
                        </div>
                    ))}
                    <Editable></Editable>
                </div>

                <input className="border" type="text" value={newAnswerTitle} onChange={e => {
                    setNewAnswerTitle(e.target.value)
                }} onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        fetch("/api/answers/create", {
                            method: "POST",
                            headers: {
                                "Authorization": supabase.auth.getSession().access_token,
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                slide_id: id,
                                title: newAnswerTitle
                            })
                        }).then(res => res.json()).then(data => {
                            setNewAnswerTitle("")
                            mutate(`/api/slides/${id}`)
                        })
                    }
                }} />
            </div>
            <div className="border border-neutral-300 rounded-3xl divide-y p-8 absolute top-3 right-3 flex flex-col">
                {layouts.map((layout, index) => (
                    <div>{index}</div>
                ))}
            </div>
        </div>
    )
}