import MasterAdmin from "@/Layouts/MasterAdmin";
import { Link } from "@inertiajs/react";
import { MdOutlineWarehouse } from "react-icons/md";
import { CiInboxIn } from "react-icons/ci";
import { FaCartArrowDown, FaMoneyBillWave, FaSignOutAlt, FaUsers } from "react-icons/fa";
export default function DashboardPage(props) {
    return (
        <>
            <MasterAdmin title={"Dashboard"}>
                <div className="card bg-base-100 mb-2">
                    <div className="card-body">
                        <div className="grid grid-cols-3 gap-1">
                            <Link href="" className="btn btn-ghost bg-blue-900 text-gray-200 hover:text-gray-800">
                                <MdOutlineWarehouse size={20} />
                                <span>
                                    Master Stock
                                </span>
                            </Link>
                            <Link href="" className="btn btn-ghost bg-blue-900 text-gray-200 hover:text-gray-800">
                                <FaUsers size={20} />
                                <span>
                                    Supplier
                                </span>
                            </Link>
                            <Link href="" className="btn btn-ghost bg-blue-900 text-gray-200 hover:text-gray-800">
                                <FaUsers size={20} />
                                <span>
                                    Langganan
                                </span>
                            </Link>
                            <Link href="" className="btn btn-ghost bg-blue-900 text-gray-200 hover:text-gray-800">
                                <FaCartArrowDown size={20} />
                                <span>
                                    Pembelian
                                </span>
                            </Link>
                            <Link href="" className="btn btn-ghost bg-blue-900 text-gray-200 hover:text-gray-800">
                                <FaMoneyBillWave size={20} />
                                <span>
                                    Penjualan
                                </span>
                            </Link>
                            <Link href="" className="btn btn-ghost bg-blue-900 text-gray-200 hover:text-gray-800">
                                <FaSignOutAlt size={20} />
                                <span>
                                    Transfer Barang
                                </span>
                            </Link>
                            <Link href="" className="btn btn-ghost bg-blue-900 text-gray-200 hover:text-gray-800">
                                <FaSignOutAlt size={20} />
                                <span>
                                    Retur Pembelian
                                </span>
                            </Link>
                            <Link href="" className="btn btn-ghost bg-blue-900 text-gray-200 hover:text-gray-800">
                                <FaSignOutAlt size={20} />
                                <span>
                                    Retur Penjualan
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </MasterAdmin>
        </>
    );
}
