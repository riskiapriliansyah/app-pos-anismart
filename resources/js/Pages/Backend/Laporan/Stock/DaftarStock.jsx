import Loading from "@/Components/Loading";
import { LaporanDaftarStockToPrint } from "@/Components/Print/LaporanDaftarStock";
import MasterAdmin from "@/Layouts/MasterAdmin";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { AiFillPrinter } from "react-icons/ai";
import Select from "react-tailwindcss-select";
import ReactToPrint from "react-to-print";
import Swal from "sweetalert2";

export default function DaftarStockPage(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [kode, setKode] = useState("")
    const [deps, setDeps] = useState([])
    const [dep, setDep] = useState("")
    const [sdeps, setSdeps] = useState([])
    const [sdep, setSdep] = useState("")
    const [suppliers, setSuppliers] = useState([])
    const [dataTb, setDataTb] = useState([])
    const componentRef = useRef();
    useEffect(() => {
        const customHeadingsSupplier = props.suppliers.map((item) => ({
            value: item.kode,
            label: item.nama,
        }));
        setSuppliers(customHeadingsSupplier);

        const customHeadingsDep = props.deps.map((item) => ({
            value: item.kode,
            label: item.ket,
        }));
        setDeps(customHeadingsDep);
    }, [])

    const handleChangeKodeVal = (value) => {
        setKode(value);
    };

    const handleChangeDepVal = (value) => {
        setDep(value);
        getSdepByDep(value.value);
    };
    const handleChangeSDepVal = (value) => {
        setSdep(value);
    };

    const [forceRender, setForceRender] = useState(false);
    const xForceRender = () => {
        setForceRender(!forceRender);
    };

    const getDaftarStock = async () => {
        setIsLoading(true)
        const data = {
            dep: dep,
            sdep: sdep,
            kode: kode,
        };
        await axios
            .get(route("laporan.stock.getDaftarStock", data))
            .then((res) => {
                setDataTb(res.data.data);
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    Swal.fire("Gagal", err.response.data.message, "error");
                }
            });
        setIsLoading(false)
    }

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

    const columns = [
        {
            id: 'bara',
            name: 'Kode Stock',
            selector: row => row.bara,
        },
        {
            id: 'nama',
            name: 'Nama Barang',
            selector: row => row.nama,
        },
        {
            id: 'satuan',
            name: 'Satuan',
            selector: row => row.satuan,
        },
    ];

    return (
        <>
            {isLoading && <Loading />}
            <MasterAdmin title={"Laporan Pembelian"}>
                <div className="hidden">
                    <LaporanDaftarStockToPrint ref={componentRef} data={dataTb} />
                </div>
                <div className="card bg-base-100 mb-2">
                    <div className="card-body">
                        <div className="grid grid-cols-1 gap-2">
                            <div className="form-control">
                                <label htmlFor="" className="label-text">
                                    Departemen
                                </label>
                                <Select
                                    value={dep}
                                    onChange={handleChangeDepVal}
                                    options={deps}
                                    isSearchable={true}
                                    isClearable={true}
                                />
                            </div>
                            <div className="form-control">
                                <label htmlFor="" className="label-text">
                                    Sub Departemen
                                </label>
                                <Select
                                    value={sdep}
                                    onChange={handleChangeSDepVal}
                                    options={sdeps}
                                    isSearchable={true}
                                    isClearable={true}
                                />
                            </div>
                            <div className="form-control">
                                <label htmlFor="" className="label-text">
                                    Supplier
                                </label>
                                <Select
                                    value={kode}
                                    onChange={handleChangeKodeVal}
                                    options={suppliers}
                                    isSearchable={true}
                                    isClearable={true}
                                />
                            </div>
                        </div>
                        <button className="btn btn-primary btn-sm" onClick={getDaftarStock}>Tampilkan</button>
                    </div>
                </div>
                <div className="card bg-base-100 mb-2">
                    <div className="card-body">
                        {dataTb.length > 0 &&
                            <>
                                <div>
                                    <ReactToPrint
                                        trigger={() => (
                                            <button className="btn btn-primary btn-sm btn-square text-gray-100">
                                                <AiFillPrinter />
                                            </button>
                                        )}
                                        content={() => componentRef.current}
                                        documentTitle={"Daftar Stock"}
                                    />
                                </div>
                                <h1 className="text-xl text-center font-bold">SALDO STOCK</h1>
                                <DataTable
                                    columns={columns}
                                    data={dataTb}
                                    pagination

                                />
                            </>
                        }
                        {/* <table className="table table-sm">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Nota</th>
                                    <th>Tanggal</th>
                                    <th>Supplier</th>
                                    <th>Nilai</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataTb.map((d, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{d.nota}</td>
                                        <td>{d.tgl}</td>
                                        <td>{d.supplier.nama}</td>
                                        <td>{d.netto.toLocaleString("id")}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table> */}


                    </div>
                </div>
            </MasterAdmin>
        </>
    );
}
