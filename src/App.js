import React, { useState, useEffect } from 'react';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import Pagination from './components/Pagination';
import SearchBar from './components/SearchBar';
import './styles.css';

const App = () => {
  const [notes, setNotes] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [editingNote, setEditingNote] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleSaveNote = (note) => {
    if (note.id) {
      setNotes(notes.map(n => n.id === note.id ? note : n));
    } else {
      note.id = Date.now();
      setNotes([note, ...notes]);
    }
    setEditingNote(null);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
  };

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
    setCurrentPage(1);
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm) ||
    note.content.toLowerCase().includes(searchTerm)
  );

  const notesPerPage = 10;
  const totalPages = Math.ceil(filteredNotes.length / notesPerPage);
  const currentNotes = filteredNotes.slice((currentPage - 1) * notesPerPage, currentPage * notesPerPage);

  return (
    <div className="container">
      <header className="header">
        <h1>Simple Note Taking App</h1>
      </header>


      {editingNote ? (
        <NoteForm note={editingNote} onSave={handleSaveNote} onCancel={() => setEditingNote(null)} />
      ) : (
        <NoteForm onSave={handleSaveNote} />
      )}


      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />  

        <NoteList notes={currentNotes} onEdit={handleEditNote} onDelete={handleDeleteNote} />

       

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      /> 
    </div>
  );
};

export default App;
