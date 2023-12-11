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
                        <div className="grid grid-col-2 gap-2">
                            <div>
                                <div className="form-group">
                                    <label htmlFor="" className="label label-text">Kode Supplier</label>
                                    <input type="text" className="input input-bordered input-sm" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="" className="label label-text">Nama Supplier</label>
                                    <input type="text" className="input input-bordered input-sm" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="" className="label label-text">Alamat</label>
                                    <input type="text" className="input input-bordered input-sm" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="" className="label label-text">Telepon</label>
                                    <input type="text" className="input input-bordered input-sm" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="" className="label label-text">Faximile</label>
                                    <input type="text" className="input input-bordered input-sm" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="" className="label label-text">e-mail</label>
                                    <input type="text" className="input input-bordered input-sm" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="" className="label label-text">Kontak</label>
                                    <input type="text" className="input input-bordered input-sm" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="" className="label label-text"></label>
                                    <input type="text" className="input input-bordered input-sm" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="" className="label label-text">Kode Supplier</label>
                                    <input type="text" className="input input-bordered input-sm" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MasterAdmin>
        </>
    );
}
