import Loading from "@/Components/Loading";
import MasterAdmin from "@/Layouts/MasterAdmin";
import { Tab } from "@headlessui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-tailwindcss-select";
import Swal from "sweetalert2";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function BestBuyPage(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [searchBy, setSearchBy] = useState("bara");
    const [dataStock, setDataStock] = useState([]);
    const [kodeSearch, setKodeSearch] = useState("");
    const [bara, setBara] = useState("");
    const [bara1, setBara1] = useState("");
    const [namaBarang, setNamaBarang] = useState("");
    const [hjual, setHjual] = useState("");

    const [periodeAwalItem, setPeriodeAwalItem] = useState("");
    const [periodeAkhirItem, setPeriodeAkhirItem] = useState("");
    const [disc1Item, setDisc1Item] = useState("");
    const [disc2Item, setDisc2Item] = useState("");
    const [hbestItem, setHbestItem] = useState("");

    const [periodeAwalDep, setPeriodeAwalDep] = useState("");
    const [periodeAkhirDep, setPeriodeAkhirDep] = useState("");
    const [disc1Dep, setDisc1Dep] = useState("");
    const [disc2Dep, setDisc2Dep] = useState("");
    const [hbestDep, setHbestDep] = useState("");
    const [deps, setDeps] = useState([])
    const [dep, setDep] = useState("")
    const [sdeps, setSdeps] = useState([])
    const [sdep, setSdep] = useState("")

    const [dataItem, setDataItem] = useState([])
    const [dataSupplier, setDataSupplier] = useState([])
    const [dataDepartemen, setDataDepartemen] = useState([])

    const [forceRender, setForceRender] = useState(false);
    const xForceRender = () => {
        setForceRender(!forceRender);
    };

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
                setNamaBarang(res.data.data.nama)
                setHjual(res.data.data.hjual)
                setIsLoading(false)
                xForceRender();
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    Swal.fire("Gagal", err.response.data.message, "error");
                }
            });
        setIsLoading(false)
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

    const getSdepByDep = async (val) => {
        setIsLoading(true)
        const data = {
            "dep": val
        }
        await axios.get(route('getSdepByDep', data)).then((res) => {
            const customHeadings = res.data.data.map((item) => ({
                value: item.kode,
                label: item.ket,
            }));
            setSdeps(customHeadings);
            xForceRender()
        }).catch((err) => {
            if (err.response.status === 404) {
                Swal.fire("Gagal", err.response.data.message, "error");
            }
        })
        setIsLoading(false)
    }

    const handleChangeDepVal = (value) => {
        setDep(value);
        getSdepByDep(value.value);
    };
    const handleChangeSDepVal = (value) => {
        setSdep(value);
    };

    useEffect(() => {
        getBestBuyItem();

        const customHeadings = props.deps.map((item) => ({
            value: item.kode,
            label: item.ket,
        }));
        setDeps(customHeadings);
    }, [])

    const getBestBuyItem = async () => {
        setIsLoading(true)
        await axios
            .get(route("getBestBuyItem"))
            .then((res) => {
                setDataItem(res.data.data)
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    Swal.fire("Gagal", err.response.data.message, "error");
                }
            });
        setIsLoading(false)
    }

    const storeBestBuyItem = async () => {
        setIsLoading(true)
        const data = {
            bara: bara,
            bara1: bara1,
            hbest: hbestItem,
            dbest: disc1Item,
            dbest1: disc2Item,
            best1: periodeAwalItem,
            best2: periodeAkhirItem,
        };
        await axios
            .post(route("storeBestBuyItem"), data)
            .then((res) => {
                getBestBuyItem()
                Swal.fire("Sukses", "Best buy berhasil disimpan", "success");
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    Swal.fire("Gagal", err.response.data.message, "error");
                }
            });
        setIsLoading(false)
    }

    const storeBestBuyDep = async () => {
        setIsLoading(true)
        const data = {
            dep: dep,
            sdep: sdep,
            dbest: disc1Dep,
            dbest1: disc2Dep,
            best1: periodeAwalDep,
            best2: periodeAkhirDep,
        };
        await axios
            .post(route("storeBestBuyDep"), data)
            .then((res) => {
                getBestBuyItem()
                Swal.fire("Sukses", "Best buy berhasil disimpan", "success");
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
                                    {/* Tab Item */}
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
                                                            <input type="date" className="input input-bordered input-sm w-full" value={periodeAwalItem} onChange={(e) => { setPeriodeAwalItem(e.target.value) }} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="" className="label label-text">Periode Akhir</label>
                                                            <input type="date" className="input input-bordered input-sm w-full" value={periodeAkhirItem} onChange={(e) => { setPeriodeAkhirItem(e.target.value) }} />
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-3 gap-2">
                                                        <div className="form-group">
                                                            <label htmlFor="" className="label label-text">Disc.Best Buy #1</label>
                                                            <input type="number" className="input input-bordered input-sm w-full" value={disc1Item} onChange={(e) => { setDisc1Item(e.target.value) }} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="" className="label label-text">Disc.Best Buy #1</label>
                                                            <input type="number" className="input input-bordered input-sm w-full" value={disc2Item} onChange={(e) => { setDisc2Item(e.target.value) }} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="" className="label label-text">Harga Best Buy</label>
                                                            <input type="number" className="input input-bordered input-sm w-full" value={hbestItem} onChange={(e) => { setHbestItem(e.target.value) }} />
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
                                                            {dataItem?.map((d, index) => (
                                                                <tr>
                                                                    <td>{d.bara}</td>
                                                                    <td>{d.stock.nama}</td>
                                                                    <td>{d.dbest}</td>
                                                                    <td>{d.dbest1}</td>
                                                                    <td>{d.hbest}</td>
                                                                    <td>{d.best1}</td>
                                                                    <td>{d.best2}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-auto gap-1 float-right">
                                            <button className="btn btn-primary btn-sm" onClick={storeBestBuyItem}>Simpan</button>
                                            <button className="btn btn-error bg-rose-600 text-gray-200 btn-sm">Batal</button>
                                        </div>

                                    </Tab.Panel>
                                    {/* Tab Departemen */}
                                    <Tab.Panel>
                                        <div className="card bg-base-200 mb-2">
                                            <div className="card-body">
                                                <div className="overflow-x-auto">
                                                    <div className="form-group">
                                                        <label htmlFor="" className="label label-text hover:bg-gray-200 cursor-pointer font-bold">Departemen</label>
                                                        <Select
                                                            value={dep}
                                                            onChange={handleChangeDepVal}
                                                            options={deps}
                                                            isSearchable={true}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="" className="label label-text hover:bg-gray-200 cursor-pointer font-bold">Sub Departemen</label>
                                                        <Select
                                                            value={sdep}
                                                            onChange={handleChangeSDepVal}
                                                            options={sdeps}
                                                            isSearchable={true}
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div className="form-group">
                                                            <label htmlFor="" className="label label-text">Periode Awal</label>
                                                            <input type="date" className="input input-bordered input-sm w-full" value={periodeAwalDep} onChange={(e) => { setPeriodeAwalDep(e.target.value) }} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="" className="label label-text">Periode Akhir</label>
                                                            <input type="date" className="input input-bordered input-sm w-full" value={periodeAkhirDep} onChange={(e) => { setPeriodeAkhirDep(e.target.value) }} />
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div className="form-group">
                                                            <label htmlFor="" className="label label-text">Disc.Best Buy #1</label>
                                                            <input type="number" className="input input-bordered input-sm w-full" value={disc1Dep} onChange={(e) => { setDisc1Dep(e.target.value) }} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="" className="label label-text">Disc.Best Buy #2</label>
                                                            <input type="number" className="input input-bordered input-sm w-full" value={disc2Dep} onChange={(e) => { setDisc2Dep(e.target.value) }} />
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
                                            <button className="btn btn-primary btn-sm" onClick={storeBestBuyDep}>Simpan</button>
                                            <button className="btn btn-error bg-rose-600 text-gray-200 btn-sm">Batal</button>
                                        </div>
                                    </Tab.Panel>
                                    {/* Tab Supplier */}
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
