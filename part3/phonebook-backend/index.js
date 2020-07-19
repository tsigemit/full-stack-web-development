const express = require('express')
const app = express()

app.use(express.json())

let persons = [
        {
            "name": "Arto Hellas",
            "number": "040-123456",
            "id": 1
        },
        {
            "name": "Ada Lovelace",
            "number": "39-44-5323523",
            "id": 2
        },
        {
            "name": "Dan Abramov",
            "number": "12-43-234345",
            "id": 3
        },
        {
            "name": "Mary Poppendieck",
            "number": "39-23-6423122",
            "id": 4
        }
    ]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})
app.get('/info', (req, res) => {
    const timestamp = new Date().toString();
    let count =0
    persons.map(person => {
        if(person.id)
           count++;
    })
    res.send(`<b>Phonebook has info for ${count} people <br /><br /> ${timestamp}</b>`)
})

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0
    return maxId + 1
}

app.post('/api/persons', (request, response) => {
    const name=request.body.name
    const newContact = persons.filter(person => (person.name===name))
         if(newContact)
             return response.status(400).json({
                 error: 'Name must be unique'
             })
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Name or number is missing'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(person)

    response.json(person)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end('User doesn\'t exist')
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const checkIfExists = persons.find(person => person.id === id)
    if (!checkIfExists)
        response.status(404).end('User doesn\'t exist')
    else
    {
        persons = persons.filter(person => person.id !== id)
        response.json(persons)
        response.status(204).end()
    }
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})