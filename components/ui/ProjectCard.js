import Link from "./Link";

export default function ProjectCard({ project }) {
    return (
        <div>
            <Link href={`/dashboard/${project.id}`}>{project.title}</Link>
            <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(project, null, 2)}</pre>
        </div>
    )
}