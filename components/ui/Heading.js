export default function Heading({ children, md }) {
    return (
        <div className={`flex items-center font-bold gap-3 ${md ? "text-xl font-bold" : "text-5xl"}`}>{children}</div>
    )
}