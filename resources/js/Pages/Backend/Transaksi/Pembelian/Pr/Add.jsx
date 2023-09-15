import AddModal from "@/Components/AddModal";
import Loading from "@/Components/Loading";
import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import MasterAdmin from "@/Layouts/MasterAdmin";
import { Link, router } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import Swal from "sweetalert2";

export default function PrAddPage(props) {
    const [isLoading, setIsLoading] = useState(false);
    const today = new Date();
    const tanggal =
        today.getFullYear() +
        "-" +
        ("0" + (today.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + today.getDate()).slice(-2);

    const [dataTb, setDataTb] = useState([]);
    const [dataStock, setDataStock] = useState([]);
    const [dataSupplier, setDataSupplier] = useState([]);
    const [searchBy, setSearchBy] = useState("bara1");
    const [kodeSearch, setKodeSearch] = useState("");
    const [kodeSuppSearch, setKodeSuppSearch] = useState("");
    const [kodeSupp, setKodeSupp] = useState("");
    const [namaSupp, setNamaSupp] = useState("");
    const [ket, setKet] = useState("");
    const [barcode, setBarcode] = useState("");

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

    const getStockByBara = async (e) => {
        if (e.key === "Enter") {
            const data = {
                kode: barcode,
            };
            await axios
                .get(route("api.getStockByBara", data))
                .then((res) => {
                    if (res.data.data) {
                        addDataTb(res.data.data);
                    } else {
                        window.my_modal_1_stock.showModal();
                        getStock();
                    }
                    setBarcode("");
                })
                .catch((err) => {
                    if (err.response.status === 404) {
                        Swal.fire("Gagal", err.response.data.message, "error");
                    }
                });
        }
    };

    const getStockSearch = async (x) => {
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
    };

    const getSupplier = async () => {
        setKodeSuppSearch("");
        const data = {
            searchBy: "*",
            kode: kodeSuppSearch,
        };
        await axios
            .get(route("api.getSupplier", data))
            .then((res) => {
                setDataSupplier(res.data.data);
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    Swal.fire("Gagal", err.response.data.message, "error");
                }
            });
    };

    const getSupplierSearch = async (x) => {
        const data = {
            searchBy: "nama",
            kode: x,
        };
        await axios
            .get(route("api.getSupplier", data))
            .then((res) => {
                setDataSupplier(res.data.data);
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    Swal.fire("Gagal", err.response.data.message, "error");
                }
            });
    };

    const [forceRender, setForceRender] = useState(false);
    const xForceRender = () => {
        setForceRender(!forceRender);
    };

    const addDataTb = (data) => {
        const found = dataTb.find((element) => element.bara1 === data.bara1);
        if (found) {
            Swal.fire(
                "Item Sudah Ada",
                "Harap Masukkan Item yang Lain",
                "info"
            );
        } else {
            setDataTb((isi) => [
                ...isi,
                {
                    bara: data.bara,
                    bara1: data.bara1,
                    nama: data.nama,
                    satuan: data.satuan,
                    qtys: 0,
                    qtyo: 0,
                    hbeli: data.hbeli
                },
            ]);
        }
    };

    const deleteItem = (i) => {
        dataTb.splice(i, 1);
        setDataTb(dataTb);
        xForceRender();
    };

    const storeData = async () => {
        const header = {
            tgl: tanggal,
            kode: kodeSupp,
            ket: ket,
        };
        const data = {
            header: header,
            body: dataTb,
        };
        await axios
            .post(route("transaksi.pembelian.pr.store"), data)
            .then((res) => {
                Swal.fire("Sukses", "PR Berhasil dibuat", "success");
                router.get(route("transaksi.pembelian.pr"));
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    Swal.fire("Gagal", err.response.data.message, "error");
                }
            });
    };

    return (
        <>
            {isLoading && <Loading />}
            <MasterAdmin title={"Tambah Purchase Request"}>
                <div className="card bg-base-100 mb-2">
                    <div className="card-body">
                        <div className="grid grid-cols-3 gap-2">
                            <div className="form-group">
                                <label
                                    htmlFor=""
                                    className="label label-text text-xs"
                                >
                                    Nota
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered input-xs text-xs w-full"
                                    value={"BARU"}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor=""
                                    className="label label-text text-xs"
                                >
                                    Tanggal
                                </label>
                                <input
                                    type="date"
                                    className="input input-bordered input-xs text-xs w-full"
                                    value={tanggal}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor=""
                                    className="label label-text text-xs"
                                >
                                    Supplier
                                </label>
                                <div className="flex flex-row gap-1">
                                    <input
                                        type="text"
                                        className="input input-bordered input-xs text-xs w-full"
                                        value={namaSupp}
                                        readOnly
                                    />
                                    <button
                                        className="btn btn-warning btn-xs btn-square"
                                        onClick={() => {
                                            window.my_modal_1_supplier.showModal();
                                            getSupplier();
                                        }}
                                    >
                                        <AiOutlineSearch />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            <div className="form-group">
                                <label
                                    htmlFor=""
                                    className="label label-text text-xs"
                                >
                                    Keterangan
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered input-xs text-xs w-full"
                                    value={ket}
                                    onChange={(e) => setKet(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row items-center">
                            <button
                                className="btn btn-primary btn-xs text-[8pt] text-gray-100"
                                onClick={storeData}
                            >
                                SIMPAN
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="table table-xs">
                                <thead className="bg-sky-800 text-[7pt] text-gray-200">
                                    <tr>
                                        <th>No</th>
                                        <th>Kode Stock</th>
                                        <th>Nama</th>
                                        <th>Satuan</th>
                                        <th>Qty. Stock</th>
                                        <th>Qty. Order</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataTb.map((d, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{d.bara1}</td>
                                            <td>{d.nama}</td>
                                            <td>{d.satuan}</td>
                                            <td>{d.qtys}</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    className="input input-bordered input-xs text-xs"
                                                    value={d.qtyo}
                                                    onChange={(e) => {
                                                        dataTb[index].qtyo =
                                                            e.target.value;
                                                        setDataTb(dataTb);
                                                        xForceRender();
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-error btn-xs bg-rose-700"
                                                    onClick={() => deleteItem(index)}
                                                >
                                                    <BiTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td>
                                            <div className="flex flex-row gap-1">
                                                <input
                                                    type="text"
                                                    className="input input-bordered input-xs text-xs"
                                                    value={barcode}
                                                    onChange={(e) =>
                                                        setBarcode(
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyPress={(e) => {
                                                        getStockByBara(e);
                                                    }}
                                                />
                                                <button
                                                    className="btn btn-warning btn-xs btn-square"
                                                    onClick={() => {
                                                        window.my_modal_1_stock.showModal();
                                                        getStock();
                                                    }}
                                                >
                                                    <AiOutlineSearch />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <dialog id="my_modal_1_stock" className="modal">
                    <form
                        method="dialog"
                        className="modal-box"
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
                            <table className="table table-xs">
                                <thead className="bg-sky-800 text-gray-100 text-[7pt]">
                                    <tr>
                                        <th>#</th>
                                        <th>Kode Stock</th>
                                        <th>Nama</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataStock.map((d, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{d.bara1}</td>
                                            <td>{d.nama}</td>
                                            <td>
                                                <button
                                                    className="btn btn-accent bg-green-700 btn-xs text-gray-100 text-[7pt]"
                                                    onClick={() => addDataTb(d)}
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

                <dialog id="my_modal_1_supplier" className="modal">
                    <form
                        method="dialog"
                        className="modal-box"
                        id="journal-scroll"
                    >
                        <h3 className="font-bold text-sm">Supplier</h3>
                        <div className="py-4">
                            <div className="my-2 items-center flex flex-row gap-2">
                                <input
                                    type="text"
                                    className="input input-bordered input-xs text-xs w-full"
                                    value={kodeSuppSearch}
                                    onChange={(e) => {
                                        setKodeSuppSearch(e.target.value);
                                        if (e.target.value.length >= 3) {
                                            getSupplierSearch(e.target.value);
                                        }
                                    }}
                                />
                            </div>
                            <table className="table table-xs">
                                <thead className="bg-sky-800 text-gray-100 text-[7pt]">
                                    <tr>
                                        <th>#</th>
                                        <th>Kode</th>
                                        <th>Nama</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataSupplier.map((d, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{d.kode}</td>
                                            <td>{d.nama}</td>
                                            <td>
                                                <button
                                                    className="btn btn-accent bg-green-700 btn-xs text-gray-100 text-[7pt]"
                                                    onClick={() => {
                                                        setKodeSupp(d.kode);
                                                        setNamaSupp(d.nama);
                                                    }}
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
