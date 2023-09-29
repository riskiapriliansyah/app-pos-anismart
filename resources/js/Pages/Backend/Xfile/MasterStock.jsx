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
    const [aktif, setAktif] = useState(false);
    const [bkp, setBkp] = useState(false);
    const [kodeSearch, setKodeSearch] = useState("");
    const [dataStock, setDataStock] = useState([]);
    const [searchBy, setSearchBy] = useState("bara1");
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
        aver: "",
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
    
    const [tsatuan, setTsatuan] = useState([])

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
                dataForm.bara = res.data.data.bara
                dataForm.bara1 = res.data.data.bara1
                dataForm.nama = res.data.data.nama
                dataForm.div = res.data.data.div
                dataForm.dep = res.data.data.dep
                dataForm.sdep = res.data.data.sdep
                dataForm.satuan = res.data.data.satuan
                dataForm.kode = res.data.data.kode
                dataForm.hbeli = res.data.data.hbeli
                dataForm.haver = res.data.data.haver
                dataForm.hjual = res.data.data.hjual
                dataForm.margin = res.data.data.margin
                dataForm.hjualg = res.data.data.hjualg
                dataForm.marging = res.data.data.marging
                dataForm.hjualm = res.data.data.hjualm
                dataForm.marginm = res.data.data.marginm
                dataForm.hjualk1 = res.data.data.hjualk1
                dataForm.hjualk2 = res.data.data.hjualk2
                dataForm.best1 = res.data.data.best1
                dataForm.best2 = res.data.data.best2
                dataForm.dbest = res.data.data.dbest
                dataForm.hbest = res.data.data.hbest
                setTsatuan(res.data.data.tsatuan)
                res.data.data.aktif === "T" ? setAktif(true) : setAktif(false)
                res.data.data.ltax === "T" ? setBkp(true) : setBkp(false)
                // setDataForm(dataForm)
                xForceRender()
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

    return (
        <>
            {isLoading && <Loading />}
            <MasterAdmin title={"Master Stock"}>
                <div className="overflow-x-auto">
                    <div className="card bg-base-100 mb-2">
                        <div className="card-body">
                            <div className="grid grid-cols-2 gap-1">
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        className="btn btn-ghost btn-xs"
                                        onClick={() => {
                                            window.my_modal_1_stock.showModal();
                                            getStock();
                                        }}
                                    >
                                        Kode Stock
                                    </button>
                                    <input
                                        type="text"
                                        className="input input-bordered input-xs"
                                        value={dataForm.bara}
                                    />
                                    <button className="btn btn-ghost btn-xs">
                                        Barcode
                                    </button>
                                    <input
                                        type="text"
                                        className="input input-bordered input-xs"
                                        value={dataForm.bara1}
                                    />
                                    <button className="btn btn-ghost btn-xs">
                                        Nama Barang
                                    </button>
                                    <input
                                        type="text"
                                        className="input input-bordered input-xs"
                                        value={dataForm.nama}
                                    />
                                    <button className="btn btn-ghost btn-xs">
                                        Divisi
                                    </button>
                                    <select
                                        type="text"
                                        className="select select-bordered select-xs"
                                        value={dataForm.div}
                                    >
                                        <option value="">Pilih</option>
                                        {props.div.map((d,index) => (
                                            <option value={d.kode}>{d.ket}</option>
                                        ))}
                                    </select>
                                    <button className="btn btn-ghost btn-xs">
                                        Departemen
                                    </button>
                                    <select
                                        type="text"
                                        className="select select-bordered select-xs"
                                        value={dataForm.dep}
                                    >
                                        <option value="">Pilih</option>
                                        {props.dep.map((d,index) => (
                                            <option value={d.kode}>{d.ket}</option>
                                        ))}
                                    </select>
                                    <button className="btn btn-ghost btn-xs">
                                        Sub Departemen
                                    </button>
                                    <select
                                        type="text"
                                        className="select select-bordered select-xs"
                                        value={dataForm.sdep}
                                    >
                                        <option value="">Pilih</option>
                                        {props.sdep.map((d,index) => (
                                            <option value={d.kode}>{d.ket}</option>
                                        ))}
                                    </select>
                                    <button className="btn btn-ghost btn-xs">
                                        Satuan
                                    </button>
                                    <select
                                        type="text"
                                        className="select select-bordered select-xs"
                                        value={dataForm.satuan}
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
                                        value={dataForm.kode}
                                    >
                                        <option value="">Pilih</option>
                                        {props.supp.map((d,index) => (
                                            <option value={d.kode}>{d.nama}</option>
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
                                            className={`${
                                                aktif
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
                                                className={`${
                                                    aktif
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
                                            className={`${
                                                bkp
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
                                                className={`${
                                                    bkp
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
                                                                    type="text"
                                                                    className="input input-bordered input-xs"
                                                                    value={dataForm.hbeli}
                                                                />
                                                            </div>
                                                            <div className="flex flex-row items-center gap-2">
                                                                <label className="label label-text w-40 text-[8pt]">
                                                                    Harga Pokok
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="input input-bordered input-xs"
                                                                    value={dataForm.haver}
                                                                />
                                                            </div>
                                                            <div className="flex flex-row items-center gap-2">
                                                                <label className="label label-text w-40 text-[8pt]">
                                                                    Mark-Up
                                                                    Eceran
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="input input-bordered input-xs"
                                                                    value={dataForm.margin}
                                                                />
                                                            </div>
                                                            <div className="flex flex-row items-center gap-2">
                                                                <label className="label label-text w-40 text-[8pt]">
                                                                    Harga Jual
                                                                    Eceran
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="input input-bordered input-xs"
                                                                    value={dataForm.hjual}
                                                                />
                                                            </div>
                                                            <div className="flex flex-row items-center gap-2">
                                                                <label className="label label-text w-40 text-[8pt]">
                                                                    Mark-Up
                                                                    Grosir
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="input input-bordered input-xs"
                                                                    value={dataForm.marging}
                                                                />
                                                            </div>
                                                            <div className="flex flex-row items-center gap-2">
                                                                <label className="label label-text w-40 text-[8pt]">
                                                                    Harga Jual
                                                                    Grosir
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="input input-bordered input-xs"
                                                                    value={dataForm.hjualg}
                                                                />
                                                            </div>
                                                            <div className="flex flex-row items-center gap-2">
                                                                <label className="label label-text w-40 text-[8pt]">
                                                                    Mark-Up
                                                                    Anggota
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="input input-bordered input-xs"
                                                                    value={dataForm.marginm}
                                                                />
                                                            </div>
                                                            <div className="flex flex-row items-center gap-2">
                                                                <label className="label label-text w-40 text-[8pt]">
                                                                    Harga Jual
                                                                    Anggota
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="input input-bordered input-xs"
                                                                    value={dataForm.hjualm}
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
                                                                    type="text"
                                                                    className="input input-bordered input-xs"
                                                                    value={dataForm.hjualk1}
                                                                />
                                                            </div>
                                                            <div className="flex flex-row items-center gap-2">
                                                                <label className="label label-text w-40 text-[8pt]">
                                                                    Hrg.Khusus
                                                                    #2
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="input input-bordered input-xs"
                                                                    value={dataForm.hjualk2}
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
                                                                                value={dataForm.best1}
                                                                            />
                                                                            <span>
                                                                                s/d
                                                                            </span>
                                                                            <input
                                                                                type="date"
                                                                                className="input input-bordered input-xs text-7pt"
                                                                                value={dataForm.best2}
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
                                                                                value={dataForm.dbest}
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
                                                                                value={dataForm.hbest}
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
                                                                <tr>
                                                                    <td>
                                                                        TOKO
                                                                        APOLLO
                                                                        P.BATUR
                                                                    </td>
                                                                    <td>0</td>
                                                                    <td>4</td>
                                                                    <td>4</td>
                                                                    <td>0</td>
                                                                </tr>
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
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-row items-center gap-1">
                                                        <button className="btn btn-xs text-[7pt] btn-primary">
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
                                                                {tsatuan.map((d,index) => (
                                                                    <tr>
                                                                        <td>{d.bara1}</td>
                                                                        <td>{d.satuan}</td>
                                                                        <td>{d.qty}</td>
                                                                        <td>{d.hjual}</td>
                                                                        <td>{d.hjualg}</td>
                                                                        <td>{d.hjualm}</td>
                                                                        <td>{d.hjualk1}</td>
                                                                        <td>{d.hjualk2}</td>
                                                                    </tr>
                                                                ))}
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
                                                    onClick={() => getStockByBara(d.bara)}
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
