const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");

getNotes().forEach(note => {
   const noteElement = createNoteElement(note.id, note.content);
   notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNote());

//function of getting note
function getNotes() {
 return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}
//function of saving notes
function saveNotes(notes) {
 localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}
//function of creating new note
function createNoteElement(id, content) {
 const element = document.createElement("textarea");

 element.classList.add("note");
 element.value = content;
 element.placeholder = "Empty Sticky Note";

 element.addEventListener("change", () =>{
    updateNote(id, element.value);
 });

 element.addEventListener("dblclick", () =>{
    const doDelete = confirm("Are you sure you wish to delete thsi sticky Note..?");

    if (doDelete) {
      deleteNote(id, element);
    }
 });

 return element;
}
//function of adding note
function addNote() {
   const notes = getNotes();
   const noteObject = {
      id: Math.floor(Math.random() * 100000),
      content: ""
   };

   const noteElement = createNoteElement(noteObject.id, noteObject.content);
   notesContainer.insertBefore(noteElement, addNoteButton);

   notes.push(noteObject);
   saveNotes(notes);
}
//function of updating note
function updateNote(id, newContent) {
   const notes = getNotes();
   const targetNote = notes.filter(note => note.id == id)[0];

   targetNote.content = newContent;
   saveNotes(notes);
}
//function of deleting note
function deleteNote(id, element) {
   const notes = getNotes().filter(note => note.id != id);

   //Saveing notes
   saveNotes(notes);
   notesContainer.removeChild(element);
}
