import React, { useState } from 'react';
import Navbar from './Navbar.tsx'
import Title from './Title.tsx'
import { X, Plus } from 'lucide-react';

interface Position {
    x:number;
    y:number;
}

interface Note{
    id:number;
    text:string;
    position: Position;
    color: string;
}

interface DragOffset{
    x:number;
    y:number;
}


const Notes: React.FC = () => {
//   const [notes, setNotes] = useState<Note[]>([]);
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem('sticky-notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [draggedNote, setDraggedNote] = useState<Note | null>(null);
  const [dragOffset, setDragOffset] = useState<DragOffset>({x:0, y:0});

  React.useEffect(() => {
    localStorage.setItem('sticky-notes', JSON.stringify(notes));
  }, [notes]);

  const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 80%)`;
  };

  const addNote = () : void => {
    const newNote = {
      id: Date.now(),
      text: '',
      position: { x: 50, y: 50 },
      color: getRandomColor(),
    };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id:number):void => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const updateNoteText = (id:number, text:string):void => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, text } : note
    ));
  };

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>, note: Note): void => {
    // get position of mouse
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // calculate offset from mouse to the note's position
    setDragOffset({
      x: mouseX - note.position.x,
      y: mouseY - note.position.y
    });
    
    setDraggedNote(note);
  };
  
  const handleDrag = (e: React.MouseEvent<HTMLDivElement>):void => {
    if (!draggedNote) return;
    
    // use stored offset to maintain the same position before dragging
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    
    setNotes(notes.map(note =>
      note.id === draggedNote.id
        ? { ...note, position: { x: newX, y: newY } }
        : note
    ));
  };

  const handleDragEnd = () => {
    setDraggedNote(null);
  };

  return (
    <>
    <Title />
    <Navbar />
    <div 
      className="relative h-screen w-full overflow-hidden flex justify-center"
      onMouseMove={handleDrag}
      onMouseUp={handleDragEnd}
    >
      <div
        className="mt-6 p-4 bg-blue-100 w-1/7 h-10 flex justify-center items-center rounded-md cursor-pointer"
        onClick={addNote}
      >
        <Plus className="mr-5" />
        Add Note
      </div>

      {notes.map(note => (
        <div
          key={note.id}
          className="absolute shadow-lg rounded-lg w-48 min-h-40"
          style={{
            left: note.position.x,
            top: note.position.y,
            backgroundColor: note.color,
            cursor: draggedNote?.id === note.id ? 'grabbing' : 'grab'
          }}
          onMouseDown={(e) => handleDragStart(e, note)}
        >
          <div className="p-2 flex justify-end bg-black/10">
            <div
              onClick={() => deleteNote(note.id)}
              className="text-gray-600 hover:text-gray-800"
            >
              <X className="w-4 h-4" />
            </div>
          </div>
          <textarea
            className="w-full h-32 p-3 bg-transparent border-none resize-none focus:ring-0 focus:outline-none"
            placeholder="Type your note here..."
            value={note.text}
            onChange={(e) => updateNoteText(note.id, e.target.value)}
          />
        </div>
      ))}
    </div>
    </>
  );
};

export default Notes;