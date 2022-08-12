export default function ProjectCard({ project }) {
    return (
        <div>
            <pre className="whitespace-pre-wrap">{JSON.stringify(project, null, 2)}</pre>
        </div>
    )
}