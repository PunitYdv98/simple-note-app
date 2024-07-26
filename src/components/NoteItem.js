import React from 'react';

const NoteItem = ({ note, onEdit, onDelete }) => {
  return (
    <div className="note-item">
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <div className="timestamp">{new Date(note.timestamp).toLocaleString()}</div>
      <div className="buttons">
        <button onClick={() => onEdit(note)}>Edit</button>
        <button onClick={() => onDelete(note.id)}>Delete</button>
      </div>
    </div>
  );
};

export default NoteItem;
