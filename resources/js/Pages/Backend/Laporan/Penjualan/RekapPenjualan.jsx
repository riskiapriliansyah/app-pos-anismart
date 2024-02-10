import Loading from "@/Components/Loading";
import { LaporanDaftarStockToPrint } from "@/Components/Print/LaporanDaftarStock";
import MasterAdmin from "@/Layouts/MasterAdmin";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { AiFillPrinter } from "react-icons/ai";
import Select from "react-tailwindcss-select";
import ReactToPrint from "react-to-print";
import Swal from "sweetalert2";

export default function LaporanPenjualanRekap(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [kasir, setKasir] = useState("")
    const [tglAwal, setTglAwal] = useState([])
    const [tglAkhir, setTglAkhir] = useState("")
    const [dataTb, setDataTb] = useState([])
    const [total, setTotal] = useState(0)
    const componentRef = useRef();

    const getLaporanPenjualanRekap = async () => {
        if (tglAwal === "" && tglAkhir == "") {
            return Swal.fire("Gagal", "Masukkan tanggal periode", "error");
        }
        setIsLoading(true)
        const data = {
            userid: kasir,
            tglAwal: tglAwal,
            tglAkhir: tglAkhir,
        };
        await axios
            .get(route("laporan.penjualan.getLaporanRekapPenjualan", data))
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
                {/* <div className="hidden">
                    <LaporanDaftarStockToPrint ref={componentRef} data={dataTb} />
                </div> */}
                <div className="card bg-base-100 mb-2">
                    <div className="card-body">
                        <div className="grid grid-cols-1 gap-2">
                            <div className="form-control">
                                <label htmlFor="" className="label-text">
                                    Kasir
                                </label>
                                <select name="kasir" id="kasir" className="select select-bordered select-sm" onChange={(e) => setKasir(e.target.value)}>
                                    <option value="">pilih</option>
                                    {props.kasirs.map((d, index) => (
                                        <option value={d.userid}>{d.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-control">
                                <label htmlFor="" className="label-text">
                                    Periode
                                </label>
                                <div className="flex flex-auto gap-1">
                                    <input type="date" className="input input-bordered input-sm" onChange={(e) => setTglAwal(e.target.value)} />
                                    <span>s/d</span>
                                    <input type="date" className="input input-bordered input-sm" onChange={(e) => setTglAkhir(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-primary btn-sm" onClick={getLaporanPenjualanRekap}>Tampilkan</button>
                    </div>
                </div>
                <div className="card bg-base-100 mb-2">
                    <div className="card-body">
                        {dataTb.length > 0 &&
                            <>
                                <div>
                                    <ReactToPrint
                                        trigger={() => (
                                            <button className="btn btn-primary btn-sm btn-square text-gray-100">
                                                <AiFillPrinter />
                                            </button>
                                        )}
                                        content={() => componentRef.current}
                                        documentTitle={"Daftar Stock"}
                                    />
                                </div>

                                <h1 className="text-xl text-center font-bold">REKAP PENJUALAN</h1>
                                <h5 className="text-md text-center font-bold">Kasir: {kasir}</h5>
                                <h5 className="text-md text-center font-bold">Periode: {tglAwal} s/d {tglAkhir}</h5>

                                <table className="table table-sm">
                                    <thead>
                                        <tr>
                                            <th>Tanggal</th>
                                            <th>Jenis Pembayaran</th>
                                            <th>Jumlah</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataTb.map((d, index) =>
                                        (
                                            <tr>
                                                <td>{d.tgl}</td>
                                                <td>{d.jenis}</td>
                                                <td>{d.nilai.toLocaleString("id")}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        }

                    </div>
                </div>
            </MasterAdmin>
        </>
    );
}
