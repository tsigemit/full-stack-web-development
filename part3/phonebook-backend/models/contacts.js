const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI
console.log('connecting to', url)
mongoose.connect(url, { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false })
    .then(() => { console.log('connected to MongoDB') })
    .catch((error) => { console.log('error connecting to MongoDB:', error.message) })
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        unique: true,
        required: [true, 'contact\'s name required']
    },
    number: {
        type: String,
        minlength: 8,
        unique: true,
        required: [true, 'contact\'s phone number required']
    }
})
personSchema.plugin(uniqueValidator)
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)