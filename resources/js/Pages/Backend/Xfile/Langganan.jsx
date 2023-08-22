import MasterAdmin from "@/Layouts/MasterAdmin";
import { useState } from "react";
import { MdMan, MdWoman } from "react-icons/md";

export default function LanggananPage(props) {
        const [isLoading, setIsLoading] = useState(false)
        return (
        <>
            <MasterAdmin title={"Langganan"}>
                <div className="card bg-base-100 mb-2">
                    <div className="card-body">
                        
                    </div>
                </div>
            </MasterAdmin>
        </>
    );
}
