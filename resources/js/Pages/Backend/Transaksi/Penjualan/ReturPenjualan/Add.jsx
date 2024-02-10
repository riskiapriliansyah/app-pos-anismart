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

export default function ReturPenjualanAddPage(props) {
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
    const [searchBy, setSearchBy] = useState("bara");
    const [kodeSearch, setKodeSearch] = useState("");
    const [kodeSuppSearch, setKodeSuppSearch] = useState("");
    const [kodeSupp, setKodeSupp] = useState("");
    const [namaSupp, setNamaSupp] = useState("");
    const [ket, setKet] = useState("");
    const [barcode, setBarcode] = useState("");
    const [notaBeliSearch, setNotaBelisearch] = useState("");
    const [nota, setNota] = useState("");
    const [notaBeli, setNotaBeli] = useState("");
    const [dataPo, setDataPo] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const [disc, setDisc] = useState(0);
    const [ndisc, setNdisc] = useState(0);
    const [ppn, setPpn] = useState(0);
    const [nppn, setNppn] = useState(0);
    const [total, setTotal] = useState(0);
    const [lok, setLok] = useState("");
    const [namaGudang, setNamaGudang] = useState("");
    const [dataGudang, setDataGudang] = useState([]);
    const [tgl, settgl] = useState(tanggal);
    const [tglJatuh, setTglJatuh] = useState(tanggal);
    const [status, setStatus] = useState(0);
    window.onkeypress = function (event) {
        if (event.keyCode === 115) {
            hitungTotalFooter();
        }
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

    const getStockByBara = async (e) => {
        if (e.key === "Enter") {
            const data = {
                kode: barcode,
            };
            await axios
                .get(route("api.getStockByBara", data))
                .then((res) => {
                    if (res.data.data) {
                        if (res.data.data.length > 0) {
                            addDataTb(res.data.data[0]);
                        } else {
                            window.my_modal_1_stock.showModal();
                            getStock();
                        }
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

    const getPenjualan = async (x) => {
        const data = {
            kode: x,
        };
        await axios
            .get(route("api.getPenjualan", data))
            .then((res) => {
                setDataPo(res.data.data.data);
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    Swal.fire("Gagal", err.response.data.message, "error");
                }
            });
    };

    const getGudang = async () => {
        await axios
            .get(route("api.getGudang"))
            .then((res) => {
                setDataGudang(res.data.data);
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    Swal.fire("Gagal", err.response.data.message, "error");
                }
            });
    };

    const getCust = async () => {
        setKodeSuppSearch("");
        const data = {
            searchBy: "*",
            kode: kodeSuppSearch,
        };
        await axios
            .get(route("api.getCust", data))
            .then((res) => {
                setDataSupplier(res.data.data);
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    Swal.fire("Gagal", err.response.data.message, "error");
                }
            });
    };

    const getCustSearch = async (x) => {
        const data = {
            searchBy: "nama",
            kode: x,
        };
        await axios
            .get(route("api.getCust", data))
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
                    qty: 1,
                    zqty: data.qty,
                    xzqty: data.qty,
                    hjual: data.hjual,
                    disc: 0,
                    disc1: 0,
                    ndisc: 0,
                    ndisc1: 0,
                    total: data.hjual,
                },
            ]);
            xForceRender();

            let xSubTotal = 0;
            let xNdisc = 0;
            let xNppn = 0;

            dataTb.map((d, index) => {
                xSubTotal = xSubTotal + d.total;
                xNdisc = (disc / 100) * xSubTotal;
                xNppn = (ppn / 100) * (xSubTotal - xNdisc);
                setSubTotal(xSubTotal);
                setNdisc(xNdisc);
                setNppn(xNppn);
                setTotal(xSubTotal - xNdisc + xNppn);
            });
            xForceRender();
        }
    };

    // const addDataTbFromPo = (data) => {
    //     setDataTb([]);
    //     setSubTotal(0);
    //     setNdisc(0);
    //     setDisc(0);
    //     setNppn(0);
    //     setPpn(0);
    //     setTotal(0);
    //     data.map((d, index) => {
    //         setDataTb((isi) => [
    //             ...isi,
    //             {
    //                 bara: d.bara,
    //                 bara1: d.bara1,
    //                 nama: d.nama,
    //                 satuan: d.satuan,
    //                 qty: d.qty,
    //                 hbeli: d.harga,
    //                 disc: d.disc,
    //                 ndisc: d.ndisc,
    //                 total: d.qty * d.harga,
    //             },
    //         ]);
    //     });
    // };

    const deleteItem = (i) => {
        dataTb.splice(i, 1);
        setDataTb(dataTb);
        hitungTotalFooter();
        xForceRender();
    };

    const hitungTotalDataTb = (i) => {
        let subTotal = dataTb[i].hjual * dataTb[i].qty;
        let yndisc = (dataTb[i].disc / 100) * subTotal;
        let yndisc1 = (dataTb[i].disc1 / 100) * (subTotal - yndisc);
        dataTb[i].total = Math.round(subTotal - yndisc - yndisc1);
        dataTb[i].ndisc = yndisc;
        dataTb[i].ndisc1 = yndisc1;

        let xSubTotal = 0;
        let xNdisc = 0;
        let xNppn = 0;

        dataTb.map((d, index) => {
            xSubTotal = Math.round(xSubTotal + d.total);
            xNdisc = (disc / 100) * xSubTotal;
            xNppn = (ppn / 100) * (xSubTotal - xNdisc);
            setSubTotal(xSubTotal);
            setNdisc(Math.round(xNdisc));
            setNppn(Math.round(xNppn));
            setTotal(Math.round(xSubTotal - xNdisc + xNppn));
        });
        xForceRender();
    };

    const hitungTotalFooter = () => {
        let xSubTotal = 0;
        let xNdisc = 0;
        let xNppn = 0;

        if (dataTb.length > 0) {
            dataTb.map((d, index) => {
                xSubTotal = xSubTotal + d.total;
                xNdisc = (disc / 100) * xSubTotal;
                xNppn = (ppn / 100) * (xSubTotal - xNdisc);
                setSubTotal(xSubTotal);
                setNdisc(Math.round(xNdisc));
                setNppn(Math.round(xNppn));
                setTotal(Math.round(xSubTotal - xNdisc + xNppn));
            });
        } else {
            setSubTotal(0);
            setNdisc(0);
            setDisc(0);
            setNppn(0);
            setPpn(0);
            setTotal(0);
        }

        xForceRender();
    };

    const storeData = async () => {
        const header = {
            notar: notaBeli,
            tgl: tgl,
            lok: lok,
            kode: kodeSupp,
            ket: ket,
            nilai: subTotal,
            disc: disc,
            ndisc: ndisc,
            pph: ppn,
            npph: nppn,
            netto: total,
        };
        const data = {
            header: header,
            body: dataTb,
        };
        await axios
            .post(route("transaksi.penjualan.returPenjualanNota.store"), data)
            .then((res) => {
                Swal.fire("Sukses", "Retur Pembelian Berhasil dibuat", "success");
                router.get(route("transaksi.penjualan.returPenjualanNota"));
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
            <MasterAdmin title={"Tambah Retur Penjualan"}>
                <div className="card bg-base-100 mb-2">
                    <div className="card-body">
                        <div className="grid grid-cols-3 gap-2">
                            <div className="form-group">
                                <label
                                    htmlFor=""
                                    className="label label-text text-sm -mb-2.5"
                                >
                                    Nomor Faktur
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered input-sm text-sm w-full"
                                    value={"BARU"}
                                    // onChange={(e) => setNota(e.target.value)}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor=""
                                    className="label label-text text-sm -mb-2.5"
                                >
                                    Gudang
                                </label>
                                <div className="flex flex-row gap-1">
                                    <input
                                        type="text"
                                        className="input input-bordered input-sm text-sm w-full"
                                        value={namaGudang}
                                        readOnly
                                    />
                                    <button
                                        className="btn btn-warning btn-sm btn-square"
                                        onClick={() => {
                                            window.my_modal_1_gudang.showModal();
                                            getGudang();
                                        }}
                                    >
                                        <AiOutlineSearch />
                                    </button>
                                </div>
                            </div>
                            {/* <div className="form-group">
                                <label
                                    htmlFor=""
                                    className="label label-text text-sm -mb-2.5"
                                >
                                    Ret. Faktur
                                </label>
                                <div className="flex flex-row gap-1">
                                    <input
                                        type="text"
                                        className="input input-bordered input-sm text-sm w-full"
                                        value={notaBeli}
                                        onChange={(e) => {
                                            setNotaBeli(e.target.value);
                                        }}
                                    />
                                    <button
                                        className="btn btn-warning btn-sm btn-square"
                                        onClick={() => {
                                            window.my_modal_1_po.showModal();
                                            getPenjualan("");
                                        }}
                                    >
                                        <AiOutlineSearch />
                                    </button>
                                </div>
                            </div> */}
                            <div className="form-group">
                                <label
                                    htmlFor=""
                                    className="label label-text text-sm -mb-2.5"
                                >
                                    Customer
                                </label>
                                <div className="flex flex-row gap-1">
                                    <input
                                        type="text"
                                        className="input input-bordered input-sm text-sm w-full"
                                        value={namaSupp}
                                        readOnly
                                    />
                                    <button
                                        className="btn btn-warning btn-sm btn-square"
                                        onClick={() => {
                                            window.my_modal_1_supplier.showModal();
                                            getCust();
                                        }}
                                    >
                                        <AiOutlineSearch />
                                    </button>
                                </div>
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor=""
                                    className="label label-text text-sm -mb-2.5"
                                >
                                    Tanggal
                                </label>
                                <input
                                    type="date"
                                    className="input input-bordered input-sm text-sm w-full"
                                    value={tgl}
                                    onChange={(e) => {
                                        settgl(e.target.value);
                                    }}
                                    max={tanggal}
                                />
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor=""
                                    className="label label-text text-sm -mb-2.5"
                                >
                                    Keterangan
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered input-sm text-sm w-full"
                                    value={ket}
                                    onChange={(e) => setKet(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row items-center">
                            <button
                                className="btn btn-primary btn-sm text-[8pt] text-gray-100"
                                onClick={storeData}
                            >
                                SIMPAN
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="table table-sm">
                                <thead className="bg-sky-800 text-sm text-gray-200">
                                    <tr>
                                        <th>Kode Stock</th>
                                        <th>Nama Barang</th>
                                        <th>Qty</th>
                                        <th>Satuan</th>
                                        <th>@Harga</th>
                                        <th>Disc(%)</th>
                                        <th>Total</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataTb.map((d, index) => (
                                        <tr>
                                            <td className="text-sm">
                                                {d.bara}
                                            </td>
                                            <td className="text-sm">
                                                {d.nama}
                                            </td>
                                            <td className="text-sm">
                                                <input
                                                    type="text"
                                                    className="input input-bordered input-sm text-sm w-14"
                                                    value={d.qty}
                                                    onChange={(e) => {
                                                        dataTb[index].qty =
                                                            e.target.value;
                                                        dataTb[index].zqty =
                                                            e.target.value * dataTb[index].xzqty;
                                                        setDataTb(dataTb);
                                                        xForceRender();
                                                        hitungTotalDataTb(
                                                            index
                                                        );
                                                    }}
                                                    onBlur={() =>
                                                        hitungTotalDataTb(index)
                                                    }
                                                />
                                            </td>
                                            <td className="text-sm">
                                                {d.satuan}
                                            </td>
                                            <td className="text-sm">
                                                <input
                                                    type="text"
                                                    className="input input-bordered input-sm text-sm w-24"
                                                    value={d.hjual}
                                                    onChange={(e) => {
                                                        dataTb[index].hjual =
                                                            e.target.value;
                                                        setDataTb(dataTb);
                                                        xForceRender();
                                                        hitungTotalDataTb(
                                                            index
                                                        );
                                                    }}
                                                    onBlur={() =>
                                                        hitungTotalDataTb(index)
                                                    }
                                                />
                                            </td>
                                            <td className="text-sm">
                                                <input
                                                    type="text"
                                                    className="input input-bordered input-sm text-sm w-14"
                                                    value={d.disc}
                                                    onChange={(e) => {
                                                        dataTb[index].disc =
                                                            e.target.value;
                                                        setDataTb(dataTb);
                                                        xForceRender();
                                                        hitungTotalDataTb(
                                                            index
                                                        );
                                                    }}
                                                    onBlur={() =>
                                                        hitungTotalDataTb(index)
                                                    }
                                                />
                                            </td>
                                            <td className="text-sm">
                                                {d.total.toLocaleString("id")}
                                            </td>
                                            <td className="text-sm">
                                                <button
                                                    className="btn btn-error text-gray-100 btn-sm bg-rose-700"
                                                    onClick={() =>
                                                        deleteItem(index)
                                                    }
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
                                                    className="input input-bordered input-sm text-sm"
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
                                                    className="btn btn-warning btn-sm btn-square"
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
                                    <tr>
                                        <td colSpan={6} className="text-right">
                                            Sub Total:
                                        </td>
                                        <td colSpan={2}>
                                            Rp. {subTotal.toLocaleString("id")}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={6} className="text-right">
                                            Disc:{" "}
                                            <input
                                                type="text"
                                                className="w-12 input input-bordered input-sm text-sm text-center"
                                                value={disc}
                                                onChange={(e) => {
                                                    setDisc(e.target.value);
                                                }}
                                                onBlur={hitungTotalFooter}
                                            />
                                        </td>
                                        <td colSpan={2}>
                                            Rp. {ndisc.toLocaleString("id")}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={6} className="text-right">
                                            PPN:{" "}
                                            <input
                                                type="text"
                                                className="w-12 input input-bordered input-sm text-sm text-center"
                                                value={ppn}
                                                onChange={(e) => {
                                                    setPpn(e.target.value);
                                                }}
                                                onBlur={hitungTotalFooter}
                                            />
                                        </td>
                                        <td colSpan={2}>
                                            Rp. {nppn.toLocaleString("id")}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={6} className="text-right">
                                            Total:
                                        </td>
                                        <td colSpan={2}>
                                            Rp. {total.toLocaleString("id")}
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
                                        <th>Satuan</th>
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
                                            <td>{d.satuan}</td>
                                            <td>
                                                <button
                                                    className="btn btn-accent bg-green-700 btn-sm text-gray-100 text-sm"
                                                    onClick={() => {
                                                        addDataTb(d);
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

                <dialog id="my_modal_1_supplier" className="modal">
                    <form
                        method="dialog"
                        className="modal-box"
                        id="journal-scroll"
                    >
                        <h3 className="font-bold text-sm">Customer</h3>
                        <div className="py-4">
                            <div className="my-2 items-center flex flex-row gap-2">
                                <input
                                    type="text"
                                    className="input input-bordered input-sm text-sm w-full"
                                    value={kodeSuppSearch}
                                    onChange={(e) => {
                                        setKodeSuppSearch(e.target.value);
                                        if (e.target.value.length >= 3) {
                                            getCustSearch(e.target.value);
                                        }
                                    }}
                                />
                            </div>
                            <table className="table table-sm">
                                <thead className="bg-sky-800 text-gray-100 text-sm">
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
                                                    className="btn btn-accent bg-green-700 btn-sm text-gray-100 text-sm"
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

                <dialog id="my_modal_1_po" className="modal">
                    <form
                        method="dialog"
                        className="modal-box"
                        id="journal-scroll"
                    >
                        <h3 className="font-bold text-sm">Nota Penjualan</h3>
                        <div className="py-4">
                            <div className="my-2 items-center flex flex-row gap-2">
                                <input
                                    type="text"
                                    className="input input-bordered input-sm text-sm w-full"
                                    value={notaBeliSearch}
                                    onChange={(e) => {
                                        setNotaBelisearch(e.target.value);
                                        if (e.target.value.length >= 3) {
                                            getPenjualan(e.target.value);
                                        }
                                    }}
                                />
                            </div>
                            <table className="table table-sm">
                                <thead className="bg-sky-800 text-gray-100 text-sm">
                                    <tr>
                                        <th>#</th>
                                        <th>Nota</th>
                                        <th>Tgl</th>
                                        <th>Supplier</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataPo?.map((d, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{d.nota}</td>
                                            <td>{d.tgl}</td>
                                            <td>{d.cust.nama}</td>
                                            <td>
                                                <button
                                                    className="btn btn-accent bg-green-700 btn-sm text-gray-100 text-sm"
                                                    onClick={() => {
                                                        setNotaBeli(d.nota);
                                                        addDataTbFromPo(d.tpo);
                                                        setKodeSupp(d.kode);
                                                        setNamaSupp(
                                                            d.cust.nama
                                                        );
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

                <dialog id="my_modal_1_gudang" className="modal">
                    <form
                        method="dialog"
                        className="modal-box"
                        id="journal-scroll"
                    >
                        <h3 className="font-bold text-sm">Gudang</h3>
                        <div className="py-4">
                            <table className="table table-sm">
                                <thead className="bg-sky-800 text-gray-100 text-sm">
                                    <tr>
                                        <th>#</th>
                                        <th>Lok</th>
                                        <th>Gudang</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataGudang?.map((d, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{d.lok}</td>
                                            <td>{d.ket}</td>
                                            <td>
                                                <button
                                                    className="btn btn-accent bg-green-700 btn-sm text-gray-100 text-sm"
                                                    onClick={() => {
                                                        setLok(d.lok);
                                                        setNamaGudang(d.ket);
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
