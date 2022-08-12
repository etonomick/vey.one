import NextLink from "next/link"

export default function Link({ href, children }) {
    return (
        <NextLink href={href}>
            <a>
                <div className="cursor-pointer">{children}</div>
            </a>
        </NextLink>
    )
}