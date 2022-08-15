import { useState } from "react"
import { MdOutlineApproval } from "react-icons/md"
import Button from "../ui/Button"

export default function Editable({ children }) {

    const [update, setUpdate] = useState(null)

    return (
        <>
            {update && update}
            <div contentEditable onInput={(e) => {
                setUpdate(e.currentTarget.textContent)
            }} className="text-4xl font-bold appearance-none focus:outline-none">{children}</div>
            {update && <Button onClick={() => {

            }}><MdOutlineApproval /></Button>}
        </>
    )
}