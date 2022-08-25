export default function Heading({ children, md, sm }) {
    return (
        <div className={`flex items-center gap-3 font-serif font-bold text-neutral-800 ${md ? "text-4xl font-bold" : "text-6xl"}`}>{children}</div>
    )
}