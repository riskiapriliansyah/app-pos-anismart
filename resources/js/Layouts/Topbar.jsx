import { Link } from "@inertiajs/react";
import { AiOutlineFieldTime, AiOutlineFileExcel, AiOutlineHome } from "react-icons/ai";
import { BiAnalyse, BiNews } from "react-icons/bi";
import { TbMap2, TbUsers } from "react-icons/tb";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImProfile } from "react-icons/im";
import { BsFiletypePdf } from "react-icons/bs";

export default function Topbar({ title, auth }) {
    const role = auth.role;

    const AdminBar = () => {
        return (
            <>
                <li>
                    <Link
                        href="/admin/dashboard"
                        className="flex items-center p-2 px-4 text-sm text-gray-600  text-gray-300 hover:bg-gray-700 hover:text-gray-200"
                    >
                        <AiOutlineHome size={20} />
                        <span className="flex-1 ml-3 whitespace-nowrap">
                            Dashboard
                        </span>
                    </Link>
                </li>

                <li>
                    <Link
                        href="/admin/profile-caleg"
                        className={`flex items-center p-2 px-4 text-sm text-gray-600  text-gray-300 hover:bg-gray-700 hover:text-gray-200 }`}
                    >
                        <ImProfile size={20} />
                        <span className="flex-1 ml-3 whitespace-nowrap">
                            Profile Caleg
                        </span>
                    </Link>
                </li>

                <li>
                    <Link
                        href="/admin/wilayah"
                        className={`flex items-center p-2 px-4 text-sm text-gray-600  text-gray-300 hover:bg-gray-700 hover:text-gray-200 }`}
                    >
                        <TbMap2 size={20} />
                        <span className="flex-1 ml-3 whitespace-nowrap">
                            Data Wilayah & TPS
                        </span>
                    </Link>
                </li>

                <li>
                    <Link
                        href="/admin/kegiatan"
                        className={`flex items-center p-2 px-4 text-sm text-gray-600  text-gray-300 hover:bg-gray-700 hover:text-gray-200 }`}
                    >
                        <BiNews size={20} />
                        <span className="flex-1 ml-3 whitespace-nowrap">
                            Kegiatan
                        </span>
                    </Link>
                </li>

                <li>
                    <Link
                        href="/admin/relawan"
                        className="flex items-center p-2 px-4 text-sm text-gray-600  text-gray-300 hover:bg-gray-700 hover:text-gray-200"
                    >
                        <TbUsers size={20} />
                        <span className="flex-1 ml-3 whitespace-nowrap">
                            Relawan
                        </span>
                    </Link>
                </li>

                <li>
                    <Link
                        href="/admin/data-pendukung"
                        className="flex items-center p-2 px-4 text-sm text-gray-600  text-gray-300 hover:bg-gray-700 hover:text-gray-200"
                    >
                        <BiAnalyse size={20} />
                        <span className="flex-1 ml-3 whitespace-nowrap">
                            Data Pendukung
                        </span>
                    </Link>
                </li>

                <li>
                    <Link
                        href="/admin/quick-count"
                        className="flex items-center p-2 px-4 text-sm text-gray-600  text-gray-300 hover:bg-gray-700 hover:text-gray-200"
                    >
                        <AiOutlineFieldTime size={20} />
                        <span className="flex-1 ml-3 whitespace-nowrap">
                            Quick Count
                        </span>
                    </Link>
                </li>

                <li>
                    <Link
                        href="/admin/laporan/data-pendukung"
                        className="flex items-center p-2 px-4 text-sm text-gray-600  text-gray-300 hover:bg-gray-700 hover:text-gray-200"
                    >
                        <AiOutlineFileExcel size={20} />
                        <span className="flex-1 ml-3 whitespace-nowrap">
                            Laporan Data Pendukung
                        </span>
                    </Link>
                </li>

                <li>
                    <Link
                        href="/admin/laporan/data-quick-count"
                        className="flex items-center p-2 px-4 text-sm text-gray-600  text-gray-300 hover:bg-gray-700 hover:text-gray-200"
                    >
                        <AiOutlineFileExcel size={20} />
                        <span className="flex-1 ml-3 whitespace-nowrap">
                            Laporan Quick Count
                        </span>
                    </Link>
                </li>
                
                <li>
                    <Link
                        href="/admin/management-user"
                        className="flex items-center p-2 px-4 text-sm text-gray-600  text-gray-300 hover:bg-gray-700 hover:text-gray-200"
                    >
                        <TbUsers size={20} />
                        <span className="flex-1 ml-3 whitespace-nowrap">
                            Management User
                        </span>
                    </Link>
                </li>
                <li>
                    <a
                        href="https://cekdptonline.kpu.go.id/"
                        target="_blank"
                        className="flex items-center p-2 px-4 text-sm text-gray-600  text-gray-300 hover:bg-gray-700 hover:text-gray-200"
                    >
                        <TbUsers size={20} />
                        <span className="flex-1 ml-3 whitespace-nowrap">
                            Cek DPT Online
                        </span>
                    </a>
                </li>
                <li>
                    <a
                        href="/file/manual_book.pdf"
                        target="_blank"
                        className="flex items-center p-2 px-4 text-sm text-gray-600  text-gray-300 hover:bg-gray-700 hover:text-gray-200"
                    >
                        <BsFiletypePdf size={20} />
                        <span className="flex-1 ml-3 whitespace-nowrap">
                            Manual Book
                        </span>
                    </a>
                </li>
            </>
        );
    };

    const RelawanBar = () => {
        return (
            <>
                <li>
                    <Link
                        href="/relawan/dashboard"
                        className="flex items-center p-2 px-4 text-sm text-gray-600  text-gray-300 hover:bg-gray-700 hover:text-gray-200"
                    >
                        <AiOutlineHome size={20} />
                        <span className="flex-1 ml-3 whitespace-nowrap">
                            Dashboard
                        </span>
                    </Link>
                </li>

                <li>
                    <Link
                        href="/relawan/kegiatan"
                        className={`flex items-center p-2 px-4 text-sm text-gray-600  text-gray-300 hover:bg-gray-700 hover:text-gray-200 }`}
                    >
                        <BiNews size={20} />
                        <span className="flex-1 ml-3 whitespace-nowrap">
                            Kegiatan
                        </span>
                    </Link>
                </li>

                <li>
                    <Link
                        href="/relawan/data-pendukung"
                        className="flex items-center p-2 px-4 text-sm text-gray-600  text-gray-300 hover:bg-gray-700 hover:text-gray-200"
                    >
                        <BiAnalyse size={20} />
                        <span className="flex-1 ml-3 whitespace-nowrap">
                            Data Pendukung
                        </span>
                    </Link>
                </li>

                <li>
                    <Link
                        href="/relawan/quick-count"
                        className="flex items-center p-2 px-4 text-sm text-gray-600  text-gray-300 hover:bg-gray-700 hover:text-gray-200"
                    >
                        <AiOutlineFieldTime size={20} />
                        <span className="flex-1 ml-3 whitespace-nowrap">
                            Quick Count
                        </span>
                    </Link>
                </li>
                <li>
                    <a
                        href="https://cekdptonline.kpu.go.id/"
                        target="_blank"
                        className="flex items-center p-2 px-4 text-sm text-gray-600  text-gray-300 hover:bg-gray-700 hover:text-gray-200"
                    >
                        <TbUsers size={20} />
                        <span className="flex-1 ml-3 whitespace-nowrap">
                            Cek DPT Online
                        </span>
                    </a>
                </li>
            </>
        );
    };

    const VerifikatorBar = () => {
        return (
            <>
                <li>
                    <Link
                        href="/verifikator/dashboard"
                        className="flex items-center p-2 px-4 text-sm text-gray-600  text-gray-300 hover:bg-gray-700 hover:text-gray-200"
                    >
                        <AiOutlineHome size={20} />
                        <span className="flex-1 ml-3 whitespace-nowrap">
                            Dashboard
                        </span>
                    </Link>
                </li>

                <li>
                    <Link
                        href="/verifikator/data-pendukung"
                        className="flex items-center p-2 px-4 text-sm text-gray-600  text-gray-300 hover:bg-gray-700 hover:text-gray-200"
                    >
                        <BiAnalyse size={20} />
                        <span className="flex-1 ml-3 whitespace-nowrap">
                            Data Pendukung
                        </span>
                    </Link>
                </li>

                <li>
                    <a
                        href="https://cekdptonline.kpu.go.id/"
                        target="_blank"
                        className="flex items-center p-2 px-4 text-sm text-gray-600  text-gray-300 hover:bg-gray-700 hover:text-gray-200"
                    >
                        <TbUsers size={20} />
                        <span className="flex-1 ml-3 whitespace-nowrap">
                            Cek DPT Online
                        </span>
                    </a>
                </li>
            </>
        );
    };
    return (
        <>
            <div className="navbar bg-base-100 fixed top-0 right-0 w-auto left-0 lg:left-64 z-50">
                <div className="drawer">
                    <input
                        id="my-drawer"
                        type="checkbox"
                        className="drawer-toggle"
                    />
                    <div className="drawer-content">
                        <label
                            htmlFor="my-drawer"
                            className="btn btn-ghost drawer-button"
                        >
                            <GiHamburgerMenu />
                        </label>
                    </div>
                    <div className="drawer-side">
                        <label
                            htmlFor="my-drawer"
                            className="drawer-overlay"
                        ></label>
                        <img
                            src="assets/logo-2-pinter.png"
                            alt=""
                            width={150}
                        />
                        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                            {role === "admin" ? <AdminBar /> : ""}
                            {role === "relawan" ? <RelawanBar /> : ""}
                            {role === "verifikator" ? <VerifikatorBar /> : ""}
                        </ul>
                    </div>
                </div>
                <div className="flex-none">
                    <a className="btn btn-ghost normal-case text-xl">{title}</a>
                </div>
                <div className="flex-none gap-2">
                    <h1 className="lg:block hidden">Hi, {auth.name}</h1>
                    <div className="dropdown dropdown-end">
                        <label
                            tabIndex={0}
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10 rounded-full">
                                <img src="/assets/blank.png" />
                            </div>
                        </label>
                        <ul
                            tabIndex={0}
                            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <Link href="/change-password">
                                    Change Password
                                </Link>
                            </li>
                            <li>
                                <Link href="/logout">Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
