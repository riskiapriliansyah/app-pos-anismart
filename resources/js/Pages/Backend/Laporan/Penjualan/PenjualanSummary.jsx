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

export default function LaporanPenjualanSummary(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [kasir, setKasir] = useState("")
    const [tglAwal, setTglAwal] = useState([])
    const [tglAkhir, setTglAkhir] = useState("")
    const [dataTb, setDataTb] = useState([])
    const componentRef = useRef();

    const getLaporanPenjualanSummary = async () => {
        setIsLoading(true)
        const data = {
            userid: kasir,
            tglAwal: tglAwal,
            tglAkhir: tglAkhir
        };
        await axios
            .get(route("laporan.penjualan.getLaporanPenjualanSummary", data))
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

    const totalBruto = dataTb?.reduce((acc, d) => acc + d.bruto, 0);
    const totalNetto = dataTb?.reduce((acc, d) => acc + d.netto, 0);

    return (
        <>
            {isLoading && <Loading />}
            <MasterAdmin title={"Laporan Penjualan Summary"}>
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
                        <button className="btn btn-primary btn-sm" onClick={getLaporanPenjualanSummary}>Tampilkan</button>
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
                                        documentTitle={"Laporan Penjualan Summary"}
                                    />
                                </div>
                                <h1 className="text-xl text-center font-bold">Laporan Penjualan Summary</h1>
                                <h5 className="text-md text-center font-bold">Kasir: {kasir}</h5>
                                <h5 className="text-md text-center font-bold">Periode: {tglAwal} s/d {tglAkhir}</h5>
                                <table className="table table-sm">
                                    <thead>
                                        <tr>
                                            <th>Tanggal</th>
                                            <th>Kode Stock</th>
                                            <th>Nama Barang</th>
                                            <th>Qty</th>
                                            <th>Bruto</th>
                                            <th>Netto</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataTb.map((d, index) => (
                                            <tr>
                                                <td>{d.tgl}</td>
                                                <td>{d.bara}</td>
                                                <td>{d.stock.nama}</td>
                                                <td>{d.qty}</td>
                                                <td>{d.bruto.toLocaleString("id")}</td>
                                                <td>{d.netto.toLocaleString("id")}</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan={4} className="font-bold text-right">TOTAL</td>
                                            <td>{totalBruto.toLocaleString("id")}</td>
                                            <td>{totalNetto.toLocaleString("id")}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </>
                        }
                        {/* <table className="table table-sm">
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
                        </table> */}

                    </div>
                </div>
            </MasterAdmin>
        </>
    );
}
