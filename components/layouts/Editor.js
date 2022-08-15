import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import useSWR, { mutate } from "swr";
import fetcher from "../../utils/fetcher";
import { supabase } from "../../utils/supabaseClient";
import withToken from "../../utils/withToken";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Heading from "../ui/Heading";
import { MdDeleteOutline, MdOutlineContentCopy } from "react-icons/md"
import SlideEditor from "./SlideEditor";

export default function Editor({ projectId }) {

    const { data: s, error } = useSWR(withToken(`/api/projects/${projectId}/slides`), fetcher)

    const [slides, setSlides] = useState([])

    useEffect(() => {
        if (s) setSlides(s.data.map((slide, index) => {
            return { ...slide, ["position"]: index }
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

    function updateSlides(slides) {
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

    const [activeSlide, setActiveSlide] = useState(null)

    return (
        <div className="w-full flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-64 flex flex-col gap-5">
                {slides.length === 0 && <>You have no slides</>}
                <DragDropContext onDragEnd={handleSlideDrag}>
                    <Droppable droppableId="slides">
                        {(provided) => (
                            <div className="flex flex-row snap-mandatory snap-x md:flex-col gap-1 overflow-x-auto" {...provided.droppableProps} ref={provided.innerRef}>
                                {slides.map((slide, index) => {

                                    const active = activeSlide && activeSlide.id === slide.id

                                    return (
                                        <Draggable index={index} key={slide.id} draggableId={slide.id}>
                                            {(provided) => (
                                                <div className={`snap-center transition-all duration-250 ${active ? "bg-gray-50" : "bg-transparent hover:bg-white/30"} p-5 rounded flex flex-col md:flex-row gap-2`}><div className={`cursor-pointer h-full w-52 md:w-full`} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onClick={() => {
                                                    setActiveSlide(slide)
                                                }}>
                                                    <div className="text-xl">{index + 1} {slide.title}</div>
                                                    <div className="text-xs">{slide.id}</div>
                                                </div>
                                                    <div className={`flex flex-row md:flex-col items-center place-content-between md:place-content-start gap-2`}>
                                                        {/* <div className="text-xs">{index + 1}</div> */}
                                                        <div><Button ghost onClick={() => {
                                                            fetch("/api/slides/create", {
                                                                method: "POST",
                                                                headers: {
                                                                    "Authorization": supabase.auth.session().access_token,
                                                                    "Content-Type": "application/json"
                                                                },
                                                                body: JSON.stringify({
                                                                    project_id: projectId,
                                                                    title: slide.title,
                                                                    position: slides.length + 1
                                                                })
                                                            }).then(_ => mutate(withToken(`/api/projects/${projectId}/slides`)))
                                                        }}><MdOutlineContentCopy /></Button></div>
                                                        <div><Button ghost onClick={() => {
                                                            setActiveSlide(null)
                                                            fetch(`/api/slides/${slide.id}`, {
                                                                method: "DELETE",
                                                                headers: {
                                                                    "Authorization": supabase.auth.session().access_token,
                                                                }
                                                            }).then(res => res.json()).then(() => {
                                                                mutate(withToken(`/api/projects/${projectId}/slides`))
                                                            })
                                                        }}><MdDeleteOutline /></Button></div>
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
                                mutate(withToken(`/api/projects/${projectId}/slides`))
                            })
                        }
                    }} />
                </div>
            </div>
            <div className="flex-1">
                <div className="w-full h-80 rounded-2xl">
                    {!activeSlide && "Select slide from left"}
                    <div>
                        {activeSlide && <SlideEditor slide={activeSlide && activeSlide} />}
                        {/* {activeSlide && <SlideEditor slide={activeSlide} />} */}
                    </div>
                </div>
            </div>
        </div>
    )
}