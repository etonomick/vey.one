export default function Button({ children, onClick }) {
    return (
        <div className="items-center inline-flex justify-center bg-black text-white cursor-pointer px-3 py-2 rounded" onClick={onClick}>{children}</div>
    )
}