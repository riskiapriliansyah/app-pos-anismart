import MasterAdmin from "@/Layouts/MasterAdmin";
import { useState } from "react";
import { MdMan, MdWoman } from "react-icons/md";

export default function SupplierPage(props) {
        const [isLoading, setIsLoading] = useState(false)
        return (
        <>
            <MasterAdmin title={"Supplier"}>
                <div className="card bg-base-100 mb-2">
                    <div className="card-body">
                        
                    </div>
                </div>
            </MasterAdmin>
        </>
    );
}
