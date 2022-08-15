import Link from "./Link";
import Heading from "./Heading";
import Text from "./Text";

export default function ProjectCard({ project }) {
    return (
        <div className="bg-white border border-gray-200 p-5 rounded flex flex-col gap-5 transition-all duration-200 hover:shadow-xl">
            <div className="flex-1">
                <Link href={`/dashboard/${project.id}`}><Heading md>{project.title}</Heading></Link>
                <Text>{project.description}</Text>
            </div>
            <div className="flex flex-row place-content-between">
                <div>{project.created_at}</div>
                <div>{project.slides[0].count} slides</div>
            </div>
        </div>
    )
}