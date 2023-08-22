import { Head, usePage } from "@inertiajs/react";
import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
export default function MasterAdmin({ children, title }) {
    const { auth } = usePage().props; 

    return (
        <div className="flex flex-nowrap">
            <Head title={title}/>
            <Sidebar auth={auth}/>
            <div className="bg-gray-200 w-full">
                <Topbar title={title} auth={auth.user}/>
                <main className="ml-0 lg:ml-64 mt-16 px-5 py-5 min-h-screen">
                    {children}
                </main>
            </div>
        </div>
    );
}
