export default function Button({ children, onClick }) {
    return (
        <div className="items-center inline-flex justify-center bg-black text-white cursor-pointer px-3 py-2 rounded-2xl text-lg gap-3" onClick={onClick}>{children}</div>
    )
}