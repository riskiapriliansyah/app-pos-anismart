import MasterAdmin from "@/Layouts/MasterAdmin";
import { useState } from "react";
import { MdMan, MdWoman } from "react-icons/md";

export default function MasterStockPage(props) {
        const [isLoading, setIsLoading] = useState(false)
        return (
        <>
            <MasterAdmin title={"Master Stock"}>
                <div className="card bg-base-100 mb-2">
                    <div className="card-body">
                        
                    </div>
                </div>
            </MasterAdmin>
        </>
    );
}
