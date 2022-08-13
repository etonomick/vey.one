import { Tab } from "@headlessui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Editor from "../../components/layouts/Editor";
import Heading from "../../components/ui/Heading";
import Text from "../../components/ui/Text";
import Button from "../../components/ui/Button";
import useSWR from "swr";
import withToken from "../../utils/withToken"
import fetcher from "../../utils/fetcher"

export default function Project() {

    const router = useRouter()
    const { id } = router.query

    const { data, error } = useSWR(withToken(`/api/projects/${id}`), fetcher)

    if (error) {
        return (
            <div>error</div>
        )
    }

    return (
        <div className="flex flex-col gap-5">
            <Heading>{data.title}</Heading>
            <Text>{data.description}</Text>
            {data && JSON.stringify(data)}
            <Editor />
        </div>
    )
}