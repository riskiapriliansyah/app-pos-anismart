import MasterAdmin from "@/Layouts/MasterAdmin";
import '../../../../../css/StickyTable.css'
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import { BiTrash } from "react-icons/bi";
export default function SamplingOpnamePage(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [searchBy, setSearchBy] = useState("bara");
    const [dataStock, setDataStock] = useState([]);
    const [kodeSearch, setKodeSearch] = useState("");
    const [bara, setBara] = useState("")
    const [bara1, setBara1] = useState("")
    const [nama, setNama] = useState("")
    const [satuan, setSatuan] = useState("")
    const [fisik, setFisik] = useState("")
    const [dataTb, setDataTb] = useState([])

    const fisikRef = useRef(null)

    const getStock = async () => {
        setIsLoading(true)
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
        setIsLoading(false)
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

    const getStockByBara = async (bara) => {
        setIsLoading(true)
        setKodeSearch("");
        const data = {
            bara: bara,
        };
        await axios
            .get(route("getStockByBara", data))
            .then((res) => {
                setBara(res.data.data.bara)
                setBara1(res.data.data.bara1)
                setNama(res.data.data.nama)
                setSatuan(res.data.data.satuan)
                setIsLoading(false)
                xForceRender();
                fisikRef.current.focus();
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    Swal.fire("Gagal", err.response.data.message, "error");
                }
            });
        setIsLoading(false)
    };

    const [forceRender, setForceRender] = useState(false);
    const xForceRender = () => {
        setForceRender(!forceRender);
    };

    const tambahDataTb = () => {
        if (bara !== "") {
            const found = dataTb.find((element) => element.bara === bara);
            if (found) {
                Swal.fire("Sudah ada di table");
            } else {
                setDataTb((isi) => [
                    ...isi, {
                        bara: bara,
                        nama: nama,
                        fisik: fisik,
                        satuan: satuan
                    }
                ])
            }

            setBara("")
            setBara1("")
            setNama("")
            setFisik("")
            setSatuan("")
            xForceRender()
        } else {
            Swal.fire("Pilih barang dahulu")
        }
    }

    const deleteItem = (i) => {
        dataTb.splice(i, 1);
        setDataTb(dataTb);
        xForceRender();
    };

    const batal = () => {
        setDataTb([])
        setBara("")
        setBara1("")
        setNama("")
        setFisik("")
        setSatuan("")
    }

    return (
        <>
            <MasterAdmin title={"Sampling Opname"}>
                <div className="card bg-base-100 mb-2">
                    <div className="card-body">
                        <div className="grid grid-cols-2 gap-2">
                            <div className="form-control">
                                <label htmlFor="" className="label label-text">Gudang</label>
                                <select name="gudang" id="gudang" className="select select select-bordered select-sm">
                                    <option value="">Pilih</option>
                                    {props.gudang.map((d, index) => (
                                        <option value={d.lok}>{d.ket}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-control">
                                <label htmlFor="" className="label label-text">Tanggal</label>
                                <input type="text" className="input input-bordered input-sm" />
                            </div>
                            <div className="form-control">
                                <label
                                    className="btn btn-ghost btn-block btn-sm"
                                    onClick={() => {
                                        window.my_modal_1_stock.showModal();
                                        setSearchBy("bara");
                                        getStock();
                                    }}
                                >
                                    Kode Stock
                                </label>
                                <input type="text" className="input input-bordered input-sm" value={bara} />
                            </div>
                            <div className="form-control">
                                <label htmlFor="" className="label label-text">Nama Barang</label>
                                <input type="text" className="input input-bordered input-sm" value={nama} readOnly />
                            </div>
                            <div className="form-control">
                                <label htmlFor="" className="label label-text">Fisik</label>
                                <input type="number" className="input input-bordered input-sm" value={fisik} ref={fisikRef} onChange={(e) => setFisik(e.target.value)} />
                            </div>
                            <div className="form-control">
                                <label htmlFor="" className="label label-text">Satuan</label>
                                <input type="text" className="input input-bordered input-sm" value={satuan} readOnly />
                            </div>
                        </div>
                        <div className="flex flex-row gap-1">
                            <button className="btn btn-primary btn-sm" onClick={tambahDataTb}>Tambah</button>
                        </div>
                        <div className="table-container table-sticky ">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Kode Stock</th>
                                        <th>Nama Barang</th>
                                        <th>Fisik</th>
                                        <th>Satuan</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataTb.map((d, index) => (
                                        <tr>
                                            <td>{d.bara}</td>
                                            <td>{d.nama}</td>
                                            <td>{d.fisik}</td>
                                            <td>{d.satuan}</td>
                                            <td><button className="btn btn-error bg-rose-600 btn-sm text-gray-100 btn-square" onClick={() =>
                                                deleteItem(index)
                                            }><BiTrash size={15} /></button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex flex-row gap-1 justify-center">
                            <button className="btn btn-primary btn-sm">Posting</button>
                            <button className="btn btn-error bg-rose-600 btn-sm text-gray-100" onClick={batal}>Batal</button>
                        </div>
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
                                    className="select select-bordered select-sm text-sm"
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
                                    className="input input-bordered input-sm text-sm w-full"
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
                                                    className="btn btn-accent bg-green-700 btn-sm text-gray-100 text-sm"
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
