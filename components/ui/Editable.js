import { useEffect, useState } from "react"

export default function Editable({ children, onEnter }) {

    const [edited, setEdited] = useState(children)

    function handleInput(e) {
        setEdited(e.currentTarget.textContent)
    }

    useEffect(() => {

    }, [edited])

    return (
        <div className="text-4xl relative">
            <div contentEditable onInput={handleInput} className="appearance-none focus:outline-none break-all w-full bg-pink-500/50 left-0 right-0 flex" onKeyDown={(e) => {
                if (e.key === "Enter") {
                    e.preventDefault()
                    onEnter && onEnter(edited)
                }
            }}>{children}</div>
            {!edited && <span className="absolute top-0 select-none text-neutral-200">Untitled</span>}
        </div>

    )
}