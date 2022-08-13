import { Tab } from "@headlessui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Editor from "../../components/layouts/Editor";
import Heading from "../../components/ui/Heading";
import Text from "../../components/ui/Text";
import Button from "../../components/ui/Button";

export default function Project() {

    const router = useRouter()
    const { id } = router.query

    return (
        <div className="flex flex-col gap-5">
            <Heading>{id} <Button>Start</Button></Heading>
            <Text>{id}</Text>
            <Editor />
        </div>
    )
}