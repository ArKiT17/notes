import './App.css';
import {useEffect, useRef, useState} from "react";
import Note from "./components/Note/Note";
import Modal from "./components/Modal/Modal";

function App() {
    const myNotes = JSON.parse(localStorage.getItem('notes'))
    const [notes, setNotes] = useState(myNotes !== null ? myNotes : [])
    const [modalWindow, setModalWindow] = useState(false)
    const [noteToDelete, setNoteToDelete] = useState()
    const headerInput = useRef()
    const descriptionInput = useRef()
    useEffect(() => localStorage.setItem('notes', JSON.stringify(notes)), [notes])

    function getTime() {
        const date = new Date()
        const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
        const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
        return `${date.getHours()}:${minutes} | ${day}.${month}.${date.getFullYear()}`
    }

    function addNote() {
        if (headerInput.current.value && descriptionInput.current.value) {
            setNotes((oldNotes) => [...oldNotes, {
                id: oldNotes.length,
                header: headerInput.current.value,
                text: descriptionInput.current.value,
                time: getTime(),
                isDone: false
            }])
            setTimeout(() => {
                headerInput.current.value = ''
                descriptionInput.current.value = ''
            }, 5)
        }
    }

    function showModalWindow(note) {
        setNoteToDelete(note)
        setModalWindow(true)
    }

    function deleteNote() {
        if (noteToDelete) {
            setNotes(notes.filter((item) => item.id !== noteToDelete.id))
            setModalWindow(false)
        }
        return true
    }

    return (
        <>
            <div id="wrapper">
                <Modal show={modalWindow} hide={() => setModalWindow(false)} noteToDelete={noteToDelete}
                       deleteNote={deleteNote}/>
                <div className="add-note">
                    <div className="add-note-card">
                        <input ref={headerInput} type="text" id="name" name="name" placeholder="Заголовок"/>
                        <textarea ref={descriptionInput} id="description" name="description" placeholder="Вміст"/>
                        <button onClick={addNote}>Створити замітку</button>
                    </div>
                </div>
                <div className="notes">
                    {notes.map((note) => <Note key={note.id} id={note.id} header={note.header} text={note.text}
                                               time={note.time} isDone={note.isDone}
                                               onDelete={() => showModalWindow(note)}/>)}
                </div>
            </div>
        </>
    );
}

export default App;
