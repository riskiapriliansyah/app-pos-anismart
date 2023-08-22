import AddModal from "@/Components/AddModal";
import EditModal from "@/Components/EditModal";
import Pagination from "@/Components/Pagination";
import MasterAdmin from "@/Layouts/MasterAdmin";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { MdMan, MdWoman } from "react-icons/md";
import Swal from "sweetalert2";

export default function SdepPage(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [dep, setDep] = useState("");
    const [kode, setKode] = useState("");
    const [ket, setKet] = useState("");
    const [dataId, setDataId] = useState("");

    const store = async () => {
        setIsLoading(true);
        const data = {
            dep: dep,
            kode: kode,
            ket: ket,
        };

        await axios
            .post(route("sdep.store"), data)
            .then((res) => {
                Swal.fire("Sukses", "Data berhasil disimpan", "success");
                router.get(route("sdep"));
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    Swal.fire("Gagal", err.response.data.message, "error");
                }
            });

        setIsLoading(false);
    };

    const editDep = async () => {
        setIsLoading(true);
        const data = {
            dataId: dataId,
            dep: dep,
            kode: kode,
            ket: ket,
        };

        await axios
            .post(route("sdep.update"), data)
            .then((res) => {
                Swal.fire("Sukses", "Data berhasil diupdate", "success");
                router.get(route("sdep"));
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
        setDep(data.dep)
        setKode(data.kode);
        setKet(data.ket);
    };
    const clearHandle = () => {
        setKode("");
        setKet("");
    };

    return (
        <>
            <MasterAdmin title={"Sub Departemen"}>
                <div className="card bg-base-100 mb-2">
                    <div className="card-body">
                        <button
                            className="btn btn-ghost bg-sky-700 text-gray-100 btn-sm text-xs"
                            onClick={() => window.my_modal_1.showModal()}
                        >
                            Tambah Data
                        </button>
                        <div className="overflow-x-auto">
                            <table className="table table-sm w-full">
                                <thead className="bg-sky-800 text-gray-100">
                                    <tr>
                                        <th>Departemen</th>
                                        <th>Kode</th>
                                        <th>Keterangan</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.datas.data.map((d, index) => (
                                        <tr>
                                            <td className="text-[7pt]">
                                                {d.dep}
                                            </td>
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
                            Departemen
                        </label>
                        <input
                            type="text"
                            className="input input-bordered input-sm w-full"
                            value={dep}
                            onChange={(e) => setDep(e.target.value)}
                        />
                    </div>
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

                <EditModal fun={editDep} clearHandle={clearHandle}>
                    <div className="form-group">
                        <label htmlFor="" className="label label-text">
                            Departemen
                        </label>
                        <input
                            type="text"
                            className="input input-bordered input-sm w-full"
                            value={dep}
                            onChange={(e) => setDep(e.target.value)}
                        />
                    </div>
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
