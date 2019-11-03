require('dotenv').config();
const mongoose = require('mongoose');

console.log(`Connecting to ${ process.env.MONGO_URI }`)

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(result => console.log(`CONNECTED TO MONGO DB`))
    .catch(e => console.warn(`ERROR CONNECTING TO MONGO DB ${ e.message }`))

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject._v
    }
})

module.exports = mongoose.model('Person', personSchema);
