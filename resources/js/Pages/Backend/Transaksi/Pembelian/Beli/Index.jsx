import AddModal from "@/Components/AddModal";
import Loading from "@/Components/Loading";
import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import MasterAdmin from "@/Layouts/MasterAdmin";
import { Link, router } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillEye, AiFillPrinter, AiOutlineSearch } from "react-icons/ai";
import Swal from "sweetalert2";

export default function BeliPage(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [nota, setNota] = useState("");
    const [dataBeli, setDataBeli] = useState([]);

    useEffect(() => {
        setDataBeli(props.datas);
    }, []);

    return (
        <>
            {isLoading && <Loading />}
            <MasterAdmin title={"Pembelian"}>
                <div className="card bg-base-100 mb-2">
                    <div className="card-body">
                        <Link
                            href="/transaksi/pembelian/beli/tambah"
                            className="btn btn-ghost bg-sky-700 text-gray-100 btn-sm text-xs"
                        >
                            Buat Pembelian
                        </Link>
                        <div className="overflow-x-auto">
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="input input-bordered input-sm w-full text-xs my-2"
                                    placeholder="Search by Nota Beli"
                                    value={nota}
                                    // onKeyPress={(e) => getPrSearch(e)}
                                />
                            </div>
                            <table className="table table-xs">
                                <thead className="bg-sky-800 text-gray-100 text-[7pt]">
                                    <tr>
                                        <th>Tanggal</th>
                                        <th>Nilai</th>
                                        <th>Nota</th>
                                        <th>Nota PO</th>
                                        <th>Supplier</th>
                                        <th>Dibuat Oleh</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataBeli.data?.map((d, index) => (
                                        <tr key={index}>
                                            <td>{d.tgl}</td>
                                            <td>{d.netto}</td>
                                            <td>{d.nota}</td>
                                            <td>{d.supplier.nama}</td>
                                            <td>
                                                {d.status_beli === "0" && (
                                                    <div className="badge badge-secondary bg-rose-700 badge-sm text-[7pt]">
                                                       Belum
                                                    </div>
                                                )}
                                                {d.status_beli === "1" && (
                                                    <div className="badge badge-ghost bg-yellow-400 text-gray-800 font-semibold badge-sm text-[7pt]">
                                                        Ada
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                {d.nota_pr}
                                            </td>
                                            <td>{d.user.name}</td>
                                            <td>
                                                <div className="flex flex-row gap-1">
                                                    <Link
                                                        href={route(
                                                            "transaksi.pembelian.po.show",
                                                            d.nota
                                                        )}
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
                                                    {d.status_beli === "0" && (
                                                            <Link
                                                                href=""
                                                                className="btn btn-warning btn-xs text-[7pt]"
                                                            >
                                                                Buat Beli
                                                            </Link>
                                                        )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* {dataPr.length > 0 && (
                                <div className="mt-6 mx-auto">
                                    <Pagination links={dataPr?.links} />
                                </div>
                            )} */}
                        </div>
                    </div>
                </div>
            </MasterAdmin>
        </>
    );
}
