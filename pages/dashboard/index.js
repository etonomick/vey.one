import { useRouter } from "next/router"
import { useState } from "react"
import useSWR from "swr"
import Button from "../../components/ui/Button"
import Heading from "../../components/ui/Heading"
import Input from "../../components/ui/Input"
import ProjectCard from "../../components/ui/ProjectCard"
import { useAppContext } from "../../context/state"
import fetcher from "../../utils/fetcher"
import { supabase } from "../../utils/supabaseClient"
import withToken from "../../utils/withToken"

export default function Projects() {

    const { data, error } = useSWR("/api/projects", fetcher)
    const { session } = useAppContext()
    const router = useRouter()

    const [newProject, setNewProject] = useState({
        title: "",
        description: ""
    })

    if (error) {
        return (
            <>
                <div>Failed to load projects</div>
            </>
        )
    }

    if (!data) {
        return (
            <div>
                Loading projects...
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-5">
            <Heading>Projects</Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {data && data.data.map(project => (
                    <ProjectCard project={project} />
                ))}
                <div className="p-5 border border-dashed flex items-start flex-col gap-3">
                    <pre>{JSON.stringify(newProject)}</pre>
                    <Input placeholder="Project Name" onChange={e => {
                        setNewProject({ ...newProject, ["title"]: e.target.value })
                    }} />
                    <Input placeholder="Short description" sm onChange={e => {
                        setNewProject({ ...newProject, ["description"]: e.target.value })
                    }} />
                    <Button onClick={async () => {
                        fetch("/api/projects/create", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": session.access_token
                            },
                            body: JSON.stringify({
                                title: newProject.title,
                                description: newProject.description
                            })
                        }).then(res => res.json()).then(data => {
                            router.push(`/dashboard/${data.data["id"]}`)
                        })
                    }}>Create</Button>
                </div>
            </div>
        </div>
    )
}