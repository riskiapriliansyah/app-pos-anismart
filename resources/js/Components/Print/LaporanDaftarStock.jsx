import React from "react";

export class LaporanDaftarStockToPrint extends React.PureComponent {
    render() {
        const data = this.props.data
        return (
            <section className="px-5 py-[70px]">
                <h1 className="text-xl text-center font-bold">Daftar Stock</h1>

                <table className="table mt-[20px]">
                    <thead>
                        <tr>
                            <th>Kode Stock</th>
                            <th>Nama Barang</th>
                            <th>Satuan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((d, index) => (
                            <tr>
                                <td>{d.bara}</td>
                                <td>{d.nama}</td>
                                <td>{d.satuan}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </section>
        );
    }
}
