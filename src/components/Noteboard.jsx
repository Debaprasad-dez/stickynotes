import { useState } from "react";
import Note from "./Note";

const arr = new Array(10);
arr.fill(10);

function Noteboard() {
  const [notes, setNotes] = useState([]);

  const addNote = () => {
    setNotes([...notes, { id: Date.now() }]);
  };
  const closeNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };
  return (
    <div>
      <div className="container">
        <button className="add-btn" onClick={addNote}>
          ➕
        </button>
      </div>
      {notes.length > 0 ? (
        <div>
          {notes.map((item) => (
            <Note
              key={item.id}
              position={notes.length}
              onClose={() => closeNote(item.id)}
            />
          ))}
        </div>
      ) : (
        <span className="emptyNotes">
          Please add your notes by clicking on the button 👉
        </span>
      )}
    </div>
  );
}

export default Noteboard;
