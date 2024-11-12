# Note-Taking App

A simple note-taking application built using **HTML**, **CSS**, and **JavaScript**. The app allows users to **create**, **edit**, **delete**, and **mark notes as done**. All notes are stored in the browser's `localStorage` for persistent data that survives page refreshes.

## Features

- **Create Notes**: Add new notes with a title and content.
- **Edit Notes**: Edit an existing note's title or content.
- **Delete Notes**: Permanently remove notes from the list.
- **Mark Notes as Done**: Toggle a note's completion status.
- **Persistent Data**: Notes are saved in `localStorage`, ensuring they persist even after a page reload.

## Technologies Used

- **HTML**: Provides the structure for the app.
- **CSS**: Styles the app's layout and design.
- **JavaScript**: Handles the app's logic for creating, editing, deleting, and managing notes.
- **localStorage**: Stores notes locally in the browser for persistence.

## Installation

To run this app locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/zolwethu/notes-app.git

2. **Navigate into the project directory:**
3. **Open the index.html file in your browser to start using the app.**

## Usage

## Create a Note:


Click the "New Note" button to open a popup.
Enter a title and content for the note, then click the "Create Note" button to save it.

## Edit a Note:

Click the "Edit" button next to a note.
Modify the title and/or content of the note and click "Done" to save the changes.

## Delete a Note:

Click the "Delete" button next to a note to remove it permanently.

## Mark a Note as Done:

Click the "Done" button to mark a note as completed.
Click "Undo" to revert the note back to its original state.

Folder Structure
css
Copy code
notes-app/
│
├── index.html      # The main HTML file containing the entire app (HTML, CSS, JavaScript)
This project is designed to run as a single HTML file with embedded CSS and JavaScript for simplicity.

git commit -am 'Add new feature'
Push to your branch:
bash
Copy code
git push origin feature-name
Create a pull request to the main repository.
