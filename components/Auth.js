import { useEffect, useMemo, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import Button from "./ui/Button";
import Vey from "./ui/Vey";
import Heading from "./ui/Heading";
import { FaDiscord } from "react-icons/fa";

export default function Auth() {

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center gap-5">
            <Vey />
            <div className="bg-white p-8 rounded-3xl flex flex-col gap-5 items-center justify-center">
            
            <Heading>Sign In</Heading>
            <Button onClick={() => {
                supabase.auth.signInWithOAuth({
                    provider: "discord"
                })
            }}><FaDiscord /> Discord</Button>
            </div>
        </div>
    )
}