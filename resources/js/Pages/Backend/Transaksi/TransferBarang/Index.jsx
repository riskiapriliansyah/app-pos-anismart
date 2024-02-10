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

export default function TransferBarangPage(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [nota, setNota] = useState("");
    const [dataTransferBarang, setDataTransferBarang] = useState([]);

    useEffect(() => {
        setDataTransferBarang(props.datas);
    }, []);

    return (
        <>
            {isLoading && <Loading />}
            <MasterAdmin title={"Transfer Barang"}>
                <div className="card bg-base-100 mb-2">
                    <div className="card-body">
                        <Link
                            href={route('transaksi.penjualan.transferBarang.add')}
                            className="btn btn-ghost bg-sky-700 text-gray-100 btn-sm text-sm"
                        >
                            Buat Transfer Barang
                        </Link>
                        <div className="overflow-x-auto">
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="input input-bordered input-sm w-full text-sm my-2"
                                    placeholder="Search by Nota"
                                    value={nota}
                                // onKeyPress={(e) => getPrSearch(e)}
                                />
                            </div>
                            <table className="table table-sm">
                                <thead className="bg-sky-800 text-gray-100 text-sm">
                                    <tr>
                                        <th>Tanggal</th>
                                        <th>Nota</th>
                                        <th>Kirim Dari</th>
                                        <th>Transfer Ke</th>
                                        <th>Dibuat Oleh</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataTransferBarang.data?.map((d, index) => (
                                        <tr key={index}>
                                            <td>{d.tgl}</td>
                                            <td>{d.nota}</td>
                                            <td>{d.dari_toko.ket}</td>
                                            <td>{d.ke_toko.ket}</td>
                                            <td>{d.user.name}</td>
                                            <td>
                                                <div className="flex flex-row gap-1">
                                                    <Link
                                                        href={route(
                                                            "transaksi.penjualan.transferBarang.show",
                                                            d.nota
                                                        )}
                                                        className="btn btn-primary bg-blue-700 text-base-100 btn-sm btn-square"
                                                        title="Show"
                                                    >
                                                        <AiFillEye />
                                                    </Link>
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
