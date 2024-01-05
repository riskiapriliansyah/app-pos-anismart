import MasterAdmin from "@/Layouts/MasterAdmin";
import { Tab } from "@headlessui/react";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function BestBuyPage(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [searchBy, setSearchBy] = useState("bara");
    const [dataStock, setDataStock] = useState([]);
    const [kodeSearch, setKodeSearch] = useState("");
    const [namaBarang, setNamaBarang] = useState("");
    const [hjual, setHjual] = useState("");
    const [periodeAwal, setPeriodeAwal] = useState("");
    const [periodeAkhir, setPeriodeAkhir] = useState("");
    const [disc1, setDisc1] = useState("");
    const [disc2, setDisc2] = useState("");
    const [hbest, setHbest] = useState("");
    const [dataItem, setDataItem] = useState([])
    const [dataSupplier, setDataSupplier] = useState([])
    const [dataDepartemen, setDataDepartemen] = useState([])
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

    const getStockByBara = async (bara) => {
        setKodeSearch("");
        const data = {
            bara: bara,
        };
        await axios
            .get(route("getStockByBara", data))
            .then((res) => {
                setNamaBarang(res.data.data.nama)
                setHjual(res.data.data.hjual)
                xForceRender();
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    Swal.fire("Gagal", err.response.data.message, "error");
                }
            });
    };

    let [categories] = useState({
        "Item": [
            {
                id: 1,
                title: "Does drinking coffee make you smarter?",
                date: "5h ago",
                commentCount: 5,
                shareCount: 2,
            },
            {
                id: 2,
                title: "So you've bought coffee... now what?",
                date: "2h ago",
                commentCount: 3,
                shareCount: 2,
            },
        ],
        "Departemen": [
            {
                id: 1,
                title: "Is tech making coffee better or worse?",
                date: "Jan 7",
                commentCount: 29,
                shareCount: 16,
            },
            {
                id: 2,
                title: "The most innovative things happening in coffee",
                date: "Mar 19",
                commentCount: 24,
                shareCount: 12,
            },
        ],
        "Supplier": [
            {
                id: 1,
                title: "Ask Me Anything: 10 answers to your questions about coffee",
                date: "2d ago",
                commentCount: 9,
                shareCount: 5,
            },
            {
                id: 2,
                title: "The worst advice we've ever heard about coffee",
                date: "4d ago",
                commentCount: 1,
                shareCount: 2,
            },
        ],
    });

    return (
        <>
            <MasterAdmin title={"Best Buy"}>
                <div className="card bg-base-100 mb-2">
                    <div className="card-body">
                        <div className="w-full px-2 sm:px-0">
                            <Tab.Group>
                                <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                                    {Object.keys(categories).map(
                                        (category) => (
                                            <Tab
                                                key={category}
                                                className={({ selected }) =>
                                                    classNames(
                                                        "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                                                        "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                                                        selected
                                                            ? "bg-white shadow"
                                                            : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                                                    )
                                                }
                                            >
                                                {category}
                                            </Tab>
                                        )
                                    )}
                                </Tab.List>
                                <Tab.Panels className="mt-2">
                                    <Tab.Panel>
                                        <div className="card bg-base-200 mb-2">
                                            <div className="card-body">
                                                <div className="overflow-x-auto">
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div className="form-group">
                                                            <button
                                                                className="btn btn-ghost btn-block btn-sm"
                                                                onClick={() => {
                                                                    window.my_modal_1_stock.showModal();
                                                                    setSearchBy("bara");
                                                                    getStock();
                                                                }}
                                                            >
                                                                Nama Barang
                                                            </button>
                                                            <input type="text" className="input input-bordered input-sm w-full mt-1" value={namaBarang} readOnly />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="" className="label label-text">Harga Jual</label>
                                                            <input type="text" className="input input-bordered input-sm w-full" value={hjual.toLocaleString('id')} readOnly />
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div className="form-group">
                                                            <label htmlFor="" className="label label-text">Periode Awal</label>
                                                            <input type="date" className="input input-bordered input-sm w-full" value={periodeAwal} onChange={(e) => { setPeriodeAwal(e.target.value) }} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="" className="label label-text">Periode Akhir</label>
                                                            <input type="date" className="input input-bordered input-sm w-full" value={periodeAkhir} onChange={(e) => { setPeriodeAkhir(e.target.value) }} />
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-3 gap-2">
                                                        <div className="form-group">
                                                            <label htmlFor="" className="label label-text">Disc.Best Buy #1</label>
                                                            <input type="number" className="input input-bordered input-sm w-full" value={disc1} onChange={(e) => { setDisc1(e.target.value) }} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="" className="label label-text">Disc.Best Buy #1</label>
                                                            <input type="number" className="input input-bordered input-sm w-full" value={disc2} onChange={(e) => { setDisc2(e.target.value) }} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="" className="label label-text">Harga Best Buy</label>
                                                            <input type="number" className="input input-bordered input-sm w-full" value={hbest} onChange={(e) => { setHbest(e.target.value) }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card bg-base-200 mb-2">
                                            <div className="card-body">
                                                <div className="overflow-x-auto">
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th>Kode Stock</th>
                                                                <th>Nama Barang</th>
                                                                <th>Disc#1</th>
                                                                <th>Disc#2</th>
                                                                <th>Hrg.Jual</th>
                                                                <th>Awal</th>
                                                                <th>Akhir</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {dataItem.map((d, index) => (
                                                                <tr>
                                                                    <td>{index + 1}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-auto gap-1 float-right">
                                            <button className="btn btn-primary btn-sm">Simpan</button>
                                            <button className="btn btn-error bg-rose-600 text-gray-200 btn-sm">Batal</button>
                                        </div>

                                    </Tab.Panel>
                                    <Tab.Panel>
                                        <div className="card bg-base-200 mb-2">
                                            <div className="card-body">
                                                <div className="overflow-x-auto">
                                                    <div className="form-group">
                                                        <label htmlFor="" className="label label-text hover:bg-gray-200 cursor-pointer font-bold">Departemen</label>
                                                        <input type="text" className="input input-bordered input-sm w-full" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="" className="label label-text hover:bg-gray-200 cursor-pointer font-bold">Sub Departemen</label>
                                                        <input type="text" className="input input-bordered input-sm w-full" />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div className="form-group">
                                                            <label htmlFor="" className="label label-text">Periode Awal</label>
                                                            <input type="date" className="input input-bordered input-sm w-full" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="" className="label label-text">Periode Akhir</label>
                                                            <input type="date" className="input input-bordered input-sm w-full" />
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div className="form-group">
                                                            <label htmlFor="" className="label label-text">Disc.Best Buy #1</label>
                                                            <input type="number" className="input input-bordered input-sm w-full" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="" className="label label-text">Disc.Best Buy #2</label>
                                                            <input type="number" className="input input-bordered input-sm w-full" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card bg-base-200 mb-2">
                                            <div className="card-body">
                                                <div className="overflow-x-auto">
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th>Kode Stock</th>
                                                                <th>Nama Barang</th>
                                                                <th>Disc#1</th>
                                                                <th>Disc#2</th>
                                                                <th>Hrg.Jual</th>
                                                                <th>Awal</th>
                                                                <th>Akhir</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {dataDepartemen.map((d, index) => (
                                                                <tr>
                                                                    <td>{index + 1}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-auto gap-1 float-right">
                                            <button className="btn btn-primary btn-sm">Simpan</button>
                                            <button className="btn btn-error bg-rose-600 text-gray-200 btn-sm">Batal</button>
                                        </div>
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        <div className="card bg-base-200 mb-2">
                                            <div className="card-body">
                                                <div className="overflow-x-auto">
                                                    <div className="form-group">
                                                        <label htmlFor="" className="label label-text hover:bg-gray-200 cursor-pointer font-bold">Supplier</label>
                                                        <input type="text" className="input input-bordered input-sm w-full" />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div className="form-group">
                                                            <label htmlFor="" className="label label-text">Periode Awal</label>
                                                            <input type="date" className="input input-bordered input-sm w-full" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="" className="label label-text">Periode Akhir</label>
                                                            <input type="date" className="input input-bordered input-sm w-full" />
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div className="form-group">
                                                            <label htmlFor="" className="label label-text">Disc.Best Buy #1</label>
                                                            <input type="number" className="input input-bordered input-sm w-full" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="" className="label label-text">Disc.Best Buy #2</label>
                                                            <input type="number" className="input input-bordered input-sm w-full" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card bg-base-200 mb-2">
                                            <div className="card-body">
                                                <div className="overflow-x-auto">
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th>Kode Stock</th>
                                                                <th>Nama Barang</th>
                                                                <th>Disc#1</th>
                                                                <th>Disc#2</th>
                                                                <th>Hrg.Jual</th>
                                                                <th>Awal</th>
                                                                <th>Akhir</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {dataSupplier.map((d, index) => (
                                                                <tr>
                                                                    <td>{index + 1}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-auto gap-1 float-right">
                                            <button className="btn btn-primary btn-sm">Simpan</button>
                                            <button className="btn btn-error bg-rose-600 text-gray-200 btn-sm">Batal</button>
                                        </div>
                                    </Tab.Panel>
                                </Tab.Panels>
                            </Tab.Group>
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
                            <table className="table table-xs">
                                <thead className="bg-sky-800 text-gray-100 text-[7pt]">
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
                                                    className="btn btn-accent bg-green-700 btn-xs text-gray-100 text-[7pt]"
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
