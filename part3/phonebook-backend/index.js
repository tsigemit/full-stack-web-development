require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/contacts')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        req.method === 'POST' ? JSON.stringify(req.body) : ''
    ].join(' ')
}))

app.get('/api/persons', (request, response) => {
    Person.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(note => {
        response.json(note)
    })
})

app.post('/api/persons', (request, response) => {
    var name = request.body.name
    var number = request.body.number
     if (!name || !number) {
        return response.status(400).json({
            error: 'Name or number is missing'
        })
    }

    const newContact = new Person({
        name:name,
        number:number
    })

    newContact.save().then(savedNote => {
        response.json(savedNote)
    })
})


// let persons = [
//         {
//             "name": "Arto Hellas",
//             "number": "040-123456",
//             "id": 1
//         },
//         {
//             "name": "Ada Lovelace",
//             "number": "39-44-5323523",
//             "id": 2
//         },
//         {
//             "name": "Dan Abramov",
//             "number": "12-43-234345",
//             "id": 3
//         },
//         {
//             "name": "Mary Poppendieck",
//             "number": "39-23-6423122",
//             "id": 4
//         }
//     ]

// app.get('/api/persons', (req, res) => {
//     res.json(persons)
// })
// app.get('/info', (req, res) => {
//     const timestamp = new Date().toString();
//     let count =0
//     persons.map(person => {
//         if(person.id)
//            count++;
//     })
//     res.send(`<b>Phonebook has info for ${count} people <br /><br /> ${timestamp}</b>`)
// })
// app.post('/api/persons', (request, response) => {
//     var name=request.body.name 
//     var number=request.body.number 
//    const newContact = persons.filter(person => (person.name===name))
//          if(newContact.length>0)
//              return response.status(400).json({
//                  error: 'Name must be unique'
//              })
//         else if (!name || !number) {
//             return response.status(400).json({
//                 error: 'Name or number is missing'
//             })
//         }
    
//     const person = {
//         name,
//         number,
//         id: generateId(),
//     }

//     persons = persons.concat(person)
//     response.json(person)
// })

// app.get('/api/persons/:id', (request, response) => {
//     const id = Number(request.params.id)
//     const person = persons.find(person => person.id === id)
//     if (person) {
//         response.json(person)
//     } else {
//         response.status(404).end('User doesn\'t exist')
//     }
// })

// app.delete('/api/persons/:id', (request, response) => {
//     const id = Number(request.params.id)
//     const checkIfExists = persons.find(person => person.id === id)
//     if (!checkIfExists)
//         response.status(404).end('User doesn\'t exist')
//     else
//     {
//         persons = persons.filter(person => person.id !== id)
//         response.json(persons)
//         response.status(204).end()
//     }
// })

const PORT =process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})