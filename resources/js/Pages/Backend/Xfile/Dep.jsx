import AddModal from "@/Components/AddModal";
import EditModal from "@/Components/EditModal";
import Loading from "@/Components/Loading";
import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import MasterAdmin from "@/Layouts/MasterAdmin";
import { router } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import { MdMan, MdWoman } from "react-icons/md";
import Swal from "sweetalert2";

export default function DepPage(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [kode, setKode] = useState("");
    const [ket, setKet] = useState("");
    const [dataId, setDataId] = useState("");

    const store = async () => {
        setIsLoading(true);
        const data = {
            kode: kode,
            ket: ket,
        };

        await axios
            .post(route("dep.store"), data)
            .then((res) => {
                Swal.fire("Sukses", "Data berhasil disimpan", "success");
                router.get(route("dep"));
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    Swal.fire("Gagal", err.response.data.message, "error");
                }
            });

        setIsLoading(false);
    };

    const edit = async () => {
        setIsLoading(true);
        const data = {
            dataId: dataId,
            kode: kode,
            ket: ket,
        };

        await axios
            .post(route("dep.update"), data)
            .then((res) => {
                Swal.fire("Sukses", "Data berhasil diupdate", "success");
                router.get(route("dep"));
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    Swal.fire("Gagal", err.response.data.message, "error");
                }
            });

        setIsLoading(false);
    };

    const editHandle = (data) => {
        setDataId(data.id);
        setKode(data.kode);
        setKet(data.ket);
    };
    const clearHandle = () => {
        setKode("");
        setKet("");
    };

    return (
        <>
            {isLoading && <Loading />}
            <MasterAdmin title={"Departemen"}>
                <div className="card bg-base-100 mb-2">
                    <div className="card-body">
                        <button
                            className="btn btn-ghost bg-sky-700 text-gray-100 btn-sm text-xs"
                            onClick={() => window.my_modal_1.showModal()}
                        >
                            Tambah Data
                        </button>
                        <div className="overflow-x-auto">
                            <table className="table table-sm">
                                <thead className="bg-sky-800 text-gray-100">
                                    <tr>
                                        <th>Kode</th>
                                        <th>Keterangan</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.datas.data.map((d, index) => (
                                        <tr>
                                            <td className="text-[7pt]">
                                                {d.kode}
                                            </td>
                                            <td className="text-[7pt]">
                                                {d.ket}
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-warning btn-xs text-xs"
                                                    onClick={() => {
                                                        window.my_modal_1_edit.showModal();
                                                        editHandle(d);
                                                    }}
                                                >
                                                    Edit
                                                </button>
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

                <AddModal fun={store} clearHandle={clearHandle}>
                    <div className="form-group">
                        <label htmlFor="" className="label label-text">
                            Kode
                        </label>
                        <input
                            type="text"
                            className="input input-bordered input-sm w-full"
                            value={kode}
                            onChange={(e) => setKode(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="" className="label label-text">
                            Keterangan
                        </label>
                        <input
                            type="text"
                            className="input input-bordered input-sm w-full"
                            value={ket}
                            onChange={(e) => setKet(e.target.value)}
                        />
                    </div>
                </AddModal>

                <EditModal fun={edit} clearHandle={clearHandle}>
                    <div className="form-group">
                        <label htmlFor="" className="label label-text">
                            Kode
                        </label>
                        <input
                            type="text"
                            className="input input-bordered input-sm w-full"
                            value={kode}
                            onChange={(e) => setKode(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="" className="label label-text">
                            Keterangan
                        </label>
                        <input
                            type="text"
                            className="input input-bordered input-sm w-full"
                            value={ket}
                            onChange={(e) => setKet(e.target.value)}
                        />
                    </div>
                </EditModal>
            </MasterAdmin>
        </>
    );
}
