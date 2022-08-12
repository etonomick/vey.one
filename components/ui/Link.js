import NextLink from "next/link"

export default function Link({ href, children }) {
    return (
        <NextLink href={href}>
            <a>
                <div className="border-b-2 border-black inline-block">{children}</div>
            </a>
        </NextLink>
    )
}