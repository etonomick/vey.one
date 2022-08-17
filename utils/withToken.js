import { useState } from "react";
import { useAppContext } from "../context/state";
import { supabase } from "./supabaseClient";

export default function withToken(endpoint, session) {

    const { access_token } = session

    return [
        endpoint,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${access_token}`
            }
        }
    ]
}