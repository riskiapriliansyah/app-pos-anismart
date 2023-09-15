import Loading from "@/Components/Loading";
import { NotaPrToPrint } from "@/Components/Print/NotaPr";
import MasterAdmin from "@/Layouts/MasterAdmin";
import { Link, router } from "@inertiajs/react";
import axios from "axios";
import React from "react";
import { useRef, useState } from "react";
import { AiFillPrinter } from "react-icons/ai";
import ReactToPrint from "react-to-print";
import Swal from "sweetalert2";

export default function PrApproveShowPage(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [dataPr, setDataPr] = useState(props.data)
    const [dataTb, setDataTb] = useState(props.data.tpr)

    const [forceRender, setForceRender] = useState(false);
    const xForceRender = () => {
        setForceRender(!forceRender);
    };

    const updateData = async () => {
        const header = {
            nota: dataPr.nota
        }

        const data = {
            header: header,
            body: dataTb,
        };

        await axios
            .post(route("transaksi.pembelian.pr.approved"), data)
            .then((res) => {
                Swal.fire("Sukses", "PR Berhasil diapproved", "success");
                router.get(route("transaksi.pembelian.pr.approve"));
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    Swal.fire("Gagal", err.response.data.message, "error");
                }
            });
    }
    return (
        <>
            {isLoading && <Loading />}
            <MasterAdmin title={"Show PR"}>
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
                                    value={dataPr.nota}
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
                                    value={dataPr.tgl}
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
                                        value={dataPr.supplier.nama}
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
                                    value={dataPr.ket}
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
                                {dataPr.status === "0" && (
                                    <div className="badge badge-secondary bg-rose-700 badge-lg text-[7pt]">
                                        Di Tolak
                                    </div>
                                )}
                                {dataPr.status === "1" && (
                                    <div className="badge badge-ghost bg-yellow-400 text-gray-800 font-semibold badge-lg text-[7pt]">
                                        Pengajuan
                                    </div>
                                )}
                                {dataPr.status === "2" && (
                                    <div className="badge badge-ghost bg-green-400 text-gray-800 font-semibold badge-lg text-[7pt]">
                                        ACC
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-1">
                            <button className="btn btn-accent bg-green-700 btn-sm text-gray-200" onClick={updateData}>
                                Simpan
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
                                    {dataTb.map((d, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{d.bara1}</td>
                                            <td>{d.nama}</td>
                                            <td>{d.satuan}</td>
                                            <td>{d.qtys}</td>
                                            <td>{d.qtyo}</td>
                                            <td><input
                                                type="number"
                                                className="input input-bordered input-xs text-xs"
                                                value={d.qtyj}
                                                onChange={(e) => {
                                                    dataTb[index].qtyj =
                                                        e.target.value;
                                                    setDataTb(dataTb);
                                                    xForceRender();
                                                }}
                                            /></td>
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
