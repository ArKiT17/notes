import {useEffect, useState} from 'react';
import './Note.css'

const Note = ({id, header, text, time, isDone, onDelete}) => {
    const [style, setStyle] = useState(isDone ? "note checked" : "note")
    useEffect(() => {
        let oldNotes = JSON.parse(localStorage.getItem('notes'))
        let newNotes = oldNotes.map((item) => {
            if (item.id === id)
                item.isDone = !item.isDone
            return item
        })
        localStorage.setItem('notes', JSON.stringify(newNotes))
    }, [id, style])

    return (
        <div className={style}>
            <div className="note-header">{header}</div>
            <div className="note-text">{text}</div>
            <div className="note-time">{time}</div>
            <button className="btn delete-button" onClick={onDelete}></button>
            <button className="btn check-button"
                    onClick={() => style === "note" ? setStyle("note checked") : setStyle("note")}></button>
        </div>
    )
}

export default Note