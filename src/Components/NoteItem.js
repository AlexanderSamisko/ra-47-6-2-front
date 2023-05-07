import React from "react";

export default function NoteItem({text, pullData, id}) {
      
    const removeNote = async () => {
        let response = await fetch(`http://localhost:7070/notes/${id}` , {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        });
        response.ok ? pullData() : console.log("Error")
    }

    return <li className="note-item">
        <p>{text}</p>
        <button onClick={removeNote}>Удалить</button>
    </li>
}