import Loading from "@/Components/Loading";
import MasterAdmin from "@/Layouts/MasterAdmin";
import { Switch } from "@headlessui/react";
import { useState } from "react";
import { MdMan, MdWoman } from "react-icons/md";

export default function MasterStockPage(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [aktif, setAktif] = useState(false);
    const [bkp, setBkp] = useState(false);
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
        hbest: ""
    })
    return (
        <>
            {isLoading && <Loading />}
            <MasterAdmin title={"Master Stock"}>
                <div className="overflow-x-auto">
                    <div className="card bg-base-100 mb-2">
                        <div className="card-body">
                            <div className="grid grid-cols-2 gap-1">
                                <div className="grid grid-cols-2 gap-2">
                                    <button className="btn btn-ghost btn-xs">
                                        Kode Stock
                                    </button>
                                    <input
                                        type="text"
                                        className="input input-bordered input-xs"
                                    />
                                    <button className="btn btn-ghost btn-xs">
                                        Barcode
                                    </button>
                                    <input
                                        type="text"
                                        className="input input-bordered input-xs"
                                    />
                                    <button className="btn btn-ghost btn-xs">
                                        Nama Barang
                                    </button>
                                    <input
                                        type="text"
                                        className="input input-bordered input-xs"
                                    />
                                    <button className="btn btn-ghost btn-xs">
                                        Divisi
                                    </button>
                                    <input
                                        type="text"
                                        className="input input-bordered input-xs"
                                    />
                                    <button className="btn btn-ghost btn-xs">
                                        Departemen
                                    </button>
                                    <input
                                        type="text"
                                        className="input input-bordered input-xs"
                                    />
                                    <button className="btn btn-ghost btn-xs">
                                        Sub Departemen
                                    </button>
                                    <input
                                        type="text"
                                        className="input input-bordered input-xs"
                                    />
                                    <button className="btn btn-ghost btn-xs">
                                        Satuan
                                    </button>
                                    <input
                                        type="text"
                                        className="input input-bordered input-xs"
                                    />
                                    <button className="btn btn-ghost btn-xs">
                                        Supplier
                                    </button>
                                    <input
                                        type="text"
                                        className="input input-bordered input-xs"
                                    />
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
                        </div>
                    </div>
                </div>
            </MasterAdmin>
        </>
    );
}
