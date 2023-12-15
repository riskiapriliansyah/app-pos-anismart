import Loading from "@/Components/Loading";
import Pagination from "@/Components/Pagination";
import MasterAdmin from "@/Layouts/MasterAdmin";
import axios from "axios";
import { useState } from "react";
import { MdMan, MdWoman } from "react-icons/md";
import Swal from "sweetalert2";

export default function LanggananPage(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [dataForm, setDataForm] = useState({
        kode: "",
        nama: "",
        alamat: "",
        telepon: "",
        fax: "",
        email: "",
        kontak: "",
        area: "-",
        disc: "",
        tglLahir: "",
        jenisHarga: "",
    });

    const [forceRender, setForceRender] = useState(false);
    const xForceRender = () => {
        setForceRender(!forceRender);
    };

    const inputHandle = (e) => {
        dataForm[e.target.name] = e.target.value
        xForceRender()
    };

    const batal = () => {
        setDataForm({
            kode: "",
            nama: "",
            alamat: "",
            telepon: "",
            fax: "",
            email: "",
            kontak: "",
            area: "-",
            disc: "",
            tglLahir: "",
            jenisHarga: "",
        })
    }

    const langgananStore = async () => {
        setIsLoading(true)
        const data = {
            kode: dataForm.kode,
            nama: dataForm.nama,
            alamat: dataForm.alamat,
            telp: dataForm.telepon,
            fax: dataForm.fax,
            email: dataForm.email,
            area: dataForm.area,
            disc: dataForm.disc,
            dlahir: dataForm.tglLahir,
            jenisHarga: dataForm.jenisHarga,
        }
        await axios.post(route("langganan.store"), data).then((res) => {
            Swal.fire("Berhasil disimpan", "Berhasil Disimpan", "success");
            batal()
        }).catch((err) => {
            if (err.response.status === 404) {
                Swal.fire("Gagal", err.response.data.message, "error");
            }
        })
        setIsLoading(false)
    }

    return (
        <>
            {isLoading && <Loading />}
            <MasterAdmin title={"Langganan"}>
                <div className="card bg-base-100 mb-2">
                    <div className="card-body">
                        <div className="flex flex-row gap-1">
                            <button className="btn btn-primary btn-sm" onClick={langgananStore}>Simpan</button>
                            <button className="btn btn-error bg-rose-600 text-white btn-sm" onClick={batal}>Batal</button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <div className="form-group">
                                    <label htmlFor="" className="label label-text">Kode Langganan</label>
                                    <input type="text" name="kode" className="input input-bordered input-sm w-full" value={dataForm.kode}
                                        onChange={(e) => {
                                            inputHandle(e)
                                        }
                                        } />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="" className="label label-text">Nama Langganan</label>
                                    <input type="text" name="nama" className="input input-bordered input-sm w-full" value={dataForm.nama}
                                        onChange={(e) => {
                                            inputHandle(e)
                                        }
                                        } />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="" className="label label-text">Alamat</label>
                                    <input type="text" name="alamat" className="input input-bordered input-sm w-full" value={dataForm.alamat}
                                        onChange={(e) => {
                                            inputHandle(e)
                                        }
                                        } />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="" className="label label-text">Telepon</label>
                                    <input type="text" name="telepon" className="input input-bordered input-sm w-full" value={dataForm.telepon}
                                        onChange={(e) => {
                                            inputHandle(e)
                                        }
                                        } />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="" className="label label-text">Faximile</label>
                                    <input type="text" name="fax" className="input input-bordered input-sm w-full" value={dataForm.fax}
                                        onChange={(e) => {
                                            inputHandle(e)
                                        }
                                        } />
                                </div>
                            </div>

                            <div>
                                <div className="form-group">
                                    <label htmlFor="" className="label label-text">e-mail</label>
                                    <input type="text" name="email" className="input input-bordered input-sm w-full" value={dataForm.email}
                                        onChange={(e) => {
                                            inputHandle(e)
                                        }
                                        } />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="" className="label label-text">Area</label>
                                    <select name="area" className="select select-bordered select-sm w-full" value={dataForm.area}
                                        onChange={(e) => {
                                            inputHandle(e)
                                        }
                                        }>
                                        <option value="-">Pilih</option>
                                        {props.area.map((d, index) => (
                                            <option value={d.area} key={index}>{d.ket}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="" className="label label-text">Discount</label>
                                    <input type="text" name="disc" className="input input-bordered input-sm w-full" placeholder="%" value={dataForm.disc}
                                        onChange={(e) => {
                                            inputHandle(e)
                                        }
                                        } />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="" className="label label-text">Tgl.Lahir</label>
                                    <input type="date" name="tglLahir" className="input input-bordered input-sm w-full" value={dataForm.tglLahir}
                                        onChange={(e) => {
                                            inputHandle(e)
                                        }
                                        } />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="" className="label label-text">Jenis Harga</label>
                                    <select name="jenisHarga" className="select select-bordered select-sm w-full" value={dataForm.jenisHarga}
                                        onChange={(e) => {
                                            inputHandle(e)
                                        }
                                        } >
                                        <option value="">Pilih</option>
                                        <option value="E">Harga Eceran</option>
                                        <option value="G">Harga Grosir</option>
                                        <option value="A">Harga Anggota</option>
                                        <option value="1">Harga Khusus#1</option>
                                        <option value="2">Harga Khusus#2</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="card bg-base-100 mb-2">
                    <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Kode</th>
                                    <th>Nama</th>
                                    <th>Alamat</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.cust.data.map((d, index) => (
                                    <tr>
                                        <td>{d.kode}</td>
                                        <td>{d.nama}</td>
                                        <td>{d.alamat}</td>
                                    </tr>

                                ))}
                            </tbody>
                        </table>

                        <div className="mt-6 mx-auto">
                            <Pagination links={props.cust?.links} />
                        </div>
                    </div>
                </div>
            </MasterAdmin >
        </>
    );
}
