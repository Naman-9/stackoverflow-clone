"use client";
import { useAuthStore } from "@/store/Auth"
import { useRouter } from "next/router";
import React from "react";


// all the sub folders and sub files are containerize


const Layout = ({children}: {children: React.ReactNode}) => {

{
    //  if session no point to keep user in this page
    const {session}  = useAuthStore();
    const router = useRouter();

    React.useEffect(() => {

        // if user have session -> redirect to "HOME"
        if (session) {
            router.push("/")
        }
    }, [session, router])

    //  if session is there return null
    if(session) {
        return null
    }

    return (

        // if no session then load children i.e. "login", "register", ...
        <div className="">
            <div className="">
                {children}
            </div>
        </div>
    )
}
}

export default Layout