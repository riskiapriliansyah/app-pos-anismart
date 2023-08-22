import AddModal from "@/Components/AddModal";
import Loading from "@/Components/Loading";
import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import MasterAdmin from "@/Layouts/MasterAdmin";
import { Link, router } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import { AiFillEye, AiFillPrinter, AiOutlineSearch } from "react-icons/ai";
import Swal from "sweetalert2";

export default function PrPage(props) {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <>
            {isLoading && <Loading />}
            <MasterAdmin title={"Purchase Request"}>
                <div className="card bg-base-100 mb-2">
                    <div className="card-body">
                        <Link
                            href="/transaksi/pembelian/pr/tambah"
                            className="btn btn-ghost bg-sky-700 text-gray-100 btn-sm text-xs"
                        >
                            Buat PR
                        </Link>
                        <div className="overflow-x-auto">
                            <table className="table table-xs">
                                <thead className="bg-sky-800 text-gray-100 text-[7pt]">
                                    <tr>
                                        <th>Tanggal</th>
                                        <th>No. PR</th>
                                        <th>Supplier</th>
                                        <th>Status</th>
                                        <th>PO</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.datas.data.map((d, index) => (
                                        <tr key={index}>
                                            <td>{d.tgl}</td>
                                            <td>{d.nota}</td>
                                            <td>{d.supplier.nama}</td>
                                            <td>
                                                {d.status === "0" && (
                                                    <div className="badge badge-secondary bg-rose-700 badge-sm text-[7pt]">
                                                        Di Tolak
                                                    </div>
                                                )}
                                                {d.status === "1" && (
                                                    <div className="badge badge-ghost bg-yellow-400 text-gray-800 font-semibold badge-sm text-[7pt]">
                                                        Pengajuan
                                                    </div>
                                                )}
                                                {d.status === "2" && (
                                                    <div className="badge badge-ghost bg-green-400 text-gray-800 font-semibold badge-sm text-[7pt]">
                                                        ACC
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                {d.status_po === "0" && (
                                                    <div className="badge badge-secondary bg-rose-700 badge-sm text-[7pt]">
                                                        Belum Ada
                                                    </div>
                                                )}
                                                {d.status_po === "2" && (
                                                    <div className="badge badge-ghost bg-green-400 text-gray-800 font-semibold badge-sm text-[7pt]">
                                                        Sudah Ada
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                <div className="flex flex-row gap-1">
                                                    <Link
                                                        href={route('transaksi.pembelian.pr.show', d.nota)}
                                                        className="btn btn-primary bg-blue-700 text-base-100 btn-xs btn-square"
                                                        title="Show PR"
                                                    >
                                                        <AiFillEye />
                                                    </Link>
                                                    <button
                                                        className="btn btn-accent bg-green-700 text-base-100 btn-xs btn-square"
                                                        title="Print PR"
                                                    >
                                                        <AiFillPrinter />
                                                    </button>
                                                    {d.status_po === "0" &&
                                                        d.status === "2" && (
                                                            <Link
                                                                href=""
                                                                className="btn btn-warning btn-xs text-[7pt]"
                                                            >
                                                                Buat PO
                                                            </Link>
                                                        )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="mt-6 mx-auto">
                                <Pagination links={props.datas?.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </MasterAdmin>
        </>
    );
}
