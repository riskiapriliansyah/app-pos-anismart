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

export default function ReturBeliPage(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [nota, setNota] = useState("");
    const [dataReturBeli, setDataReturBeli] = useState([]);

    useEffect(() => {
        setDataReturBeli(props.datas);
    }, []);

    return (
        <>
            {isLoading && <Loading />}
            <MasterAdmin title={"Retur Pembelian"}>
                <div className="card bg-base-100 mb-2">
                    <div className="card-body">
                        <Link
                            href="/transaksi/pembelian/retur/tambah"
                            className="btn btn-ghost bg-sky-700 text-gray-100 btn-sm text-xs"
                        >
                            Buat Retur Pembelian
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
                                        <th>Nota faktur</th>
                                        <th>Supplier</th>
                                        <th>Dibuat Oleh</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataReturBeli.data?.map((d, index) => (
                                        <tr key={index}>
                                            <td>{d.tgl}</td>
                                            <td>{d.netto.toLocaleString("id")}</td>
                                            <td>{d.nota}</td>
                                            <td>{d.notar}</td>
                                            <td>{d.supplier.nama}</td>
                                            <td>{d.user.name}</td>
                                            <td>
                                                <div className="flex flex-row gap-1">
                                                    <Link
                                                        href={route(
                                                            "transaksi.pembelian.retur.show",
                                                            d.nota
                                                        )}
                                                        className="btn btn-primary bg-blue-700 text-base-100 btn-xs btn-square"
                                                        title="Show"
                                                    >
                                                        <AiFillEye />
                                                    </Link>
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
