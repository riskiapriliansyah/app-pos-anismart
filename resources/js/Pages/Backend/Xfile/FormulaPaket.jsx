import MasterAdmin from "@/Layouts/MasterAdmin";
import { useState } from "react";
import { MdMan, MdWoman } from "react-icons/md";

export default function FormulaPaketPage(props) {
    const [isLoading, setIsLoading] = useState(false)
    return (
        <>
            <MasterAdmin title={"Formula Paket"}>
                <div className="card bg-base-100 mb-2">
                    <div className="card-body">
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label htmlFor="" className="label label-text">Kode Paket</label>
                                <input type="text" className="input input-bordered input-sm w-full" />
                            </div>
                            <div>
                                <label htmlFor="" className="label label-text">Nama Paket</label>
                                <input type="text" className="input input-bordered input-sm w-full" />
                            </div>
                            <div>
                                <label htmlFor="" className="label label-text">Harga Pokok</label>
                                <input type="text" className="input input-bordered input-sm w-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </MasterAdmin>
        </>
    );
}
