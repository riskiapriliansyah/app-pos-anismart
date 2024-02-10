import AddModal from "@/Components/AddModal";
import EditModal from "@/Components/EditModal";
import Loading from "@/Components/Loading";
import MasterAdmin from "@/Layouts/MasterAdmin";
import { router } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-tailwindcss-select";
import Swal from "sweetalert2";

export default function LaporanPembelianPage(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [kode, setKode] = useState("*")
    const [tglAwal, setTglAwal] = useState("")
    const [tglAkhir, setTglAkhir] = useState("")
    const [suppliers, setSuppliers] = useState([])
    const [dataTb, setDataTb] = useState([])

    useEffect(() => {
        const customHeadings = props.suppliers.map((item) => ({
            value: item.kode,
            label: item.nama,
        }));
        setSuppliers(customHeadings);
    }, [])

    const handleChangeKodeVal = (value) => {
        setKode(value);
    };

    const getLaporanPembelian = async () => {
        if (tglAwal === "") {
            return Swal.fire("Gagal", "Harap isi tanggal awal", "error");
        }
        if (tglAkhir === "") {
            return Swal.fire("Gagal", "Harap isi tanggal awal", "error");
        }
        setIsLoading(true)
        const data = {
            tglAwal: tglAwal,
            tglAkhir: tglAkhir,
            kode: kode,
        };
        await axios
            .get(route("laporan.pembelian.getLaporanPembelian", data))
            .then((res) => {
                setDataTb(res.data.data);
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    Swal.fire("Gagal", err.response.data.message, "error");
                }
            });
        setIsLoading(false)
    }

    return (
        <>
            {isLoading && <Loading />}
            <MasterAdmin title={"Laporan Pembelian"}>
                <div className="card bg-base-100 mb-2">
                    <div className="card-body">
                        <div className="grid grid-cols-2 gap-2">
                            <div className="form-control">
                                <label htmlFor="" className="label-text">
                                    Tanggal Awal
                                </label>
                                <input type="date" className="input input-bordered input-sm" onChange={(e) => setTglAwal(e.target.value)} />
                            </div>
                            <div className="form-control">
                                <label htmlFor="" className="label-text">
                                    Tanggal Akhir
                                </label>
                                <input type="date" className="input input-bordered input-sm" onChange={(e) => setTglAkhir(e.target.value)} />
                            </div>
                            <div className="form-control">
                                <label htmlFor="" className="label-text">
                                    Supplier
                                </label>
                                <Select
                                    value={kode}
                                    onChange={handleChangeKodeVal}
                                    options={suppliers}
                                    isSearchable={true}
                                    isClearable={true}
                                />
                            </div>
                        </div>
                        <button className="btn btn-primary btn-sm" onClick={getLaporanPembelian}>Tampilkan</button>
                    </div>
                </div>
                <div className="card bg-base-100 mb-2">
                    <div className="card-body">
                        {dataTb.length > 0 &&
                            <div>
                                <button className="btn btn-error bg-rose-600 text-gray-200">Cetak</button>
                            </div>
                        }
                        <table className="table table-sm">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Nota</th>
                                    <th>Tanggal</th>
                                    <th>Supplier</th>
                                    <th>Nilai</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataTb.map((d, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{d.nota}</td>
                                        <td>{d.tgl}</td>
                                        <td>{d.supplier.nama}</td>
                                        <td>{d.netto.toLocaleString("id")}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </MasterAdmin>
        </>
    );
}
