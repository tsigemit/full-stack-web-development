const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}
const password = process.argv[2]
const url = `mongodb+srv://tsigemit:${password}@cluster0.hfd2z.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

const newContact = new Person({
    name: process.argv[3],
    number: process.argv[4]
})

if (process.argv.length === 5)
newContact.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
})

if(process.argv.length===3)
Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(contact => {
        console.log(contact.name, contact.number);
    })
    mongoose.connection.close()
})
