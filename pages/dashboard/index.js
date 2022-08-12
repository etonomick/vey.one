import useSWR from "swr"
import Button from "../../components/ui/Button"
import Heading from "../../components/ui/Heading"
import Input from "../../components/ui/Input"
import ProjectCard from "../../components/ui/ProjectCard"
import fetcher from "../../utils/fetcher"
import { supabase } from "../../utils/supabaseClient"
import withToken from "../../utils/withToken"

export default function Projects() {

    const { data, error } = useSWR(withToken("/api/projects"), fetcher)

    if (error) {
        return (
            <div>Failed to load projects</div>
        )
    }

    if (!data) {
        return (
            <div>Loading projects...</div>
        )
    }

    return (
        <div className="flex flex-col gap-5">
            <Heading>Projects</Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {data && data.data.map(project => (
                    <ProjectCard project={project} />
                ))}
                {/* <ProjectCard /> */}
                {/* <div className="p-5 border border-dashed flex items-start flex-col gap-3">
                <Input placeholder="Project Name" />
                <Input placeholder="Short description" sm />
                <Button onClick={() => {
                    fetch("/api/projects/create", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": supabase.auth.session().access_token
                        },
                        body: JSON.stringify({
                            title: "api test",
                            description: ""
                        })
                    }).then(res => res.json()).then(data => alert(JSON.stringify(data)))
                }}>Create</Button>
            </div> */}
            </div>
        </div>
    )
}