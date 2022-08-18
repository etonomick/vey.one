import Link from "./Link";
import Heading from "./Heading";
import Text from "./Text";
import Button from "./Button";

export default function ProjectCard({ project }) {

    const date = new Date(project.created_at)

    return (
        <div className="bg-white rounded-3xl flex flex-col gap-3 p-5 border border-neutral-200">
            <div className="flex flex-col flex-1 gap-1 border-b pb-3">
                <Link href={`/dashboard/${project.id}`}><Heading md>{project.title}</Heading></Link>
                <Text>{project.description}</Text>
            </div>
            <div className="flex flex-row place-content-between text-gray-400">
                <div>{date.toLocaleDateString()}</div>
                <div>{project.slides[0].count} slides</div>
            </div>
            <div className="flex justify-end gap-3">
                <Button>Delete</Button>
                <Button>Edit</Button>
            </div>
        </div>
    )
}