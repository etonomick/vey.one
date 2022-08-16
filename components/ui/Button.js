export default function Button({ children, onClick, ghost }) {
    return (
        <div className={`transition-all duration-300 items-center inline-flex justify-center  cursor-pointer px-3 py-2 rounded text-lg gap-3 ${!ghost ? "bg-black text-white" : "bg-transparent w-8 h-8 px-0 py-0"} hover:text-green-500`} onClick={onClick}>{children}</div>
    )
}