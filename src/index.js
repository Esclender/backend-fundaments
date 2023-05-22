const express = require("express")
const bodyParser = require("body-parser")
const app = express()

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
  }
]

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.use(bodyParser.json())

app.get("/", (request, response) => {
  response.send("<h1>Hello World2!</h1>")
})

app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
  note ? response.json(note) : response.status(404).end()
})

app.get("/api/notes", (request, response) => {
  response.json(notes)
})

app.post("/api/notes", (req, resp) => {
  const note = req.body

  if (!note.content) {
    return resp.status(404).json({
      error: "Note is empty"
    })
  }

  const newNote = {
    id: generateId(),
    important: note.important || false,
    date: new Date(),
    ...note
  }

  notes = notes.concat(newNote)

  resp.json(notes)
})

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id)
  const actLength = notes.length
  console.log(actLength)
  notes = notes.filter(note => note.id !== id)

  console.log(actLength, notes.length)

  console.log(typeof (actLength), typeof (notes.length))

  if (notes.length !== actLength) {
    response.json(notes)
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
