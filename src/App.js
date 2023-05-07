import { useEffect, useRef, useState } from 'react';
import './App.css';
import NoteItem from './Components/NoteItem';

function App() {
  const [notes, setNotes] = useState([]);
  const noteField = useRef(null);

  // имитируем @компонент смонтировался@
  useEffect(()=> {
    pullData();
  }, []);

  const pullData = async () => {
    let response = await fetch(`http://localhost:7070/notes` , {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    });
    let data = await response.json();
    setNotes(data);
  }

  const addNote = (evt) => {
    evt.preventDefault();
    (async () => {
      let response = await fetch(`http://localhost:7070/notes` , {
        body: JSON.stringify([noteField.current.value]),
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
      });
        console.log(response);
        response.ok ? pullData() : console.log("Error")
      })();

      noteField.current.value = "";
  }
 
  return (
    <div className="App">
        <div className="notes">
          <div className="header">
            <h1>Notes</h1>
            <button> Обновить </button>
          </div>
          
          <ul>
            {
              notes.map(
                item =>  <NoteItem text={item.content} key={item.id} id={item.id} pullData={pullData} notes={notes}/>
              )
            }
          </ul>
          <form className="add-group">
            <label htmlFor="new-note">New note</label>
            <textarea ref={noteField} name="new-note" rows="2" cols="10" id="new-note" placeholder='введите текст'></textarea>
            <button onClick={addNote}>Добавить</button>
          </form>
        </div>
    </div>
  );
}

export default App;

