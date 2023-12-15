import Loading from "@/Components/Loading";
import MasterAdmin from "@/Layouts/MasterAdmin";
import { Switch, Tab } from "@headlessui/react";
import axios from "axios";
import { useState } from "react";
import { MdMan, MdWoman } from "react-icons/md";
import Swal from "sweetalert2";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function MasterStockPage(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [isEnabled, setIsEnabled] = useState(true);
    const [aktif, setAktif] = useState(false);
    const [bkp, setBkp] = useState(false);
    const [kodeSearch, setKodeSearch] = useState("");
    const [dataStock, setDataStock] = useState([]);
    const [searchBy, setSearchBy] = useState("bara");
    const [dataForm, setDataForm] = useState({
        bara: "",
        bara1: "",
        nama: "",
        div: "",
        ndiv: "",
        dep: "",
        ndep: "",
        sdep: "",
        nsdep: "",
        satuan: "",
        kodeSupp: "",
        supplier: "",
        hbeli: "",
        haver: "",
        margin: "",
        hjual: "",
        marging: "",
        hjualg: "",
        marginm: "",
        hjualm: "",
        hjualk1: "",
        hjualk2: "",
        best1: "",
        best2: "",
        dbest: "",
        dbest1: "",
        hbest: "",
    });

    const [dataFormTsatuan, setDataFormTsatuan] = useState({
        bara1: "",
        satuan: "",
        qty: "",
        hjual: "",
        hjualg: "",
        hjualm: "",
        hjualk1: "",
        hjualk2: "",
    });

    const [tsatuan, setTsatuan] = useState([]);
    const [tbara, setTbara] = useState([]);
    const [deps, setDeps] = useState([]);
    const [sdeps, setSdeps] = useState([]);

    let [categories] = useState({
        "Harga dan Promo": [
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
        "Saldo Stock": [
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
        "Harga Multi Satuan": [
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
                dataForm.bara = res.data.data.bara;
                dataForm.bara1 = res.data.data.bara1;
                dataForm.nama = res.data.data.nama;
                dataForm.div = res.data.data.dep.div.kode;
                getDepByDiv(res.data.data.dep.div.kode)
                dataForm.dep = res.data.data.dep.kode;
                getSdepByDep(res.data.data.dep.kode)
                dataForm.sdep = res.data.data.sdep;
                dataForm.satuan = res.data.data.satuan;
                dataForm.kode = res.data.data.kode;
                dataForm.hbeli = res.data.data.hbeli;
                dataForm.haver = res.data.data.haver;
                dataForm.hjual = res.data.data.hjual;
                dataForm.margin = res.data.data.margin;
                dataForm.hjualg = res.data.data.hjualg;
                dataForm.marging = res.data.data.marging;
                dataForm.hjualm = res.data.data.hjualm;
                dataForm.marginm = res.data.data.marginm;
                dataForm.hjualk1 = res.data.data.hjualk1;
                dataForm.hjualk2 = res.data.data.hjualk2;
                dataForm.best1 = res.data.data.best1;
                dataForm.best2 = res.data.data.best2;
                dataForm.dbest = res.data.data.dbest;
                dataForm.hbest = res.data.data.hbest;
                res.data.data.aktif === "T" ? setAktif(true) : setAktif(false)
                res.data.data.ltax === "T" ? setBkp(true) : setBkp(false)
                setTsatuan(res.data.data.tsatuan);
                setTbara(res.data.data.tbara);
                res.data.data.aktif === "T" ? setAktif(true) : setAktif(false);
                res.data.data.ltax === "T" ? setBkp(true) : setBkp(false);
                xForceRender();
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    Swal.fire("Gagal", err.response.data.message, "error");
                }
            });
    };

    const getDepByDiv = async (div) => {
        setIsLoading(true);
        const data = {
            div: div,
        };
        await axios
            .get(route("api.getDepByDiv", data))
            .then((res) => {
                setDeps(res.data.data);
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    Swal.fire("Gagal", err.response.data.message, "error");
                }
            });
        setIsLoading(false);
    };

    const getSdepByDep = async (dep) => {
        setIsLoading(true);
        const data = {
            dep: dep,
        };
        await axios
            .get(route("api.getSdepByDep", data))
            .then((res) => {
                setSdeps(res.data.data);
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    Swal.fire("Gagal", err.response.data.message, "error");
                }
            });
        setIsLoading(false);
    };

    const [forceRender, setForceRender] = useState(false);
    const xForceRender = () => {
        setForceRender(!forceRender);
    };

    const inputHandle = (e) => {
        if (e.target.name === "margin") {
            let hbeli = dataForm.hbeli
            dataForm.hjual = parseFloat(e.target.value / 100 * hbeli) + parseFloat(hbeli)
        }
        if (e.target.name === "hjual") {
            let hbeli = dataForm.hbeli
            let selisih = e.target.value - hbeli
            dataForm.margin = parseFloat(selisih / hbeli) * 100
        }
        if (e.target.name === "marging") {
            let hbeli = dataForm.hbeli
            dataForm.hjualg = parseFloat(e.target.value / 100 * hbeli) + parseFloat(hbeli)
        }
        if (e.target.name === "hjualg") {
            let hbeli = dataForm.hbeli
            let selisih = e.target.value - hbeli
            dataForm.marging = parseFloat(selisih / hbeli) * 100
        }
        if (e.target.name === "marginm") {
            let hbeli = dataForm.hbeli
            dataForm.hjualm = parseFloat(e.target.value / 100 * hbeli) + parseFloat(hbeli)
        }
        if (e.target.name === "hjualm") {
            let hbeli = dataForm.hbeli
            let selisih = e.target.value - hbeli
            dataForm.marginm = parseFloat(selisih / hbeli) * 100
        }
        dataForm[e.target.name] = e.target.value
        xForceRender()
    }

    const inputHandleTsatuan = (e) => {
        dataFormTsatuan[e.target.name] = e.target.value
        xForceRender()
    }

    const baru = () => {
        setDataForm({
            bara: "",
            bara1: "",
            nama: "",
            div: "",
            ndiv: "",
            dep: "",
            ndep: "",
            sdep: "",
            nsdep: "",
            satuan: "",
            kodeSupp: "",
            supplier: "",
            hbeli: "",
            haver: "",
            margin: "",
            hjual: "",
            marging: "",
            hjualg: "",
            marginm: "",
            hjualm: "",
            hjualk1: "",
            hjualk2: "",
            best1: "",
            best2: "",
            dbest: "",
            dbest1: "",
            hbest: "",
        });
        setTsatuan([]);
        setTbara([]);
        setIsEnabled(false);
    };

    const batal = () => {
        setDataForm({
            bara: "",
            bara1: "",
            nama: "",
            div: "",
            ndiv: "",
            dep: "",
            ndep: "",
            sdep: "",
            nsdep: "",
            satuan: "",
            kode: "",
            supplier: "",
            hbeli: "",
            haver: "",
            margin: "",
            hjual: "",
            marging: "",
            hjualg: "",
            marginm: "",
            hjualm: "",
            hjualk1: "",
            hjualk2: "",
            best1: "",
            best2: "",
            dbest: "",
            dbest1: "",
            hbest: "",
        });

        setDataFormTsatuan({
            bara1: "",
            satuan: "",
            qty: "",
            hjual: "",
            hjualg: "",
            hjualm: "",
            hjualk1: "",
            hjualk2: "",
        })
        setTsatuan([]);
        setTbara([]);
        setIsEnabled(true);
    };

    const storeStock = async () => {
        const data = {
            bara: dataForm.bara,
            bara1: dataForm.bara1,
            nama: dataForm.nama,
            dep: dataForm.dep,
            sdep: dataForm.sdep,
            satuan: dataForm.satuan,
            kode: dataForm.kode,
            hbeli: dataForm.hbeli,
            haver: dataForm.haver,
            hjual: dataForm.hjual,
            margin: dataForm.margin,
            hjualg: dataForm.hjualg,
            marging: dataForm.marging,
            hjualm: dataForm.hjualm,
            marginm: dataForm.marginm,
            aktif: aktif,
            hjualk1: dataForm.hjualk1,
            hjualk2: dataForm.hjualk2,
            ltax: bkp,
        }
        await axios.post(route("masterStock.store"), data).then((res) => {
            Swal.fire("Berhasil disimpan", "Berhasil Disimpan", "success");
            batal()
        }).catch((err) => {
            if (err.response.status === 404) {
                Swal.fire("Gagal", err.response.data.message, "error");
            }
        })
    }

    const storeTsatuanStock = async () => {
        const data = {
            bara: dataForm.bara,
            bara1: dataFormTsatuan.bara1,
            hjual: dataFormTsatuan.hjual,
            satuan: dataFormTsatuan.satuan,
            hjualg: dataFormTsatuan.hjualg,
            hjualm: dataFormTsatuan.hjualm,
            hjualk1: dataFormTsatuan.hjualk1,
            hjualk2: dataFormTsatuan.hjualk2,
        }
        await axios.post(route("masterStock.tsatuan.store"), data).then((res) => {
            Swal.fire("Berhasil disimpan", "Berhasil Disimpan", "success");
            batal()
        }).catch((err) => {
            if (err.response.status === 404) {
                Swal.fire("Gagal", err.response.data.message, "error");
            }
        })
    }

    return (
        <>
            {isLoading && <Loading />}
            <MasterAdmin title={"Master Stock"}>
                <div className="overflow-x-auto">
                    <div className="card bg-base-100 mb-2">
                        <div className="card-body">
                            <div className="flex flex-row gap-1">
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={baru}
                                >
                                    Baru
                                </button>
                                <button
                                    className="btn btn-error btn-sm"
                                    onClick={() => batal()}
                                >
                                    Batal
                                </button>
                                {dataForm.bara && (
                                    <>
                                        <button
                                            className="btn btn-warning btn-sm"
                                            onClick={() => setIsEnabled(false)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-accent btn-sm"
                                            onClick={() => {
                                                setIsEnabled(false);
                                                storeStock()
                                            }}
                                        >
                                            Simpan
                                        </button>

                                    </>
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-1">
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        className="btn btn-ghost btn-xs"
                                        onClick={() => {
                                            window.my_modal_1_stock.showModal();
                                            setSearchBy("bara");
                                            getStock();
                                        }}
                                    >
                                        Kode Stock
                                    </button>
                                    <input
                                        disabled={isEnabled}
                                        type="text"
                                        name="bara"
                                        className="input input-bordered input-xs"
                                        value={dataForm.bara}
                                        onChange={(e) => inputHandle(e)}
                                    />
                                    <button
                                        className="btn btn-ghost btn-xs"
                                        onClick={() => {
                                            window.my_modal_1_stock.showModal();
                                            setSearchBy("bara1");
                                            getStock();
                                        }}
                                    >
                                        Barcode
                                    </button>
                                    <input
                                        disabled={isEnabled}
                                        type="text"
                                        name="bara1"
                                        className="input input-bordered input-xs"
                                        value={dataForm.bara1}
                                        onChange={(e) => inputHandle(e)}
                                    />
                                    <button
                                        className="btn btn-ghost btn-xs"
                                        onClick={() => {
                                            window.my_modal_1_stock.showModal();
                                            setSearchBy("nama");
                                            getStock();
                                        }}
                                    >
                                        Nama Barang
                                    </button>
                                    <input
                                        disabled={isEnabled}
                                        type="text"
                                        name="nama"
                                        className="input input-bordered input-xs"
                                        value={dataForm.nama}
                                        onChange={(e) => inputHandle(e)}
                                    />
                                    <button className="btn btn-ghost btn-xs">
                                        Divisi
                                    </button>
                                    <select
                                        type="text"
                                        className="select select-bordered select-xs"
                                        value={dataForm.div}
                                        name="div"
                                        onChange={(e) => {
                                            getDepByDiv(e.target.value);
                                            inputHandle(e)
                                        }
                                        }

                                    >
                                        <option value="">Pilih</option>
                                        {props.div.map((d, index) => (
                                            <option value={d.kode}>
                                                {d.ket}
                                            </option>
                                        ))}
                                    </select>
                                    <button className="btn btn-ghost btn-xs">
                                        Departemen
                                    </button>
                                    <select
                                        type="text"
                                        name="dep"
                                        className="select select-bordered select-xs"
                                        value={dataForm.dep}
                                        onChange={(e) => {
                                            getSdepByDep(e.target.value);
                                            inputHandle(e)
                                        }
                                        }
                                    >
                                        <option value="">Pilih</option>
                                        {deps.map((d, index) => (
                                            <option value={d.kode}>
                                                {d.ket}
                                            </option>
                                        ))}
                                    </select>
                                    <button className="btn btn-ghost btn-xs">
                                        Sub Departemen
                                    </button>
                                    <select
                                        type="text"
                                        className="select select-bordered select-xs"
                                        name="sdep"
                                        value={dataForm.sdep}
                                        onChange={(e) => {
                                            inputHandle(e)
                                        }
                                        }
                                    >
                                        <option value="">Pilih</option>
                                        {sdeps.map((d, index) => (
                                            <option value={d.kode}>
                                                {d.ket}
                                            </option>
                                        ))}
                                    </select>
                                    <button className="btn btn-ghost btn-xs">
                                        Satuan
                                    </button>
                                    <select
                                        type="text"
                                        className="select select-bordered select-xs"
                                        name="satuan"
                                        value={dataForm.satuan}
                                        onChange={(e) => {
                                            inputHandle(e)
                                        }
                                        }
                                    >
                                        <option value="">Pilih</option>
                                        {props.satuan.map((d, index) => (
                                            <option value={d.satuan}>
                                                {d.satuan}
                                            </option>
                                        ))}
                                    </select>
                                    <button className="btn btn-ghost btn-xs">
                                        Supplier
                                    </button>
                                    <select
                                        type="text"
                                        className="select select-bordered select-xs"
                                        name="kode"
                                        value={dataForm.kode}
                                        onChange={(e) => {
                                            inputHandle(e)
                                        }
                                        }
                                    >
                                        <option value="">Pilih</option>
                                        {props.supp.map((d, index) => (
                                            <option value={d.kode}>
                                                {d.nama}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="">
                                    <div className="flex flex-row gap-1 items-center">
                                        <label
                                            htmlFor=""
                                            className="text-sm label label-text w-20"
                                        >
                                            Tidak Aktif
                                        </label>
                                        <Switch
                                            checked={aktif}
                                            onChange={setAktif}
                                            className={`${aktif
                                                ? "bg-teal-900"
                                                : "bg-teal-700"
                                                }
          relative inline-flex h-[24px] w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                                        >
                                            <span className="sr-only">
                                                Use setting
                                            </span>
                                            <span
                                                aria-hidden="true"
                                                className={`${aktif
                                                    ? "translate-x-9"
                                                    : "translate-x-0"
                                                    }
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                            />
                                        </Switch>
                                        <label
                                            htmlFor=""
                                            className="text-sm label label-text"
                                        >
                                            Aktif
                                        </label>
                                    </div>
                                    <div className="flex flex-row gap-1 items-center">
                                        <label
                                            htmlFor=""
                                            className="text-sm label label-text w-20"
                                        >
                                            Non BKP
                                        </label>
                                        <Switch
                                            checked={bkp}
                                            onChange={setBkp}
                                            className={`${bkp
                                                ? "bg-teal-900"
                                                : "bg-teal-700"
                                                }
          relative inline-flex h-[24px] w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                                        >
                                            <span className="sr-only">
                                                Use setting
                                            </span>
                                            <span
                                                aria-hidden="true"
                                                className={`${bkp
                                                    ? "translate-x-9"
                                                    : "translate-x-0"
                                                    }
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                            />
                                        </Switch>
                                        <label
                                            htmlFor=""
                                            className="text-sm label label-text"
                                        >
                                            BKP
                                        </label>
                                    </div>
                                </div>
                            </div>
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
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div>
                                                            <div className="flex flex-row items-center gap-2">
                                                                <label className="label label-text w-40 text-[8pt]">
                                                                    Harga Beli
                                                                </label>
                                                                <input
                                                                    disabled={
                                                                        isEnabled
                                                                    }
                                                                    type="text"
                                                                    name="hbeli"
                                                                    className="input input-bordered input-xs"
                                                                    value={
                                                                        dataForm.hbeli
                                                                    }
                                                                    onChange={(e) => {
                                                                        inputHandle(e)
                                                                    }
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="flex flex-row items-center gap-2">
                                                                <label className="label label-text w-40 text-[8pt]">
                                                                    Harga Pokok
                                                                </label>
                                                                <input
                                                                    disabled={
                                                                        isEnabled
                                                                    }
                                                                    name="haver"
                                                                    type="text"
                                                                    className="input input-bordered input-xs"
                                                                    value={
                                                                        dataForm.haver
                                                                    }
                                                                    onChange={(e) => {
                                                                        inputHandle(e)
                                                                    }
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="flex flex-row items-center gap-2">
                                                                <label className="label label-text w-40 text-[8pt]">
                                                                    Mark-Up
                                                                    Eceran
                                                                </label>
                                                                <input
                                                                    disabled={
                                                                        isEnabled
                                                                    }
                                                                    type="text"
                                                                    name="margin"
                                                                    className="input input-bordered input-xs"
                                                                    value={
                                                                        dataForm.margin
                                                                    }
                                                                    onChange={(e) => {
                                                                        inputHandle(e)
                                                                    }
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="flex flex-row items-center gap-2">
                                                                <label className="label label-text w-40 text-[8pt]">
                                                                    Harga Jual
                                                                    Eceran
                                                                </label>
                                                                <input
                                                                    disabled={
                                                                        isEnabled
                                                                    }
                                                                    name="hjual"
                                                                    type="text"
                                                                    className="input input-bordered input-xs"
                                                                    value={
                                                                        dataForm.hjual
                                                                    }
                                                                    onChange={(e) => {
                                                                        inputHandle(e)
                                                                    }
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="flex flex-row items-center gap-2">
                                                                <label className="label label-text w-40 text-[8pt]">
                                                                    Mark-Up
                                                                    Grosir
                                                                </label>
                                                                <input
                                                                    disabled={
                                                                        isEnabled
                                                                    }
                                                                    name="marging"
                                                                    type="text"
                                                                    className="input input-bordered input-xs"
                                                                    value={
                                                                        dataForm.marging
                                                                    }
                                                                    onChange={(e) => {
                                                                        inputHandle(e)
                                                                    }
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="flex flex-row items-center gap-2">
                                                                <label className="label label-text w-40 text-[8pt]">
                                                                    Harga Jual
                                                                    Grosir
                                                                </label>
                                                                <input
                                                                    disabled={
                                                                        isEnabled
                                                                    }
                                                                    name="hjualg"
                                                                    type="text"
                                                                    className="input input-bordered input-xs"
                                                                    value={
                                                                        dataForm.hjualg
                                                                    }
                                                                    onChange={(e) => {
                                                                        inputHandle(e)
                                                                    }
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="flex flex-row items-center gap-2">
                                                                <label className="label label-text w-40 text-[8pt]">
                                                                    Mark-Up
                                                                    Anggota
                                                                </label>
                                                                <input
                                                                    disabled={
                                                                        isEnabled
                                                                    }
                                                                    type="text"
                                                                    name="marginm"
                                                                    className="input input-bordered input-xs"
                                                                    value={
                                                                        dataForm.marginm
                                                                    }
                                                                    onChange={(e) => {
                                                                        inputHandle(e)
                                                                    }
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="flex flex-row items-center gap-2">
                                                                <label className="label label-text w-40 text-[8pt]">
                                                                    Harga Jual
                                                                    Anggota
                                                                </label>
                                                                <input
                                                                    disabled={
                                                                        isEnabled
                                                                    }
                                                                    name="hjualm"
                                                                    type="text"
                                                                    className="input input-bordered input-xs"
                                                                    value={
                                                                        dataForm.hjualm
                                                                    }
                                                                    onChange={(e) => {
                                                                        inputHandle(e)
                                                                    }
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="flex flex-row items-center gap-2">
                                                                <label className="label label-text w-40 text-[8pt]">
                                                                    Hrg.Khusus
                                                                    #1
                                                                </label>
                                                                <input
                                                                    disabled={
                                                                        isEnabled
                                                                    }
                                                                    type="text"
                                                                    name="hjualk1"
                                                                    className="input input-bordered input-xs"
                                                                    value={
                                                                        dataForm.hjualk1
                                                                    }
                                                                    onChange={(e) => {
                                                                        inputHandle(e)
                                                                    }
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="flex flex-row items-center gap-2">
                                                                <label className="label label-text w-40 text-[8pt]">
                                                                    Hrg.Khusus
                                                                    #2
                                                                </label>
                                                                <input
                                                                    disabled={
                                                                        isEnabled
                                                                    }
                                                                    name="hjualk2"
                                                                    type="text"
                                                                    className="input input-bordered input-xs"
                                                                    value={
                                                                        dataForm.hjualk2
                                                                    }
                                                                    onChange={(e) => {
                                                                        inputHandle(e)
                                                                    }
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="flex flex-row items-center gap-2">
                                                                <div className="card bg-base-100 w-full">
                                                                    <div className="card-body">
                                                                        <p className="text-xs">
                                                                            Informasi
                                                                            Best
                                                                            Buy
                                                                        </p>
                                                                        <div className="flex flex-row items-center gap-3">
                                                                            <input
                                                                                type="date"
                                                                                className="input input-bordered input-xs text-7pt"
                                                                                name="best1"
                                                                                value={
                                                                                    dataForm.best1
                                                                                }
                                                                                readOnly
                                                                            />
                                                                            <span>
                                                                                s/d
                                                                            </span>
                                                                            <input
                                                                                type="date"
                                                                                className="input input-bordered input-xs text-7pt"
                                                                                name="best2"
                                                                                value={
                                                                                    dataForm.best2
                                                                                }
                                                                                readOnly
                                                                            />
                                                                        </div>
                                                                        <div className="flex flex-row items-center gap-3 mt-3">
                                                                            <label
                                                                                htmlFor=""
                                                                                className="text-xs w-24"
                                                                            >
                                                                                Discount
                                                                            </label>
                                                                            <input
                                                                                type="text"
                                                                                className="input input-bordered input-xs text-8pt"
                                                                                name="dbest"
                                                                                value={
                                                                                    dataForm.dbest
                                                                                }
                                                                                readOnly
                                                                            />
                                                                        </div>
                                                                        <div className="flex flex-row items-center gap-3">
                                                                            <label
                                                                                htmlFor=""
                                                                                className="text-xs w-24"
                                                                            >
                                                                                Harga
                                                                                Best
                                                                                Buy
                                                                            </label>
                                                                            <input
                                                                                type="text"
                                                                                className="input input-bordered input-xs text-8pt"
                                                                                name="hbest"
                                                                                value={
                                                                                    dataForm.hbest
                                                                                }
                                                                                readOnly
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Tab.Panel>
                                        <Tab.Panel>
                                            <div className="card bg-base-200">
                                                <div className="card-body">
                                                    <div className="overflow-x-auto">
                                                        <table className="table table-xs">
                                                            <thead>
                                                                <tr>
                                                                    <th>
                                                                        Gudang
                                                                    </th>
                                                                    <th>
                                                                        Awal
                                                                    </th>
                                                                    <th>
                                                                        Masuk
                                                                    </th>
                                                                    <th>
                                                                        Keluar
                                                                    </th>
                                                                    <th>
                                                                        Saldo
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {tbara.map(
                                                                    (
                                                                        d,
                                                                        index
                                                                    ) => (
                                                                        <tr>
                                                                            <td>
                                                                                {
                                                                                    d
                                                                                        ?.gudang
                                                                                        ?.ket
                                                                                }
                                                                            </td>
                                                                            <td>
                                                                                {
                                                                                    d.awal
                                                                                }
                                                                            </td>
                                                                            <td>
                                                                                {
                                                                                    d.masuk
                                                                                }
                                                                            </td>
                                                                            <td>
                                                                                {
                                                                                    d.keluar
                                                                                }
                                                                            </td>
                                                                            <td>
                                                                                {
                                                                                    d.saldo
                                                                                }
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </Tab.Panel>
                                        <Tab.Panel>
                                            <div className="card bg-base-200">
                                                <div className="card-body">
                                                    <div className="grid grid-cols-3 gap-2">
                                                        <div className="flex flex-row items-center gap-3">
                                                            <label
                                                                htmlFor=""
                                                                className="text-xs w-24"
                                                            >
                                                                Barcode
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="input input-bordered input-xs text-8pt"
                                                                name="bara1"
                                                                value={
                                                                    dataFormTsatuan.bara1
                                                                }
                                                                onChange={(e) => {
                                                                    inputHandleTsatuan(e)
                                                                }
                                                                }
                                                            />
                                                        </div>
                                                        <div className="flex flex-row items-center gap-3">
                                                            <label
                                                                htmlFor=""
                                                                className="text-xs w-24"
                                                            >
                                                                Satuan
                                                            </label>
                                                            <select
                                                                type="text"
                                                                className="select select-bordered select-xs text-8pt"
                                                                name="satuan"
                                                                value={
                                                                    dataFormTsatuan.satuan
                                                                }
                                                                onChange={(e) => {
                                                                    inputHandleTsatuan(e)
                                                                }
                                                                }
                                                            >
                                                                <option value="">
                                                                    Pilih
                                                                </option>
                                                                {props.satuan.map(
                                                                    (
                                                                        d,
                                                                        index
                                                                    ) => (
                                                                        <option
                                                                            value={
                                                                                d.satuan
                                                                            }
                                                                        >
                                                                            {
                                                                                d.satuan
                                                                            }
                                                                        </option>
                                                                    )
                                                                )}
                                                            </select>
                                                        </div>
                                                        <div className="flex flex-row items-center gap-3">
                                                            <label
                                                                htmlFor=""
                                                                className="text-xs w-24"
                                                            >
                                                                Faktor
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="input input-bordered input-xs text-8pt"
                                                                name="qty"
                                                                value={
                                                                    dataFormTsatuan.qty
                                                                }
                                                                onChange={(e) => {
                                                                    inputHandleTsatuan(e)
                                                                }
                                                                }
                                                            />
                                                        </div>
                                                        <div className="flex flex-row items-center gap-3">
                                                            <label
                                                                htmlFor=""
                                                                className="text-xs w-24"
                                                            >
                                                                Eceran
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="input input-bordered input-xs text-8pt"
                                                                name="hjual"
                                                                value={
                                                                    dataFormTsatuan.hjual
                                                                }
                                                                onChange={(e) => {
                                                                    inputHandleTsatuan(e)
                                                                }
                                                                }
                                                            />
                                                        </div>
                                                        <div className="flex flex-row items-center gap-3">
                                                            <label
                                                                htmlFor=""
                                                                className="text-xs w-24"
                                                            >
                                                                Grosir
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="input input-bordered input-xs text-8pt"
                                                                name="hjualg"
                                                                value={
                                                                    dataFormTsatuan.hjualg
                                                                }
                                                                onChange={(e) => {
                                                                    inputHandleTsatuan(e)
                                                                }
                                                                }
                                                            />
                                                        </div>
                                                        <div className="flex flex-row items-center gap-3">
                                                            <label
                                                                htmlFor=""
                                                                className="text-xs w-24"
                                                            >
                                                                Anggota
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="input input-bordered input-xs text-8pt"
                                                                name="hjualm"
                                                                value={
                                                                    dataFormTsatuan.hjualm
                                                                }
                                                                onChange={(e) => {
                                                                    inputHandleTsatuan(e)
                                                                }
                                                                }
                                                            />
                                                        </div>
                                                        <div className="flex flex-row items-center gap-3">
                                                            <label
                                                                htmlFor=""
                                                                className="text-xs w-24"
                                                            >
                                                                Khusus#1
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="input input-bordered input-xs text-8pt"
                                                                name="hjualk1"
                                                                value={
                                                                    dataFormTsatuan.hjualk1
                                                                }
                                                                onChange={(e) => {
                                                                    inputHandleTsatuan(e)
                                                                }
                                                                }
                                                            />
                                                        </div>
                                                        <div className="flex flex-row items-center gap-3">
                                                            <label
                                                                htmlFor=""
                                                                className="text-xs w-24"
                                                            >
                                                                Khusus#2
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="input input-bordered input-xs text-8pt"
                                                                name="hjualk2"
                                                                value={
                                                                    dataFormTsatuan.hjualk2
                                                                }
                                                                onChange={(e) => {
                                                                    inputHandleTsatuan(e)
                                                                }
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-row items-center gap-1">
                                                        <button className="btn btn-xs text-[7pt] btn-primary" onClick={storeTsatuanStock}>
                                                            Simpan
                                                        </button>
                                                        <button className="btn btn-xs text-[7pt] btn-error">
                                                            Batal
                                                        </button>
                                                    </div>
                                                    <div className="divider"></div>
                                                    <div className="overflow-x-auto">
                                                        <table className="table table-xs">
                                                            <thead>
                                                                <tr>
                                                                    <th>
                                                                        Barcode
                                                                    </th>
                                                                    <th>
                                                                        Satuan
                                                                    </th>
                                                                    <th>
                                                                        Faktor
                                                                    </th>
                                                                    <th>
                                                                        Eceran
                                                                    </th>
                                                                    <th>
                                                                        Grosir
                                                                    </th>
                                                                    <th>
                                                                        Anggota
                                                                    </th>
                                                                    <th>
                                                                        Khusus#1
                                                                    </th>
                                                                    <th>
                                                                        Khusus#2
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {tsatuan.map(
                                                                    (
                                                                        d,
                                                                        index
                                                                    ) => (
                                                                        <tr>
                                                                            <td>
                                                                                {
                                                                                    d.bara1
                                                                                }
                                                                            </td>
                                                                            <td>
                                                                                {
                                                                                    d.satuan
                                                                                }
                                                                            </td>
                                                                            <td>
                                                                                {
                                                                                    d.qty
                                                                                }
                                                                            </td>
                                                                            <td>
                                                                                {
                                                                                    d.hjual
                                                                                }
                                                                            </td>
                                                                            <td>
                                                                                {
                                                                                    d.hjualg
                                                                                }
                                                                            </td>
                                                                            <td>
                                                                                {
                                                                                    d.hjualm
                                                                                }
                                                                            </td>
                                                                            <td>
                                                                                {
                                                                                    d.hjualk1
                                                                                }
                                                                            </td>
                                                                            <td>
                                                                                {
                                                                                    d.hjualk2
                                                                                }
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </Tab.Panel>
                                    </Tab.Panels>
                                </Tab.Group>
                            </div>
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
