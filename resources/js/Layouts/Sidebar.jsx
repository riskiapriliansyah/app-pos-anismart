import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BsDatabase } from "react-icons/bs";
import { TbWorldWww } from "react-icons/tb";

export default function Sidebar(props) {
    const role = props.auth.user.role;

    const AdminBar = () => {
        const [openSubMenuWebsite, setOpenSubMenuWebsite] = useState(true);
        const [openSubMenuTransaksi, setOpenSubMenuTransaksi] = useState(true);
        const [openSubMenuPembelian, setOpenSubMenuPembelian] = useState(true);
        const [openSubMenuLainLain, setOpenSubMenuLainLain] = useState(true);
        const [openSubMenuPelunasanHutang, setOpenSubMenuPelunasanHutang] =
            useState(true);
        const [openSubMenuPenjualan, setOpenSubMenuPenjualan] = useState(true);
        const [openSubMenuPembayaranPiutang, setOpenSubMenuPembayaranPiutang] =
            useState(true);
        const [openSubMenuPenyesuaianStock, setOpenSubMenuPenyesuaianStock] =
            useState(true);
        return (
            <ul
                className="space-y-2 pt-7 h-92 w-full hidden lg:block overflow-x-auto"
                id="journal-scroll"
            >
                <li>
                    <Link
                        href="/admin/dashboard"
                        className="flex items-center p-2 px-4 text-md text-gray-600 hover:bg-gray-700 hover:text-gray-200"
                    >
                        <AiOutlineHome size={20} />
                        <span className="flex-1 ml-3 whitespace-nowrap">
                            Dashboard
                        </span>
                    </Link>
                </li>
                <li>
                    <button
                        type="button"
                        className="flex items-center p-2 px-4 w-full text-md text-gray-600 group hover:bg-gray-700 hover:text-gray-200"
                        aria-controls="dropdown-example"
                        data-collapse-toggle="dropdown-example"
                        onClick={() =>
                            setOpenSubMenuWebsite(!openSubMenuWebsite)
                        }
                    >
                        <BsDatabase size={20} />
                        <span className="flex-1 ml-3 text-left ">File</span>
                        <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                    <ul
                        id="dropdown-example"
                        className={`${openSubMenuWebsite ? "hidden" : ""
                            } transition duration-200 ease-in-out space-y-2 bg-base-100`}
                    >
                        <li>
                            <Link
                                href="/dep"
                                className="flex items-center p-2 pl-14 w-full text-sm text-gray-600 text-gray-300 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                            >
                                Departemen
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/sdep"
                                className="flex items-center p-2 pl-14 w-full text-sm text-gray-600 text-gray-300 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                            >
                                Sub Departemen
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/area"
                                className="flex items-center p-2 pl-14 w-full text-sm text-gray-600 text-gray-300 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                            >
                                Area
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/gudang"
                                className="flex items-center p-2 pl-14 w-full text-sm text-gray-600 text-gray-300 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                            >
                                Gudang
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/satuan"
                                className="flex items-center p-2 pl-14 w-full text-sm text-gray-600 text-gray-300 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                            >
                                Satuan
                            </Link>
                        </li>
                        <div className="divider"></div>
                        <li>
                            <Link
                                href="/master-stock"
                                className="flex items-center p-2 pl-14 w-full text-sm text-gray-600 text-gray-300 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                            >
                                Master Stock
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/supplier"
                                className="flex items-center p-2 pl-14 w-full text-sm text-gray-600 text-gray-300 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                            >
                                Supplier
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/langganan"
                                className="flex items-center p-2 pl-14 w-full text-sm text-gray-600 text-gray-300 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                            >
                                Langganan
                            </Link>
                        </li>
                        <div className="divider"></div>
                        <li>
                            <Link
                                href="/formula-paket"
                                className="flex items-center p-2 pl-14 w-full text-sm text-gray-600 text-gray-300 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                            >
                                Formula Paket
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/best-buy"
                                className="flex items-center p-2 pl-14 w-full text-sm text-gray-600 text-gray-300 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                            >
                                Best Buy
                            </Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <button
                        type="button"
                        className="flex items-center p-2 px-4 w-full text-md text-gray-600 transition duration-75 group hover:bg-gray-700 hover:text-gray-200"
                        aria-controls="dropdown-example"
                        data-collapse-toggle="dropdown-example"
                        onClick={() =>
                            setOpenSubMenuTransaksi(!openSubMenuTransaksi)
                        }
                    >
                        <BsDatabase size={20} />
                        <span className="flex-1 ml-3 text-left ">
                            Transaksi
                        </span>
                        <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                    <ul
                        id="dropdown-example"
                        className={`${openSubMenuTransaksi ? "hidden" : ""
                            } duration-300 space-y-2 bg-base-100`}
                    >
                        <li>
                            <button
                                type="button"
                                className="flex items-center p-2 pl-11  w-full text-sm text-gray-600 text-gray-300 transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                aria-controls="dropdown-example"
                                data-collapse-toggle="dropdown-example"
                                onClick={() =>
                                    setOpenSubMenuPembelian(
                                        !openSubMenuPembelian
                                    )
                                }
                            >
                                <span className="flex-1 ml-3 text-left ">
                                    Pembelian
                                </span>
                                <svg
                                    className="w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                            <ul
                                id="dropdown-example"
                                className={`${openSubMenuPembelian ? "hidden" : ""
                                    } duration-300 py-2 space-y-2`}
                            >
                                {/* <li>
                                    <Link
                                        href="/transaksi/pembelian/pr"
                                        className="flex items-center p-2 pl-16 w-full text-sm text-gray-700 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        Purchase Request (PR)
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/transaksi/pembelian/po"
                                        className="flex items-center p-2 pl-16 w-full text-sm text-gray-700 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        Purchase Order (PO)
                                    </Link>
                                </li> */}
                                <li>
                                    <Link
                                        href="/transaksi/pembelian/beli"
                                        className="flex items-center p-2 pl-16 w-full text-sm text-gray-700 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        Pembelian
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/transaksi/pembelian/retur"
                                        className="flex items-center p-2 pl-16 w-full text-sm text-gray-700 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        Retur Pembelian
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex items-center p-2 pl-11  w-full text-sm text-gray-600 text-gray-300 transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                aria-controls="dropdown-example"
                                data-collapse-toggle="dropdown-example"
                                onClick={() =>
                                    setOpenSubMenuLainLain(!openSubMenuLainLain)
                                }
                            >
                                <span className="flex-1 ml-3 text-left ">
                                    Lain-Lain
                                </span>
                                <svg
                                    className="w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                            <ul
                                id="dropdown-example"
                                className={`${openSubMenuLainLain ? "hidden" : ""
                                    } duration-300 py-2 space-y-2`}
                            >
                                <li>
                                    <Link
                                        href="/admin/media/gallery"
                                        className="flex items-center p-2 pl-16 w-full text-sm text-gray-700 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        Kredit Nota
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/admin/media/document"
                                        className="flex items-center p-2 pl-16 w-full text-sm text-gray-700 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        Debet Nota
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex items-center p-2 pl-11  w-full text-sm text-gray-600 text-gray-300 transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                aria-controls="dropdown-example"
                                data-collapse-toggle="dropdown-example"
                                onClick={() =>
                                    setOpenSubMenuPelunasanHutang(
                                        !openSubMenuPelunasanHutang
                                    )
                                }
                            >
                                <span className="flex-1 ml-3 text-left ">
                                    Pelunasan Hutang
                                </span>
                                <svg
                                    className="w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                            <ul
                                id="dropdown-example"
                                className={`${openSubMenuPelunasanHutang ? "hidden" : ""
                                    } duration-300 py-2 space-y-2`}
                            >
                                <li>
                                    <Link
                                        href="/admin/media/gallery"
                                        className="flex items-center p-2 pl-16 w-full text-sm text-gray-700 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        Tanpa Faktur
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/admin/media/document"
                                        className="flex items-center p-2 pl-16 w-full text-sm text-gray-700 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        Banyak Faktur
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/admin/media/document"
                                        className="flex items-center p-2 pl-16 w-full text-sm text-gray-700 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        Seluruh Faktur
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link
                                href="/dep"
                                className="flex items-center p-2 pl-14 w-full text-sm text-gray-600 text-gray-300 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                            >
                                Giro Keluar
                            </Link>
                        </li>
                        <div className="divider"></div>
                        <li>
                            <button
                                type="button"
                                className="flex items-center p-2 pl-11  w-full text-sm text-gray-600 text-gray-300 transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                aria-controls="dropdown-example"
                                data-collapse-toggle="dropdown-example"
                                onClick={() =>
                                    setOpenSubMenuPenjualan(
                                        !openSubMenuPenjualan
                                    )
                                }
                            >
                                <span className="flex-1 ml-3 text-left ">
                                    Penjualan
                                </span>
                                <svg
                                    className="w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                            <ul
                                id="dropdown-example"
                                className={`${openSubMenuPenjualan ? "hidden" : ""
                                    } duration-300 py-2 space-y-2`}
                            >
                                <li>
                                    <Link
                                        href="/transaksi/penjualan/penjualan-nota"
                                        className="flex items-center p-2 pl-16 w-full text-sm text-gray-700 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        Penjualan Nota
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route(
                                            "transaksi.penjualan.returPenjualanNota"
                                        )}
                                        className="flex items-center p-2 pl-16 w-full text-sm text-gray-700 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        Retur Penjualan
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex items-center p-2 pl-11  w-full text-sm text-gray-600 text-gray-300 transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                aria-controls="dropdown-example"
                                data-collapse-toggle="dropdown-example"
                                onClick={() =>
                                    setOpenSubMenuPembayaranPiutang(
                                        !openSubMenuPembayaranPiutang
                                    )
                                }
                            >
                                <span className="flex-1 ml-3 text-left ">
                                    Pembayaran Piutang
                                </span>
                                <svg
                                    className="w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                            <ul
                                id="dropdown-example"
                                className={`${openSubMenuPembayaranPiutang ? "hidden" : ""
                                    } duration-300 py-2 space-y-2`}
                            >
                                <li>
                                    <Link
                                        href="/admin/media/gallery"
                                        className="flex items-center p-2 pl-16 w-full text-sm text-gray-700 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        Tanpa Faktur
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/admin/media/document"
                                        className="flex items-center p-2 pl-16 w-full text-sm text-gray-700 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        Banyak Faktur
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/admin/media/document"
                                        className="flex items-center p-2 pl-16 w-full text-sm text-gray-700 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        Seluruh Faktur
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link
                                href="/sdep"
                                className="flex items-center p-2 pl-14 w-full text-sm text-gray-600 text-gray-300 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                            >
                                Giro Masuk
                            </Link>
                        </li>
                        <div className="divider"></div>
                        <li>
                            <Link
                                href={route('transaksi.penjualan.transferBarang')}
                                className="flex items-center p-2 pl-14 w-full text-sm text-gray-600 text-gray-300 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                            >
                                Transfer Barang
                            </Link>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex items-center p-2 pl-11  w-full text-sm text-gray-600 text-gray-300 transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                aria-controls="dropdown-example"
                                data-collapse-toggle="dropdown-example"
                                onClick={() =>
                                    setOpenSubMenuPenyesuaianStock(
                                        !openSubMenuPenyesuaianStock
                                    )
                                }
                            >
                                <span className="flex-1 ml-3 text-left ">
                                    Penyesuaian Stock
                                </span>
                                <svg
                                    className="w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                            <ul
                                id="dropdown-example"
                                className={`${openSubMenuPenyesuaianStock ? "hidden" : ""
                                    } duration-300 py-2 space-y-2`}
                            >
                                <li>
                                    <Link
                                        href="/admin/media/gallery"
                                        className="flex items-center p-2 pl-16 w-full text-sm text-gray-700 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        Sampling Opname
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/admin/media/document"
                                        className="flex items-center p-2 pl-16 w-full text-sm text-gray-700 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        Total Opname
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link
                                href="/gudang"
                                className="flex items-center p-2 pl-14 w-full text-sm text-gray-600 text-gray-300 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                            >
                                Paket
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        );
    };

    const SuperAdminBar = () => {
        const [openSubMenuWebsite, setOpenSubMenuWebsite] = useState(true);
        const [openSubMenuTransaksi, setOpenSubMenuTransaksi] = useState(true);
        const [openSubMenuPembelian, setOpenSubMenuPembelian] = useState(true);
        const [openSubMenuLainLain, setOpenSubMenuLainLain] = useState(true);
        const [openSubMenuPelunasanHutang, setOpenSubMenuPelunasanHutang] =
            useState(true);
        const [openSubMenuPenjualan, setOpenSubMenuPenjualan] = useState(true);
        const [openSubMenuPembayaranPiutang, setOpenSubMenuPembayaranPiutang] =
            useState(true);
        const [openSubMenuPenyesuaianStock, setOpenSubMenuPenyesuaianStock] =
            useState(true);
        return (
            <ul
                className="space-y-2 pt-7 h-92 w-full hidden lg:block overflow-x-auto"
                id="journal-scroll"
            >
                <li>
                    <Link
                        href="/admin/dashboard"
                        className="flex items-center p-2 px-4 text-md text-gray-600 hover:bg-gray-700 hover:text-gray-200"
                    >
                        <AiOutlineHome size={20} />
                        <span className="flex-1 ml-3 whitespace-nowrap">
                            Dashboard
                        </span>
                    </Link>
                </li>
                <li>
                    <button
                        type="button"
                        className="flex items-center p-2 px-4 w-full text-md text-gray-600 transition duration-75 group hover:bg-gray-700 hover:text-gray-200"
                        aria-controls="dropdown-example"
                        data-collapse-toggle="dropdown-example"
                        onClick={() =>
                            setOpenSubMenuWebsite(!openSubMenuWebsite)
                        }
                    >
                        <BsDatabase size={20} />
                        <span className="flex-1 ml-3 text-left ">File</span>
                        <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                    <ul
                        id="dropdown-example"
                        className={`${openSubMenuWebsite ? "hidden" : ""
                            } duration-300 space-y-2 bg-base-100`}
                    >
                        <li>
                            <Link
                                href="/dep"
                                className="flex items-center p-2 pl-14 w-full text-sm text-gray-600 text-gray-300 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                            >
                                Departemen
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/sdep"
                                className="flex items-center p-2 pl-14 w-full text-sm text-gray-600 text-gray-300 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                            >
                                Sub Departemen
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/area"
                                className="flex items-center p-2 pl-14 w-full text-sm text-gray-600 text-gray-300 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                            >
                                Area
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/gudang"
                                className="flex items-center p-2 pl-14 w-full text-sm text-gray-600 text-gray-300 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                            >
                                Gudang
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/satuan"
                                className="flex items-center p-2 pl-14 w-full text-sm text-gray-600 text-gray-300 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                            >
                                Satuan
                            </Link>
                        </li>
                        <div className="divider"></div>
                        <li>
                            <Link
                                href="/master-stock"
                                className="flex items-center p-2 pl-14 w-full text-sm text-gray-600 text-gray-300 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                            >
                                Master Stock
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/supplier"
                                className="flex items-center p-2 pl-14 w-full text-sm text-gray-600 text-gray-300 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                            >
                                Supplier
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/langganan"
                                className="flex items-center p-2 pl-14 w-full text-sm text-gray-600 text-gray-300 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                            >
                                Langganan
                            </Link>
                        </li>
                        <div className="divider"></div>
                        <li>
                            <Link
                                href="/formula-paket"
                                className="flex items-center p-2 pl-14 w-full text-sm text-gray-600 text-gray-300 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                            >
                                Formula Paket
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/best-buy"
                                className="flex items-center p-2 pl-14 w-full text-sm text-gray-600 text-gray-300 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                            >
                                Best Buy
                            </Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <button
                        type="button"
                        className="flex items-center p-2 px-4 w-full text-md text-gray-600 transition duration-75 group hover:bg-gray-700 hover:text-gray-200"
                        aria-controls="dropdown-example"
                        data-collapse-toggle="dropdown-example"
                        onClick={() =>
                            setOpenSubMenuTransaksi(!openSubMenuTransaksi)
                        }
                    >
                        <BsDatabase size={20} />
                        <span className="flex-1 ml-3 text-left ">
                            Transaksi
                        </span>
                        <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                    <ul
                        id="dropdown-example"
                        className={`${openSubMenuTransaksi ? "hidden" : ""
                            } duration-300 space-y-2 bg-base-100`}
                    >
                        <li>
                            <button
                                type="button"
                                className="flex items-center p-2 pl-11  w-full text-sm text-gray-600 text-gray-300 transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                aria-controls="dropdown-example"
                                data-collapse-toggle="dropdown-example"
                                onClick={() =>
                                    setOpenSubMenuPembelian(
                                        !openSubMenuPembelian
                                    )
                                }
                            >
                                <span className="flex-1 ml-3 text-left ">
                                    Pembelian
                                </span>
                                <svg
                                    className="w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                            <ul
                                id="dropdown-example"
                                className={`${openSubMenuPembelian ? "hidden" : ""
                                    } duration-300 py-2 space-y-2`}
                            >
                                {/* <li>
                                    <Link
                                        href="/transaksi/pembelian/pr/approve"
                                        className="flex items-center p-2 pl-16 w-full text-sm text-gray-700 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        Approve Purchase Request (PR)
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/transaksi/pembelian/pr"
                                        className="flex items-center p-2 pl-16 w-full text-sm text-gray-700 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        Purchase Request (PR)
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/transaksi/pembelian/po"
                                        className="flex items-center p-2 pl-16 w-full text-sm text-gray-700 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        Purchase Order (PO)
                                    </Link>
                                </li> */}
                                <li>
                                    <Link
                                        href="/transaksi/pembelian/beli"
                                        className="flex items-center p-2 pl-16 w-full text-sm text-gray-700 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        Pembelian
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/transaksi/pembelian/retur"
                                        className="flex items-center p-2 pl-16 w-full text-sm text-gray-700 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        Retur Pembelian
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex items-center p-2 pl-11  w-full text-sm text-gray-600 text-gray-300 transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                aria-controls="dropdown-example"
                                data-collapse-toggle="dropdown-example"
                                onClick={() =>
                                    setOpenSubMenuLainLain(!openSubMenuLainLain)
                                }
                            >
                                <span className="flex-1 ml-3 text-left ">
                                    Lain-Lain
                                </span>
                                <svg
                                    className="w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                            <ul
                                id="dropdown-example"
                                className={`${openSubMenuLainLain ? "hidden" : ""
                                    } duration-300 py-2 space-y-2`}
                            >
                                <li>
                                    <Link
                                        href="/admin/media/gallery"
                                        className="flex items-center p-2 pl-16 w-full text-sm text-gray-700 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        Kredit Nota
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/admin/media/document"
                                        className="flex items-center p-2 pl-16 w-full text-sm text-gray-700 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        Debet Nota
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex items-center p-2 pl-11  w-full text-sm text-gray-600 text-gray-300 transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                aria-controls="dropdown-example"
                                data-collapse-toggle="dropdown-example"
                                onClick={() =>
                                    setOpenSubMenuPelunasanHutang(
                                        !openSubMenuPelunasanHutang
                                    )
                                }
                            >
                                <span className="flex-1 ml-3 text-left ">
                                    Pelunasan Hutang
                                </span>
                                <svg
                                    className="w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                            <ul
                                id="dropdown-example"
                                className={`${openSubMenuPelunasanHutang ? "hidden" : ""
                                    } duration-300 py-2 space-y-2`}
                            >
                                <li>
                                    <Link
                                        href="/admin/media/gallery"
                                        className="flex items-center p-2 pl-16 w-full text-sm text-gray-700 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        Tanpa Faktur
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/admin/media/document"
                                        className="flex items-center p-2 pl-16 w-full text-sm text-gray-700 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        Banyak Faktur
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/admin/media/document"
                                        className="flex items-center p-2 pl-16 w-full text-sm text-gray-700 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        Seluruh Faktur
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link
                                href="/dep"
                                className="flex items-center p-2 pl-14 w-full text-sm text-gray-600 text-gray-300 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                            >
                                Giro Keluar
                            </Link>
                        </li>
                        <div className="divider"></div>
                        <li>
                            <button
                                type="button"
                                className="flex items-center p-2 pl-11  w-full text-sm text-gray-600 text-gray-300 transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                aria-controls="dropdown-example"
                                data-collapse-toggle="dropdown-example"
                                onClick={() =>
                                    setOpenSubMenuPenjualan(
                                        !openSubMenuPenjualan
                                    )
                                }
                            >
                                <span className="flex-1 ml-3 text-left ">
                                    Penjualan
                                </span>
                                <svg
                                    className="w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                            <ul
                                id="dropdown-example"
                                className={`${openSubMenuPenjualan ? "hidden" : ""
                                    } duration-300 py-2 space-y-2`}
                            >
                                <li>
                                    <Link
                                        href="/transaksi/penjualan/penjualan-nota"
                                        className="flex items-center p-2 pl-16 w-full text-sm text-gray-700 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        Penjualan Nota
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route(
                                            "transaksi.penjualan.returPenjualanNota"
                                        )}
                                        className="flex items-center p-2 pl-16 w-full text-sm text-gray-700 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        Retur Penjualan
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex items-center p-2 pl-11  w-full text-sm text-gray-600 text-gray-300 transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                aria-controls="dropdown-example"
                                data-collapse-toggle="dropdown-example"
                                onClick={() =>
                                    setOpenSubMenuPembayaranPiutang(
                                        !openSubMenuPembayaranPiutang
                                    )
                                }
                            >
                                <span className="flex-1 ml-3 text-left ">
                                    Pembayaran Piutang
                                </span>
                                <svg
                                    className="w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                            <ul
                                id="dropdown-example"
                                className={`${openSubMenuPembayaranPiutang ? "hidden" : ""
                                    } duration-300 py-2 space-y-2`}
                            >
                                <li>
                                    <Link
                                        href="/admin/media/gallery"
                                        className="flex items-center p-2 pl-16 w-full text-sm text-gray-700 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        Tanpa Faktur
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/admin/media/document"
                                        className="flex items-center p-2 pl-16 w-full text-sm text-gray-700 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        Banyak Faktur
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/admin/media/document"
                                        className="flex items-center p-2 pl-16 w-full text-sm text-gray-700 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        Seluruh Faktur
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link
                                href="/sdep"
                                className="flex items-center p-2 pl-14 w-full text-sm text-gray-600 text-gray-300 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                            >
                                Giro Masuk
                            </Link>
                        </li>
                        <div className="divider"></div>
                        <li>
                            <Link
                                href={route('transaksi.penjualan.transferBarang')}
                                className="flex items-center p-2 pl-14 w-full text-sm text-gray-600 text-gray-300 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                            >
                                Transfer Barang
                            </Link>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex items-center p-2 pl-11  w-full text-sm text-gray-600 text-gray-300 transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                aria-controls="dropdown-example"
                                data-collapse-toggle="dropdown-example"
                                onClick={() =>
                                    setOpenSubMenuPenyesuaianStock(
                                        !openSubMenuPenyesuaianStock
                                    )
                                }
                            >
                                <span className="flex-1 ml-3 text-left ">
                                    Penyesuaian Stock
                                </span>
                                <svg
                                    className="w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                            <ul
                                id="dropdown-example"
                                className={`${openSubMenuPenyesuaianStock ? "hidden" : ""
                                    } duration-300 py-2 space-y-2`}
                            >
                                <li>
                                    <Link
                                        href="/admin/media/gallery"
                                        className="flex items-center p-2 pl-16 w-full text-sm text-gray-700 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        Sampling Opname
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/admin/media/document"
                                        className="flex items-center p-2 pl-16 w-full text-sm text-gray-700 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        Total Opname
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link
                                href="/gudang"
                                className="flex items-center p-2 pl-14 w-full text-sm text-gray-600 text-gray-300 rounded-lg transition duration-75 group hover:bg-gray-100 hover:text-gray-800"
                            >
                                Paket
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        );
    };

    return (
        <>
            <div className="h-screen bg-gradient-to-r from-base-200 via-base-100 to-base-200 w-0 lg:w-64 py-7 fixed left-0">
                <div className="flex flex-col items-center h-3/4">
                    <img src="/assets/logo-apollo.png" alt="" width={150} />
                    {role === "admin" ? <AdminBar /> : ""}
                    {role === "super_admin" ? <SuperAdminBar /> : ""}
                </div>
            </div>
        </>
    );
}
