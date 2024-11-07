function popup() {
  const popupContainer = document.createElement("div");
  popupContainer.innerHTML = `
  <div id="popupContainer" class="popup-container">
      <h1>New Note</h1>
      <input id="note-title" placeholder="Enter note title..." aria-label="Note Title">
      <textarea id="note-text" placeholder="Enter your note..." aria-label="Note Text"></textarea>
      <div id="btn-container">
          <button id="submitBtn" onclick="createNote()">Create Note</button>
          <button id="closeBtn" onclick="closePopup()">Close</button>
      </div>
  </div>
  `;
  document.body.appendChild(popupContainer);
}

function closePopup() {
  const popupContainer = document.getElementById("popupContainer");
  if (popupContainer) {
      popupContainer.remove();
  }
}

function createNote() {
  const noteTitle = document.getElementById('note-title').value.trim();
  const noteText = document.getElementById('note-text').value.trim();

  if (noteTitle === "" || noteText === "") {
      showErrorPopup("Please enter both title and text for the note.");
      return;
  }

  const note = {
      id: new Date().getTime(),
      title: noteTitle,
      text: noteText
  };

  const existingNotes = JSON.parse(localStorage.getItem('notes')) || [];
  existingNotes.push(note);

  localStorage.setItem('notes', JSON.stringify(existingNotes));

  // Clear fields after creating the note
  document.getElementById('note-title').value = '';
  document.getElementById('note-text').value = '';

  closePopup();
  displayNotes();
}

// Show the error modal
function showErrorPopup(message) {
  console.log("showErrorPopup called with message:", message); // Debugging
  const errorPopup = document.createElement("div");
  errorPopup.id = "error-popup";
  errorPopup.innerHTML = `
  <div class="error-modal">
      <h2>Error</h2>
      <p>${message}</p>
      <button onclick="closeErrorPopup()">Close</button>
  </div>
  `;
  document.body.appendChild(errorPopup);
  console.log("Error popup added to the DOM."); // Debugging
}

// Close the error modal
function closeErrorPopup() {
  const errorPopup = document.getElementById("error-popup");
  if (errorPopup) {
      errorPopup.remove();
  }
}
function displayNotes() {
  const notesList = document.getElementById('notes-list') || createNotesListContainer();

  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notesList.innerHTML = '';

  notes.forEach(note => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
    <div class="note ${note.completed ? 'completed' : ''}">
        <h3 class="note-title">${note.title}</h3>
        <p class="note-text">${note.text}</p>
        <div class="note-btns">
            <button class="editBtn" onclick="editNote(${note.id})"><i class="fa-solid fa-pen"></i> Edit</button>
            <button class="deleteBtn" onclick="deleteNote(${note.id})"><i class="fa-solid fa-trash"></i> Delete</button>
            <button class="doneBtn" onclick="markAsDone(${note.id})">${note.completed ? 'Undo' : 'Done'}</button>
        </div>
    </div>
    `;
    notesList.appendChild(listItem);
  });
}

// Mark the note as done or undo the completion
function markAsDone(noteId) {
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes = notes.map(note => {
    if (note.id === noteId) {
      note.completed = !note.completed; // Toggle the completed status
    }
    return note;
  });

  localStorage.setItem('notes', JSON.stringify(notes));

  displayNotes(); // Re-render the notes list
}


function createNotesListContainer() {
  const listContainer = document.createElement('ul');
  listContainer.id = 'notes-list';
  document.body.appendChild(listContainer);
  return listContainer;
}

function editNote(noteId) {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  const noteToEdit = notes.find(note => note.id == noteId);

  const noteTitle = noteToEdit ? noteToEdit.title : '';
  const noteText = noteToEdit ? noteToEdit.text : '';
  const editingPopup = document.createElement("div");

  editingPopup.innerHTML = `
  <div id="editing-container" class="popup-container" data-note-id="${noteId}">
      <h1>Edit Note</h1>
      <input id="note-title" value="${noteTitle}" aria-label="Edit Note Title">
      <textarea id="note-text" aria-label="Edit Note Text">${noteText}</textarea>
      <div id="btn-container">
          <button id="submitBtn" onclick="updateNote()">Done</button>
          <button id="closeBtn" onclick="closeEditPopup()">Cancel</button>
      </div>
  </div>
  `;

  document.body.appendChild(editingPopup);
}

function closeEditPopup() {
  const editingPopup = document.getElementById("editing-container");
  if (editingPopup) {
      editingPopup.remove();
  }
}

function updateNote() {
  const noteTitle = document.getElementById('note-title').value.trim();
  const noteText = document.getElementById('note-text').value.trim();
  const editingPopup = document.getElementById('editing-container');

  if (noteText === "") {
      showErrorPopup("Note text cannot be empty.");
      return;
  }

  const noteId = editingPopup.getAttribute('data-note-id');
  let notes = JSON.parse(localStorage.getItem('notes')) || [];

  const updatedNotes = notes.map(note => {
      if (note.id == noteId) {
          return { id: note.id, title: noteTitle, text: noteText };
      }
      return note;
  });

  localStorage.setItem('notes', JSON.stringify(updatedNotes));

  editingPopup.remove();
  displayNotes();
}

function deleteNote(noteId) {
  if (confirm("Are you sure you want to delete this note?")) {
      let notes = JSON.parse(localStorage.getItem('notes')) || [];
      notes = notes.filter(note => note.id !== noteId);
      localStorage.setItem('notes', JSON.stringify(notes));
      displayNotes();
  }
}

// Initial call to display the notes list when the page loads
displayNotes();
