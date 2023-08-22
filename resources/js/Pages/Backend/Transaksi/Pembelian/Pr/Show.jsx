import Loading from "@/Components/Loading";
import MasterAdmin from "@/Layouts/MasterAdmin";
import { Link, router } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import { AiFillPrinter } from "react-icons/ai";
import Swal from "sweetalert2";

export default function PrShowPage(props) {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            {isLoading && <Loading />}
            <MasterAdmin title={"Tambah Purchase Request"}>
                <div className="card bg-base-100 mb-2">
                    <div className="card-body">
                        <div className="grid grid-cols-3 gap-2">
                            <div className="form-group">
                                <label
                                    htmlFor=""
                                    className="label label-text text-xs"
                                >
                                    Nota
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered input-xs text-xs w-full"
                                    value={props.data.nota}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor=""
                                    className="label label-text text-xs"
                                >
                                    Tanggal
                                </label>
                                <input
                                    type="date"
                                    className="input input-bordered input-xs text-xs w-full"
                                    value={props.data.tgl}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor=""
                                    className="label label-text text-xs"
                                >
                                    Supplier
                                </label>
                                <div className="flex flex-row gap-1">
                                    <input
                                        type="text"
                                        className="input input-bordered input-xs text-xs w-full"
                                        value={props.data.supplier.nama}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="form-group">
                                <label
                                    htmlFor=""
                                    className="label label-text text-xs"
                                >
                                    Keterangan
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered input-xs text-xs w-full"
                                    value={props.data.ket}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor=""
                                    className="label label-text text-xs"
                                >
                                    Status
                                </label>
                                {props.data.status === "0" && (
                                    <div className="badge badge-secondary bg-rose-700 badge-lg text-[7pt]">
                                        Di Tolak
                                    </div>
                                )}
                                {props.data.status === "1" && (
                                    <div className="badge badge-ghost bg-yellow-400 text-gray-800 font-semibold badge-lg text-[7pt]">
                                        Pengajuan
                                    </div>
                                )}
                                {props.data.status === "2" && (
                                    <div className="badge badge-ghost bg-green-400 text-gray-800 font-semibold badge-lg text-[7pt]">
                                        ACC
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-row items-center">
                            <button className="btn btn-primary btn-sm  btn-square text-gray-100">
                                <AiFillPrinter />
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="table table-xs">
                                <thead className="bg-sky-800 text-[7pt] text-gray-200">
                                    <tr>
                                        <th>No</th>
                                        <th>Kode Stock</th>
                                        <th>Nama</th>
                                        <th>Satuan</th>
                                        <th>Qty. Stock</th>
                                        <th>Qty. Order</th>
                                        <th>Qty. Acc</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.data.tpr.map((d, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{d.bara1}</td>
                                            <td>{d.nama}</td>
                                            <td>{d.satuan}</td>
                                            <td>{d.qtys}</td>
                                            <td>{d.qtyo}</td>
                                            <td>{d.qtyj}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </MasterAdmin>
        </>
    );
}
