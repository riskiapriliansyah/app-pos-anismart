import Loading from "@/Components/Loading";
import MasterAdmin from "@/Layouts/MasterAdmin";
import axios from "axios";
import { useState } from "react";
import { MdMan, MdWoman } from "react-icons/md";
import Swal from "sweetalert2";

export default function SupplierPage(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [dataForm, setDataForm] = useState({
        kode: "",
        nama: "",
        alamat: "",
        telepon: "",
        fax: "",
        email: "",
        kontak: "",
        area: "",
        jtTempo: "",
        disc: "",
        hutangAwal: "",
        pembelian: "",
        returPembelian: "",
        debetNota: "",
        kreditNota: "",
        pelunasan: "",
        saldoHutang: "",
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
            area: "",
            jtTempo: "",
            disc: "",
            hutangAwal: "",
            pembelian: "",
            returPembelian: "",
            debetNota: "",
            kreditNota: "",
            pelunasan: "",
            saldoHutang: "",
        })
    }

    const supplierStore = async () => {
        setIsLoading(true)
        const data = {
            kode: dataForm.kode,
            nama: dataForm.nama,
            alamat: dataForm.alamat,
            telp: dataForm.telepon,
            fax: dataForm.fax,
            email: dataForm.email,
            kontak: dataForm.kontak,
            area: dataForm.area,
            kdue: dataForm.jtTempo,
            kdisc: dataForm.disc,
        }
        await axios.post(route("supplier.store"), data).then((res) => {
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
            <MasterAdmin title={"Supplier"}>
                <div className="card bg-base-100 mb-2">
                    <div className="card-body">
                        <div className="flex flex-row gap-1">
                            <button className="btn btn-primary btn-sm" onClick={supplierStore}>Simpan</button>
                            <button className="btn btn-error bg-rose-600 text-white btn-sm" onClick={batal}>Batal</button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <div className="form-group">
                                    <label htmlFor="" className="label label-text">Kode Supplier</label>
                                    <input type="text" name="kode" className="input input-bordered input-sm w-full" value={dataForm.kode}
                                        onChange={(e) => {
                                            inputHandle(e)
                                        }
                                        } />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="" className="label label-text">Nama Supplier</label>
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
                                <div className="form-group">
                                    <label htmlFor="" className="label label-text">e-mail</label>
                                    <input type="text" name="email" className="input input-bordered input-sm w-full" value={dataForm.email}
                                        onChange={(e) => {
                                            inputHandle(e)
                                        }
                                        } />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="" className="label label-text">Kontak</label>
                                    <input type="text" name="kontak" className="input input-bordered input-sm w-full" value={dataForm.kontak}
                                        onChange={(e) => {
                                            inputHandle(e)
                                        }
                                        } />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="" className="label label-text">Area</label>
                                    <input type="text" name="area" className="input input-bordered input-sm w-full" value={dataForm.area}
                                        onChange={(e) => {
                                            inputHandle(e)
                                        }
                                        } />
                                </div>
                                <div className="flex flex-row gap-2">
                                    <div className="form-group">
                                        <label htmlFor="" className="label label-text">Jt.Tempo</label>
                                        <input type="text" name="jtTempo" className="input input-bordered input-sm w-full" placeholder="Hari" value={dataForm.jtTempo}
                                            onChange={(e) => {
                                                inputHandle(e)
                                            }
                                            } />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="" className="label label-text">Discount</label>
                                        <input type="text" name="disc" className="input input-bordered input-sm w-full" placeholder="%" value={dataForm.disc}
                                            onChange={(e) => {
                                                inputHandle(e)
                                            }
                                            } />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="form-group">
                                    <label htmlFor="" className="label label-text">Hutang Awal</label>
                                    <input type="text" name="hutangAwal" className="input input-bordered input-sm w-full" value={dataForm.hutangAwal}
                                        onChange={(e) => {
                                            inputHandle(e)
                                        }
                                        } />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="" className="label label-text">Pembelian</label>
                                    <input type="text" name="pembelian" className="input input-bordered input-sm w-full" value={dataForm.pembelian}
                                        onChange={(e) => {
                                            inputHandle(e)
                                        }
                                        } />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="" className="label label-text">Retur Pembelian</label>
                                    <input type="text" name="returPembelian" className="input input-bordered input-sm w-full" value={dataForm.returPembelian}
                                        onChange={(e) => {
                                            inputHandle(e)
                                        }
                                        } />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="" className="label label-text">Debet Nota</label>
                                    <input type="text" name="debetNota" className="input input-bordered input-sm w-full" value={dataForm.debetNota}
                                        onChange={(e) => {
                                            inputHandle(e)
                                        }
                                        } />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="" className="label label-text">Kredit Nota</label>
                                    <input type="text" name="kreditNota" className="input input-bordered input-sm w-full" value={dataForm.kreditNota}
                                        onChange={(e) => {
                                            inputHandle(e)
                                        }
                                        } />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="" className="label label-text">Pelunasan</label>
                                    <input type="text" name="pelunasan" className="input input-bordered input-sm w-full" value={dataForm.pelunasan}
                                        onChange={(e) => {
                                            inputHandle(e)
                                        }
                                        } />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="" className="label label-text">Saldo Hutang</label>
                                    <input type="text" name="saldoHutang" className="input input-bordered input-sm w-full" value={dataForm.saldoHutang}
                                        onChange={(e) => {
                                            inputHandle(e)
                                        }
                                        } />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MasterAdmin>
        </>
    );
}
