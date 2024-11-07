function popup() {
  const popupContainer = document.createElement("div");

  popupContainer.innerHTML = `
  <div id="popupContainer">
      <h1>New Note</h1>
      <input id="note-title" placeholder="Enter note title...">
      <textarea id="note-text" placeholder="Enter your note..."></textarea>
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
  const popupContainer = document.getElementById('popupContainer');
  const noteTitle = document.getElementById('note-title').value;
  const noteText = document.getElementById('note-text').value;
  
  if (noteText.trim() !== '') {
      const note = {
          id: new Date().getTime(),
          title: noteTitle,
          text: noteText
      };

      const existingNotes = JSON.parse(localStorage.getItem('notes')) || [];
      existingNotes.push(note);

      localStorage.setItem('notes', JSON.stringify(existingNotes));

      // Clear the fields after creating the note
      document.getElementById('note-title').value = '';
      document.getElementById('note-text').value = '';

      popupContainer.remove();
      displayNotes();
  }
}

function displayNotes() {
  const notesList = document.getElementById('notes-list');
  notesList.innerHTML = '';

  const notes = JSON.parse(localStorage.getItem('notes')) || [];

  notes.forEach(note => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
      <span>${note.title}</span>
      <span class="note-title">${note.text}</span>
      <div id="noteBtns-container">
          <button class="editBtn" onclick="editNote(${note.id})"><i class="fa-solid fa-pen"></i> Edit</button>
          <button class="deleteBtn" onclick="deleteNote(${note.id})"><i class="fa-solid fa-trash"></i> Delete</button>
      </div>
      `;
      notesList.appendChild(listItem);
  });
}

function editNote(noteId) {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  const noteToEdit = notes.find(note => note.id == noteId);
  
  const noteTitle = noteToEdit ? noteToEdit.title : '';
  const noteText = noteToEdit ? noteToEdit.text : '';
  const editingPopup = document.createElement("div");
  
  editingPopup.innerHTML = `
  <div id="editing-container" data-note-id="${noteId}">
      <h1>Edit Note</h1>
      <input id="note-title" value="${noteTitle}">
      <textarea id="note-text">${noteText}</textarea>
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

  if (noteText !== '') {
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
}

function deleteNote(noteId) {
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes = notes.filter(note => note.id !== noteId);

  localStorage.setItem('notes', JSON.stringify(notes));
  displayNotes();
}

// Initial call to display the notes list when the page loads
displayNotes();
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
  if(popupContainer) {
      popupContainer.remove();
  }
}

function createNote() {
  const noteTitle = document.getElementById('note-title').value.trim();
  const noteText = document.getElementById('note-text').value.trim();

  if (noteTitle === "" || noteText === "") {
      alert("Please enter both title and text for the note.");
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

  document.getElementById('note-title').value = '';
  document.getElementById('note-text').value = '';

  closePopup();
  displayNotes();
}

function displayNotes() {
  const notesList = document.getElementById('notes-list');
  if (!notesList) {
      const listContainer = document.createElement('ul');
      listContainer.id = 'notes-list';
      document.body.appendChild(listContainer);
  }

  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notesList.innerHTML = '';

  notes.forEach(note => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
      <div class="note">
          <h3 class="note-title">${note.title}</h3>
          <p class="note-text">${note.text}</p>
          <div class="note-btns">
              <button class="editBtn" onclick="editNote(${note.id})"><i class="fa-solid fa-pen"></i> Edit</button>
              <button class="deleteBtn" onclick="deleteNote(${note.id})"><i class="fa-solid fa-trash"></i> Delete</button>
          </div>
      </div>
      `;
      notesList.appendChild(listItem);
  });
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
  if(editingPopup) {
      editingPopup.remove();
  }
}

function updateNote() {
  const noteTitle = document.getElementById('note-title').value.trim();
  const noteText = document.getElementById('note-text').value.trim();
  const editingPopup = document.getElementById('editing-container');

  if (noteText === "") {
      alert("Note text cannot be empty.");
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

displayNotes();
