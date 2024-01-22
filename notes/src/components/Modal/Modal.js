import './Modal.css'

export default function Modal({show, hide, noteToDelete, deleteNote}) {

    if (!show)
        return null

    return (
        <div className="modal-window">
            <div className="modal-content">
                <h2>Ви впевнені що хочете видалити {noteToDelete.header}?</h2>
                <div className="buttons">
                    <button className="accept" onClick={deleteNote}>Так</button>
                    <button className="reject" onClick={hide}>Ні</button>
                </div>
            </div>
        </div>
    )
};