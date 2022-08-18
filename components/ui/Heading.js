export default function Heading({ children, md, sm }) {
    return (
        <div className={`flex items-center font-bold gap-3 font-serif text-neutral-800 ${md ? "text-3xl font-bold" : "text-5xl"}`}>{children}</div>
    )
}