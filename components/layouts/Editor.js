import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function Editor() {

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

    function handleSlideDrag(res) {
        if (!res.destination) return
        const updated = Array.from(slides)
        const [reordered] = updated.splice(res.source.index, 1)
        updated.splice(res.destination.index, 0, reordered)
        setSlides(updated)
    }

    return (
        <div className="w-full flex">
            <div className="w-64">
                <DragDropContext onDragEnd={handleSlideDrag}>
                    <Droppable droppableId="slides">
                        {(provided) => (
                            <div className="flex flex-col gap-3" {...provided.droppableProps} ref={provided.innerRef}>
                                {slides.map((slide, index) => {
                                    return (
                                        <Draggable index={index} key={slide.id} draggableId={slide.id}>
                                            {(provided) => (
                                                <div className="cursor-pointer p-3 border rounded" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>{slide.title}</div>
                                            )}
                                        </Draggable>
                                    )
                                })}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
            <div className="flex-1">
                content
            </div>
        </div>
    )
}