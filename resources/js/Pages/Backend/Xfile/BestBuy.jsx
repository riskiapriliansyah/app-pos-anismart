import MasterAdmin from "@/Layouts/MasterAdmin";
import { useState } from "react";
import { MdMan, MdWoman } from "react-icons/md";

export default function BestBuyPage(props) {
        const [isLoading, setIsLoading] = useState(false)
        return (
        <>
            <MasterAdmin title={"Best Buy"}>
                <div className="card bg-base-100 mb-2">
                    <div className="card-body">
                        
                    </div>
                </div>
            </MasterAdmin>
        </>
    );
}
