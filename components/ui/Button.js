export default function Button({ children, onClick, ghost }) {
    return (
        <div className={`flex items-center border-2 border-indigo-500 text-indigo-500 rounded-full px-3 py-2 cursor-pointer select-none hover:bg-indigo-500 hover:text-white transition-all duration-200`} onClick={onClick}>{children}</div>
    )
}