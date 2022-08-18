import { useEffect, useState } from "react"

export default function Editable({ id, children }) {

    const [edited, setEdited] = useState(children)

    function handleInput(e) {
        setEdited(e.currentTarget.textContent)
    }

    useEffect(() => {
        
    }, [edited])

    return (
        <div className="inline-flex text-4xl relative">
            <div contentEditable onInput={handleInput} className="appearance-none focus:outline-none break-all w-full z-10" onKeyDown={(e) => {
                if (e.key === "Enter") {
                    // update
                }
            }}>{children}</div>
            {!edited && <div className="absolute top-0 select-none text-neutral-200">Untitled</div>}
        </div>
    )
}