import { contacts, setContacts } from "./project.module.js"
import express from "express"
import bodyParser from "body-parser"
import morgan from "morgan"
import cors from "cors"

const app = express()

morgan.token("body", (resq) => {
  return JSON.stringify(resq.body)
})

function generateId () {
  const actIds = contacts.filter(c => c.id)
  let newId
  do {
    newId = Math.floor((Math.random() * 60000) + 1)
  } while (actIds.includes(newId))

  return newId
}

app.use(bodyParser.json())
app.use(morgan(" :method :url :status :res[content-length] - :response-time ms  :body "))
app.use(cors())

app.get("/info", (req, resp) => {
  resp.send(
    `<h2>The phone book has info for ${contacts.length} people </h2>
    <h3>${new Date()}</h3>`
  )
})

app.get("/api/person/:id", (req, resp) => {
  const person = contacts.find(prs => prs.id == req.params.id)
  if (!person) {
    return resp.json({
      error: "Person not found"
    })
  }
  resp.json(person)
})

app.post("/api/person", (resq, resp) => {
  const body = resq.body
  const actNumbers = contacts.map(c => c.phone_number)
  const actNames = contacts.map(c => c.name)

  const newPer = {
    id: generateId(),
    ...body
  }

  if (newPer.name &&
      !actNumbers.includes(newPer.phone_number)
  ) {
    contacts.push(newPer)
  } else {
    if (actNames.includes(newPer.name)) {
      return resp.json({ error: "The name must be unique" })
    }

    return resp.json({
      error: "The phone number or the name is miseed"
    })
  }

  resp.json(contacts)
})

app.delete("/api/person/:id", (resq, resp) => {
  const id = resq.params.id
  const actLength = contacts.length
  const newOne = contacts.filter(c => c.id != id)

  setContacts(newOne)

  if (actLength == contacts.length) {
    return resp.json({
      error: "Person not found"
    })
  }

  console.log(contacts)

  resp.json(contacts)
  resp.status(204).end()
})

app.get("/api/person", (req, resp) => {
  resp.json(contacts)
})

app.get("/", (request, response) => {
  response.send("<h1>Hello World2!</h1>")
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
