require('dotenv').config({ path: '.env' });
const express = require('express')
var morgan = require('morgan')
const app = express()
//require('dotenv').config()
const Person = require('./models/contacts')
const cors = require('cors')

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
//get list of all contacts
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons.map(person => person.toJSON()))
    })
        .catch(error => next(error))
})
//Get info of the contacts
app.get('/info', (req, res, next) => {
    const timestamp = new Date().toString();
    let count = 0
    Person.find({}).then(persons => {
        persons.map(person => {
            if(person.id)
               count++;
          })
        res.send(`<b>Phonebook has info for ${count} people <br /><br /> ${timestamp}</b>`)
    }) 
        .catch(error => next(error))  
})
//get contact by id
app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person.toJSON())
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response,next) => {
      const name = request.body.name
      const number = request.body.number
     if (name === undefined) 
    return response.status(400).json({
        error: 'Name is missing'
    })
    else if(number === undefined)
        return response.status(400).json({
            error: 'Number is missing'
        })

    const newContact = new Person({
        name,
        number
    })

    newContact.save()
        .then(savedContact => savedContact.toJSON())
        .then(savedAndFormattedContact => {
            response.json(savedAndFormattedContact)
        })
        .catch(error => next(error)) 
})

app.put('/api/persons/:id', (request, response,next) => {
    const body = request.body
  Person.findOne({_id:request.params.id})
  .then((contactToBeUpdated) => {
        contactToBeUpdated.name= body.name
        contactToBeUpdated.number= body.number
        contactToBeUpdated.save()
                          .then(() => {
                              response.json(contactToBeUpdated.toJSON())
                            })
                            .catch(error => next(error))
})     
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') { 
        return response.status(400).json({ error: error.message }) }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
// For REST and Express
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

