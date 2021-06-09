import React, { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import noteService from './services/notes'
import loginService from './services/login'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser ] = useState(null)

  const noteFormRef = useRef()

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

const toggleImportanceOf = id => {
  const note = notes.find(n => n.id === id)
  const changedNote = { ...note, important: !note.important }

  noteService
  .update(id, changedNote)
    .then(returnedNote => {
    setNotes(notes.map(note => note.id !== id ? note : returnedNote))
  })
  .catch(error => {
    setErrorMessage(
      `Note '${note.content}' was already removed from server`
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  })
}

const addNote = (noteObject) => {
  noteFormRef.current.toggleVisibility()
  noteService
    .create(noteObject)
      .then(returnedNote => {
      setNotes(notes.concat(returnedNote))
    })
}

const notesToShow = showAll ? notes : notes.filter(note => note.important)

const handleLogin = async (loginObject) => {
  try {
    const user = await loginService.login(loginObject)
    window.localStorage.setItem(
      'loggedNoteAppUser', JSON.stringify(user)
    )
    noteService.setToken(user.token)
    setUser(user)
  } catch (exception) {
    setErrorMessage('Wrong credentials')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
}

const handleLogout = (event) => {
  window.localStorage.removeItem('loggedNoteAppUser')
  noteService.setToken(null)
  setUser(null)
  //setUsername('')
  //setPassword('')
}

const loginForm = () => (
  <Togglable buttonLabel="log in" >
    <LoginForm handleLogin={handleLogin}/>
  </Togglable>
)

const noteForm = () => (
  <Togglable buttonLabel='new note' ref={noteFormRef}>
    <NoteForm createNote={addNote}/>
  </Togglable>
)

const logoutButton = () => <button onClick={handleLogout}>log out</button>

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          {noteForm()}
          {logoutButton()}
        </div>
      }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
        )}
      </ul>

      <Footer />
    </div>
  )
}


export default App