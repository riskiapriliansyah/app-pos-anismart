import AddModal from "@/Components/AddModal";
import Loading from "@/Components/Loading";
import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import MasterAdmin from "@/Layouts/MasterAdmin";
import { Link, router } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import { AiFillPrinter, AiOutlineSearch } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import ReactToPrint from "react-to-print";
import Swal from "sweetalert2";

export default function TransferBarangAddPage(props) {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <>
            {isLoading && <Loading />}
            <MasterAdmin title={"Tambah Retur Penjualan"}>
                <div className="card bg-base-100 mb-2">
                    <div className="card-body">
                        <div className="grid grid-cols-3 gap-2">
                            <div className="form-group">
                                <label
                                    htmlFor=""
                                    className="label label-text text-sm -mb-2.5"
                                >
                                    Nomor Faktur
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered input-sm text-sm w-full"
                                    value={props.data.nota}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor=""
                                    className="label label-text text-sm -mb-2.5"
                                >
                                    Kirim Dari
                                </label>
                                <div className="flex flex-row gap-1">
                                    <input
                                        type="text"
                                        className="input input-bordered input-sm text-sm w-full"
                                        value={props.data.dari_toko.ket}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor=""
                                    className="label label-text text-sm -mb-2.5"
                                >
                                    Transfer Ke
                                </label>
                                <div className="flex flex-row gap-1">
                                    <input
                                        type="text"
                                        className="input input-bordered input-sm text-sm w-full"
                                        value={props.data.ke_toko.ket}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor=""
                                    className="label label-text text-sm -mb-2.5"
                                >
                                    Tanggal
                                </label>
                                <input
                                    type="date"
                                    className="input input-bordered input-sm text-sm w-full"
                                    value={props.data.tgl}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor=""
                                    className="label label-text text-sm -mb-2.5"
                                >
                                    Keterangan
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered input-sm text-sm w-full"
                                    value={props.data.ket}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-1">
                            <ReactToPrint
                                trigger={() => (
                                    <button className="btn btn-primary btn-sm btn-square text-gray-100">
                                        <AiFillPrinter />
                                    </button>
                                )}
                                content={() => componentRef.current}
                                documentTitle={props.data.nota}
                            />
                            <Link
                                href={route("transaksi.penjualan.transferBarang")}
                                className="btn btn-ghost border-black btn-sm text-gray-800"
                            >
                                Kembali
                            </Link>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="table table-sm">
                                <thead className="bg-sky-800 text-sm text-gray-200">
                                    <tr>
                                        <th>Kode Stock</th>
                                        <th>Nama Barang</th>
                                        <th>Qty</th>
                                        <th>Satuan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.data.tpindah.map((d, index) => (
                                        <tr>
                                            <td className="text-sm">
                                                {d.bara}
                                            </td>
                                            <td className="text-sm">
                                                {d.nama}
                                            </td>
                                            <td className="text-sm">
                                                {d.qty}
                                            </td>
                                            <td className="text-sm">
                                                {d.satuan}
                                            </td>
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
