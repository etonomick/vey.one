import { useEffect, useState } from "react"

export default function Editable({ id, children }) {

    const [edited, setEdited] = useState(children)

    function handleInput(e) {
        setEdited(e.currentTarget.textContent)
    }

    useEffect(() => {
        
    }, [edited])

    return (
        <div className="inline-flex text-4xl">
            <div contentEditable onInput={handleInput} className="appearance-none focus:outline-none break-all w-full z-10">{children}</div>
            {!edited && <div className="absolute select-none text-neutral-200">Untitled</div>}
        </div>
    )
}