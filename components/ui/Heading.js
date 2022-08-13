export default function Heading({ children, md }) {
    return (
        <div className={`flex items-center gap-3 ${md ? "text-3xl" : "text-5xl"}`}>{children}</div>
    )
}