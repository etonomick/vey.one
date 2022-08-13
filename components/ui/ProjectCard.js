import Link from "./Link";
import Heading from "./Heading";
import Text from "./Text";

export default function ProjectCard({ project }) {
    return (
        <div>
            <Link href={`/dashboard/${project.id}`}><Heading md>{project.title}</Heading></Link>
            <Text>{project.description}</Text>
            <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(project, null, 2)}</pre>
        </div>
    )
}