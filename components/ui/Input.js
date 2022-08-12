import { useState } from "react"

export default function Input({ type = "text", placeholder = "", sm = false, onChange, defaultValue="" }) {
    return (
        <div>
            <input onChange={onChange} defaultValue={defaultValue} placeholder={placeholder} className={`appearance-none focus:outline-none ${sm ? "text-lg" : "text-2xl"}`} />
        </div>
    )
}