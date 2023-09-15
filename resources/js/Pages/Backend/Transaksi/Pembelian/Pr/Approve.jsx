import Loading from "@/Components/Loading";
import Pagination from "@/Components/Pagination";
import MasterAdmin from "@/Layouts/MasterAdmin";
import { Link, router } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillEye, AiFillPrinter, AiOutlineCheck, AiOutlineSearch } from "react-icons/ai";
import Swal from "sweetalert2";

export default function PrApprovePage(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [nota, setNota] = useState("");
    const [dataPr, setDataPr] = useState([]);

    const getPrSearch = async (e) => {
        if (e.key === "Enter") {
            setIsLoading(true);
            const data = {
                nota: nota,
            };
            await axios
                .get(route("api.getPrSearch"), data)
                .then((res) => {
                    setDataPr(res.data.data);
                })
                .catch((err) => {
                    if (err.response.status === 404) {
                        Swal.fire("Gagal", err.response.data.message, "error");
                    }
                });
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setDataPr(props.datas);
    }, []);

    return (
        <>
            {isLoading && <Loading />}
            <MasterAdmin title={"Purchase Request"}>
                <div className="card bg-base-100 mb-2">
                    <div className="card-body">
                        <div className="overflow-x-auto">
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="input input-bordered input-sm w-full text-xs my-2"
                                    placeholder="Search by NO PR"
                                    value={nota}
                                    onKeyPress={(e) => getPrSearch(e)}
                                />
                            </div>
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
                                    {dataPr.data?.map((d, index) => (
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
                                                        Belum
                                                    </div>
                                                )}
                                                {d.status_po === "1" && (
                                                    <div className="badge badge-ghost bg-green-400 text-gray-800 font-semibold badge-sm text-[7pt]">
                                                        Ada
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                <div className="flex flex-row gap-1">
                                                    <Link
                                                        href={route(
                                                            "transaksi.pembelian.pr.approve.show",
                                                            d.nota
                                                        )}
                                                        className="btn btn-accent bg-green-700 text-base-100 btn-xs btn-square"
                                                        title="Aprrove PR"
                                                    >
                                                        <AiOutlineCheck />
                                                    </Link>
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
