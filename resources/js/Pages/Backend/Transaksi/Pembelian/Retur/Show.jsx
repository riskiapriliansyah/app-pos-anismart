import AddModal from "@/Components/AddModal";
import Loading from "@/Components/Loading";
import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import { NotaReturToPrint } from "@/Components/Print/NotaRetur";
import MasterAdmin from "@/Layouts/MasterAdmin";
import { Link, router } from "@inertiajs/react";
import axios from "axios";
import { useRef, useState } from "react";
import { AiFillPrinter, AiOutlineSearch } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import ReactToPrint from "react-to-print";
import Swal from "sweetalert2";

export default function ReturBeliShowPage(props) {
    const [isLoading, setIsLoading] = useState(false);
    const componentRef = useRef();
    return (
        <>
            {isLoading && <Loading />}
            <MasterAdmin title={"Tambah Retur Pembelian"}>
                <div className="hidden">
                    <NotaReturToPrint ref={componentRef} data={props.data} />
                </div>
                <div className="card bg-base-100 mb-2">
                    <div className="card-body">
                        <div className="grid grid-cols-3 gap-2">
                            <div className="form-group">
                                <label
                                    htmlFor=""
                                    className="label label-text text-[7pt] -mb-2.5"
                                >
                                    Nomor Retur
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
                                    className="label label-text text-[7pt] -mb-2.5"
                                >
                                    Gudang
                                </label>
                                <div className="flex flex-row gap-1">
                                    <input
                                        type="text"
                                        className="input input-bordered input-xs text-xs w-full"
                                        value={props.data.lok}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor=""
                                    className="label label-text text-[7pt] -mb-2.5"
                                >
                                    Ret. Faktur
                                </label>
                                <div className="flex flex-row gap-1">
                                    <input
                                        type="text"
                                        className="input input-bordered input-xs text-xs w-full"
                                        value={props.data.notar}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor=""
                                    className="label label-text text-[7pt] -mb-2.5"
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
                            <div className="form-group">
                                <label
                                    htmlFor=""
                                    className="label label-text text-[7pt] -mb-2.5"
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
                                    className="label label-text text-[7pt] -mb-2.5"
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
                                href={route("transaksi.pembelian.returPembelian")}
                                className="btn btn-ghost border-black btn-sm text-gray-800"
                            >
                                Kembali
                            </Link>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="table table-xs">
                                <thead className="bg-sky-800 text-[7pt] text-gray-200">
                                    <tr>
                                        <th>Kode Stock</th>
                                        <th>Nama Barang</th>
                                        <th>Qty</th>
                                        <th>Satuan</th>
                                        <th>@Harga</th>
                                        <th>Disc(%)</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.data.rtbeli.map((d, index) => (
                                        <tr>
                                            <td className="text-[7pt]">
                                                {d.bara1}
                                            </td>
                                            <td className="text-[7pt]">
                                                {d.nama}
                                            </td>
                                            <td className="text-[7pt]">
                                                {d.qty}
                                            </td>
                                            <td className="text-[7pt]">
                                                {d.satuan}
                                            </td>
                                            <td className="text-[7pt]">
                                                {d.hbeli}
                                            </td>
                                            <td className="text-[7pt]">
                                                {d.disc}
                                            </td>
                                            <td className="text-[7pt]">
                                                {d.total.toLocaleString("id")}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan={6} className="text-right">
                                            Sub Total:
                                        </td>
                                        <td colSpan={2}>
                                            Rp.{" "}
                                            {props.data.netto.toLocaleString(
                                                "id"
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={6} className="text-right">
                                            Disc:{" "}
                                            <input
                                                type="text"
                                                className="w-12 input input-bordered input-xs text-xs text-center"
                                                value={props.data.disc}
                                                readOnly
                                            />
                                        </td>
                                        <td colSpan={2}>
                                            Rp.{" "}
                                            {props.data.ndisc.toLocaleString(
                                                "id"
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={6} className="text-right">
                                            PPN:{" "}
                                            <input
                                                type="text"
                                                className="w-12 input input-bordered input-xs text-xs text-center"
                                                value={props.data.pph}
                                                readOnly
                                            />
                                        </td>
                                        <td colSpan={2}>
                                            Rp.{" "}
                                            {props.data.npph.toLocaleString(
                                                "id"
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={6} className="text-right">
                                            Total:
                                        </td>
                                        <td colSpan={2}>
                                            Rp.{" "}
                                            {props.data.netto.toLocaleString(
                                                "id"
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </MasterAdmin>
        </>
    );
}
