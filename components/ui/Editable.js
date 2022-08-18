import { useEffect, useState } from "react"

export default function Editable({ children, onEnter, placeholder = "Placeholder" }) {

    const [edited, setEdited] = useState(children)

    function handleInput(e) {
        setEdited(e.currentTarget.textContent)
    }

    useEffect(() => {
        if (edited === "/") {
            // list of commands
        }
    }, [edited])

    return (
        <div className="text-4xl relative">
            <div contentEditable onInput={handleInput} className="appearance-none focus:outline-none break-all w-full h-auto relative z-10" onKeyDown={(e) => {
                if (e.key === "Enter") {
                    e.preventDefault()
                    onEnter && onEnter(edited)
                }
            }}>{children}</div>
            <div className={`top-0 ${edited ? "hidden" : "absolute"} z-0 left-0 top-0 select-none text-neutral-200`}>{placeholder}</div>
        </div>

    )
}