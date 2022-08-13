import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import useSWR, { mutate } from "swr";
import fetcher from "../../utils/fetcher";
import { supabase } from "../../utils/supabaseClient";
import withToken from "../../utils/withToken";
import Input from "../ui/Input";

export default function Editor({ projectId }) {

    const { data: s, error } = useSWR(withToken(`/api/slides/${projectId}`), fetcher)

    const [slides, setSlides] = useState([
        {
            id: "sdifjieiufwhoiwe",
            poition: 0,
            title: "Test title 1",
            text: "Some text"
        },
        {
            id: "ewirewiorpiewproew",
            poition: 3,
            title: "Test title 2",
            text: "Some text"
        },
        {
            id: "ncxvbncmvbcxnmv",
            poition: 1,
            title: "Test title 3",
            text: "Some text"
        },
        {
            id: "qazqazqaz",
            poition: 8,
            title: "Test title 4",
            text: "Some text"
        }
    ])

    const [newSlideTitle, setNewSlideTitle] = useState("")

    function handleSlideDrag(res) {
        if (!res.destination) return
        const updated = Array.from(slides)
        const [reordered] = updated.splice(res.source.index, 1)
        updated.splice(res.destination.index, 0, reordered)
        setSlides(updated)
    }

    return (
        <div className="w-full flex gap-8">
            <div className="w-64">
                <DragDropContext onDragEnd={handleSlideDrag}>
                    <Droppable droppableId="slides">
                        {(provided) => (
                            <div className="flex flex-col gap-3" {...provided.droppableProps} ref={provided.innerRef}>
                                {slides.map((slide, index) => {
                                    return (
                                        <Draggable index={index} key={slide.id} draggableId={slide.id}>
                                            {(provided) => (
                                                <div className="flex items-center gap-3 w-full">{index}<div className="cursor-pointer p-3 border rounded w-full" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>{slide.title}</div></div>
                                            )}
                                        </Draggable>
                                    )
                                })}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                <div>
                    {newSlideTitle}
                    <input value={newSlideTitle} onChange={e => {
                        setNewSlideTitle(e.target.value)
                    }} type="text" placeholder="Type question" onKeyDown={e => {
                        if (e.key === "Enter") {
                            fetch("/api/slides/create", {
                                method: "POST",
                                headers: {
                                    "Authorization": supabase.auth.session().access_token,
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    project_id: projectId,
                                    title: newSlideTitle,
                                    position: 0
                                })
                            }).then(res => res.json()).then(data => {
                                setNewSlideTitle("")
                                mutate(withToken(`/api/slides/${projectId}`))
                            })
                        }
                    }} />
                </div>
            </div>
            <div className="flex-1">
                <pre className="whitespace-pre-wrap">{s && JSON.stringify(s, null, 2)}</pre>
            </div>
        </div>
    )
}