import AddModal from "@/Components/AddModal";
import EditModal from "@/Components/EditModal";
import Loading from "@/Components/Loading";
import MasterAdmin from "@/Layouts/MasterAdmin";
import { router } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

export default function ManajemenUserPage(props) {
    const [isLoading, setIsLoading] = useState(false);

    const [role, setRole] = useState("")
    const [userid, setUserId] = useState("")
    const [nama, setNama] = useState("")
    const [password, setPassword] = useState("")

    const store = async () => {
        setIsLoading(true);
        const data = {
            role: role,
            userid: userid,
            nama: nama,
            password: password
        };

        await axios
            .post(route("setting.manajemenUser.store"), data)
            .then((res) => {
                Swal.fire("Sukses", "Data berhasil disimpan", "success");
                router.get(route("setting.manajemenUser.index"));
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
            role: role,
            userid: userid,
            nama: nama,
            password: password
        };

        await axios
            .post(route("setting.manajemenUser.update"), data)
            .then((res) => {
                Swal.fire("Sukses", "Data berhasil diupdate", "success");
                router.get(route("setting.manajemenUser.index"));
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    Swal.fire("Gagal", err.response.data.message, "error");
                }
            });
        setIsLoading(false);
    };

    const editHandle = (data) => {
        setRole(data.role)
        setUserId(data.userid)
        setNama(data.name)
    };

    const clearHandle = () => {
        setRole("")
        setUserId("")
        setNama("")
        setPassword("")
    };

    return (
        <>
            {isLoading && <Loading />}
            <MasterAdmin title={"Manajemen User"}>
                <div className="card bg-base-100 mb-2">
                    <div className="card-body">
                        <button
                            className="btn btn-ghost bg-sky-700 text-gray-100 btn-sm text-sm"
                            onClick={() => window.my_modal_1.showModal()}
                        >
                            Buat User
                        </button>
                        <div className="overflow-x-auto">
                            <table className="table table-sm">
                                <thead className="bg-sky-800 text-gray-100 text-sm">
                                    <tr>
                                        <th>#</th>
                                        <th>Role</th>
                                        <th>Userid</th>
                                        <th>Nama</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.data?.map((d, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{d.role}</td>
                                            <td>{d.userid}</td>
                                            <td>{d.name}</td>
                                            <td>
                                                <button
                                                    className="btn btn-warning btn-sm text-sm"
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
                        </div>
                    </div>
                </div>

                <AddModal fun={store} clearHandle={clearHandle}>
                    <div className="form-group">
                        <label htmlFor="" className="label label-text">
                            Role
                        </label>
                        <input
                            type="text"
                            className="input input-bordered input-sm w-full"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="" className="label label-text">
                            User Id
                        </label>
                        <input
                            type="text"
                            className="input input-bordered input-sm w-full"
                            value={userid}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="" className="label label-text">
                            Nama
                        </label>
                        <input
                            type="text"
                            className="input input-bordered input-sm w-full"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="" className="label label-text">
                            Password
                        </label>
                        <input
                            type="password"
                            className="input input-bordered input-sm w-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </AddModal>

                <EditModal fun={edit} clearHandle={clearHandle}>
                    <div className="form-group">
                        <label htmlFor="" className="label label-text">
                            Role
                        </label>
                        <input
                            type="text"
                            className="input input-bordered input-sm w-full"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="" className="label label-text">
                            User Id
                        </label>
                        <input
                            type="text"
                            className="input input-bordered input-sm w-full"
                            value={userid}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="" className="label label-text">
                            Nama
                        </label>
                        <input
                            type="text"
                            className="input input-bordered input-sm w-full"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="" className="label label-text">
                            Password
                        </label>
                        <input
                            type="password"
                            className="input input-bordered input-sm w-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </EditModal>

            </MasterAdmin>
        </>
    );
}
