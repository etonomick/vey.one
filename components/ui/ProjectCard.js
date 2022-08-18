import Link from "./Link";
import Heading from "./Heading";
import Text from "./Text";
import Button from "./Button";

export default function ProjectCard({ project }) {

    const date = new Date(project.created_at)

    return (
        <div className="bg-white rounded-2xl flex flex-col gap-3 p-5">
            <div className="flex flex-col flex-1 gap-1">
                <Link href={`/dashboard/${project.id}`}><Heading md>{project.title}</Heading></Link>
                <Text>{project.description}</Text>
            </div>
            <div className="flex flex-row place-content-between">
                <div>{date.toLocaleDateString()}</div>
                <div>{project.slides[0].count} slides</div>
            </div>
            <div className="flex justify-end gap-3">
            <Button>Edit</Button>
                <Button>Edit</Button>
            </div>
        </div>
    )
}