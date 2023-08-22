export default function EditModal({ children, fun, clearHandle}) {
    return (
        <>
            <dialog id="my_modal_1_edit" className="modal">
                <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">Edit Data</h3>
                    <div className="py-4">
                        {children}
                    </div>
                    <div className="modal-action">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm text-xs btn-primary" onClick={fun}>Simpan</button>
                        <button className="btn btn-sm text-xs" onClick={clearHandle}>Close</button>
                    </div>
                </form>
            </dialog>
        </>
    );
}
