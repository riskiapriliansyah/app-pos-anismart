import Loading from "@/Components/Loading";
import { LaporanDaftarStockToPrint } from "@/Components/Print/LaporanDaftarStock";
import MasterAdmin from "@/Layouts/MasterAdmin";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { AiFillPrinter } from "react-icons/ai";
import ReactToPrint from "react-to-print";
import Swal from "sweetalert2";

export default function DaftarStockPage(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [bara, setBara] = useState("")
    const [nama, setNama] = useState("")
    const [kodeSearch, setKodeSearch] = useState("");
    const [tglAwal, setTglAwal] = useState("");
    const [tglAkhir, setTglAkhir] = useState("");
    const [dataStock, setDataStock] = useState([]);
    const [searchBy, setSearchBy] = useState("bara");
    const [dataTb, setDataTb] = useState([])
    const componentRef = useRef();

    const getKartuStock = async () => {
        if (tglAwal === "" && tglAkhir == "") {
            return Swal.fire("Gagal", "Masukkan tanggal periode", "error");
        }
        setIsLoading(true)
        const data = {
            lok: props.auth.user.lok,
            bara: bara,
            tglAwal: tglAwal,
            tglAkhir: tglAkhir,
        };
        await axios
            .get(route("api.getKartuStock", data))
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

    const getStock = async () => {
        setKodeSearch("");
        const data = {
            searchBy: "*",
            kode: kodeSearch,
        };
        await axios
            .get(route("api.getStock", data))
            .then((res) => {
                setDataStock(res.data.data);
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    Swal.fire("Gagal", err.response.data.message, "error");
                }
            });
    };

    const getStockByBara = async (bara) => {
        setKodeSearch("");
        const data = {
            bara: bara,
        };
        await axios
            .get(route("getStockByBara", data))
            .then((res) => {
                setBara(res.data.data.bara);
                setNama(res.data.data.nama);
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    Swal.fire("Gagal", err.response.data.message, "error");
                }
            });
    };

    const getStockSearch = async (x) => {
        setIsLoading(true)
        const data = {
            searchBy: searchBy,
            kode: x,
        };
        await axios
            .get(route("api.getStock", data))
            .then((res) => {
                setDataStock(res.data.data);
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    Swal.fire("Gagal", err.response.data.message, "error");
                }
            });
        setIsLoading(false)
    };

    return (
        <>
            {isLoading && <Loading />}
            <MasterAdmin title={"Laporan Pembelian"}>
                {/* <div className="hidden">
                    <LaporanDaftarStockToPrint ref={componentRef} data={dataTb} />
                </div> */}
                <div className="card bg-base-100 mb-2">
                    <div className="card-body">
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                className="btn btn-ghost btn-sm"
                                onClick={() => {
                                    window.my_modal_1_stock.showModal();
                                    setSearchBy("bara");
                                    getStock();
                                }}
                            >
                                Kode Stock
                            </button>
                            <input
                                type="text"
                                name="bara"
                                className="input input-bordered input-sm"
                                value={bara}
                                readOnly
                            />
                            <button
                                className="btn btn-ghost btn-sm"
                                onClick={() => {
                                    window.my_modal_1_stock.showModal();
                                    setSearchBy("nama");
                                    getStock();
                                }}
                            >
                                Nama Barang
                            </button>
                            <input
                                type="text"
                                name="nama"
                                className="input input-bordered input-sm"
                                value={nama}
                                readOnly
                            />
                            <button
                                className="btn btn-ghost btn-sm"
                            >
                                Periode
                            </button>
                            <div className="flex flex-auto gap-1">
                                <input type="date" className="input input-bordered input-sm" onChange={(e) => setTglAwal(e.target.value)} />
                                <span>s/d</span>
                                <input type="date" className="input input-bordered input-sm" onChange={(e) => setTglAkhir(e.target.value)} />
                            </div>
                        </div>
                        <button className="btn btn-primary btn-sm" onClick={getKartuStock}>Tampilkan</button>
                    </div>
                </div>
                <div className="card bg-base-100 mb-2">
                    <div className="card-body">
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

                        <h1 className="text-xl text-center font-bold">KARTU STOCK</h1>
                        <h5 className="text-md text-center font-bold">{bara}/{nama}</h5>
                        <h5 className="text-md text-center font-bold">Periode: {tglAwal} s/d {tglAkhir}</h5>
                        <table className="table table-sm">
                            <thead>
                                <tr>
                                    <th>Tanggal</th>
                                    <th>No.Faktur</th>
                                    <th>Qty.Faktur</th>
                                    <th>Masuk</th>
                                    <th>Keluar</th>
                                    <th>Saldo</th>
                                    <th>Keterangan</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={5} className="text-right">Saldo Awal.....</td>
                                    <td>{dataTb?.saldoAwal}</td>
                                </tr>
                                {dataTb?.kbara?.map((d, index) => (
                                    <tr>
                                        <td>{d.tgl}</td>
                                        <td>{d.nota}</td>
                                        <td>{d.qty}</td>
                                        <td>{d.ntag > 0 && d.zqty}</td>
                                        <td>{d.ntag < 0 && d.zqty}</td>
                                        <td>{d.saldo}</td>
                                        <td>{d.kode}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <dialog id="my_modal_1_stock" className="modal">
                    <form
                        method="dialog"
                        className="modal-box w-11/12 max-w-5xl"
                        id="journal-scroll"
                    >
                        <h3 className="font-bold text-sm">Master Stock</h3>
                        <div className="py-4">
                            <div className="my-2 items-center flex flex-row gap-2">
                                <select
                                    className="select select-bordered select-xs text-xs"
                                    value={searchBy}
                                    onChange={(e) =>
                                        setSearchBy(e.target.value)
                                    }
                                >
                                    <option value="bara">Kode Stock</option>
                                    <option value="bara1">Barcode</option>
                                    <option value="nama">Nama</option>
                                </select>
                                <input
                                    type="text"
                                    className="input input-bordered input-xs text-xs w-full"
                                    value={kodeSearch}
                                    onChange={(e) => {
                                        setKodeSearch(e.target.value);
                                        if (e.target.value.length >= 3) {
                                            getStockSearch(e.target.value);
                                        }
                                    }}
                                />
                            </div>
                            <table className="table table-sm">
                                <thead className="bg-sky-800 text-gray-100 text-sm">
                                    <tr>
                                        <th>#</th>
                                        <th>Kode Stock</th>
                                        <th>Barcode</th>
                                        <th>Nama</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataStock.map((d, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{d.bara}</td>
                                            <td>{d.bara1}</td>
                                            <td>{d.nama}</td>
                                            <td>
                                                <button
                                                    className="btn btn-accent bg-green-700 btn-xs text-gray-100 text-sm"
                                                    onClick={() =>
                                                        getStockByBara(d.bara)
                                                    }
                                                >
                                                    Pilih
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-action">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </div>
                    </form>
                </dialog>
            </MasterAdmin>
        </>
    );
}
