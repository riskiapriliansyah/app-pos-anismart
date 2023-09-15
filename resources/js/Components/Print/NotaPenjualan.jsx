import { Head } from "@inertiajs/react";
import React from "react";
import "../../../css/print.css";

export class NotaPenjualanToPrint extends React.PureComponent {
  render() {
        const data = this.props.data
        const today = new Date();
        console.log(today)
        const tanggal =
        today.getFullYear() +
        "-" +
        ("0" + (today.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + today.getDate()).slice(-2);

        return (
            <section className="px-5 py-2">
                <div className="flex items-center justify-between">
                    <div>
                        <h4>TOKO APOLLO</h4>
                        <h4>JL. PANGLIMA BATUR NO. 61</h4>
                        <h4>TLP. 0541-742705</h4>
                        <h4>SAMARINDA</h4>
                    </div>
                    <div className="w-72">
                        <h2 className="text-xl">Kepada Yth: </h2>
                        <h4>{data.cust.nama}</h4>
                        <h4>{data.cust.alamat}</h4>
                    </div>
                </div>
                <div className="mt-5 flex items-center justify-between">
                    <p>No.Faktur: {data.nota}</p>
                    <p>Tgl.Faktur: {data.tgl}</p>
                    <p>Jt.Tempo: {data.jatuh}</p>
                </div>
                <div className="">
                    <table className="border border-black divide-y divide-gray-800 w-full">
                        <thead className="text-gray-800">
                            <tr className="">
                                <td className="px-4">No.</td>
                                <td className="px-4">Kode Stock</td>
                                <td className="px-4">Nama Barang</td>
                                <td className="px-4">Satuan</td>
                                <td className="px-4">@Harga</td>
                                <td className="px-4">Dis#1</td>
                                <td className="px-4">Dis#2</td>
                                <td className="px-4">Total</td>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                          {data.gtjual.map((d,index) => (
                            <tr>
                                <td className="text-center">{index+1}</td>
                                <td>{d.bara1}</td>
                                <td>{d.nama}</td>
                                <td className="text-center">{d.satuan}</td>
                                <td>{d.harga.toLocaleString("id")}</td>
                                <td className="text-center">{d.disc}</td>
                                <td className="text-center">{d.disc1}</td>
                                <td>{d.total.toLocaleString("id")}</td>
                            </tr>
                          ))}
                        </tbody>
                    </table>
                    <div className="flex items-center justify-between">
                        <div className="mt-10">
                          <div className="flex flex-row gap-4">
                            <div className="w-64">
                              <p>Hormat Kami,</p>
                            </div>
                            <div>
                              <p>Diterima Oleh,</p>
                            </div>
                          </div>
                        </div>
                        <div>
                            <table className="text-md">
                                <tr>
                                    <td className="px-5">Sub Total: </td>
                                    <td className="px-5">{data.nilai.toLocaleString("id")}</td>
                                </tr>
                                <tr>
                                    <td className="px-5">Disc. {data.disc}%: </td>
                                    <td className="px-5">{data.ndisc.toLocaleString("id")}</td>
                                </tr>
                                <tr>
                                    <td className="px-5">PPn. {data.pph}%: </td>
                                    <td className="px-5">{data.npph.toLocaleString("id")}</td>
                                </tr>
                                <tr>
                                    <td className="px-5">Total: </td>
                                    <td className="px-5">{data.netto.toLocaleString("id")}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <hr className="mt-20 border-black" />
                <p className="text-xs">Dicetak: {tanggal} | Dibuat Oleh: {data.user.name}</p>
            </section>
        );
    }
}
