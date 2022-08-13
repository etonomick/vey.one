import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import useSWR, { mutate } from "swr";
import fetcher from "../../utils/fetcher";
import { supabase } from "../../utils/supabaseClient";
import withToken from "../../utils/withToken";
import Input from "../ui/Input";

export default function Editor({ projectId }) {

    const { data: s, error } = useSWR(withToken(`/api/projects/${projectId}/slides`), fetcher)

    const [slides, setSlides] = useState([])

    useEffect(() => {
        if (s) setSlides(s.data.map((slide, index) => {
            return {...slide, ["position"]: index}
        }))
    }, [s])

    const [newSlideTitle, setNewSlideTitle] = useState("")

    function handleSlideDrag(res) {
        if (!res.destination) return
        const updated = Array.from(slides)
        const [reordered] = updated.splice(res.source.index, 1)
        updated.splice(res.destination.index, 0, reordered)
        setSlides(updated)
        updateSlides(updated)
    }

    function updateSlides (slides) {
        const update = slides.map((slide, index) => {
            return {
                id: slide.id,
                position: index
            }
        })
        fetch("/api/slides/update", {
            method: "POST",
            headers: {
                "Authorization": supabase.auth.session().access_token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(update)
        }).then(res => res.json()).then(data => {
            // make toast like message
        })
    }

    const [activeSlideId, setActiveSlideId] = useState(null)

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
                                                <div className="flex items-center gap-3 w-full">{index + 1}<div className={`cursor-pointer p-3 border ${activeSlideId === slide.id && "border-green-400"} rounded w-full`} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onClick={() => {
                                                    setActiveSlideId(slide.id)
                                                }}>
                                                    <div>{slide.title}</div>
                                                    <div>{slide.position}</div>
                                                    </div>
                                                </div>
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
                                    position: slides.length
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
                {activeSlideId ? activeSlideId : "Select slide from left"}
            </div>
        </div>
    )
}