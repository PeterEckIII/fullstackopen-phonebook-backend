require('dotenv').config();
const mongoose = require('mongoose');

const url = process.env.MONGO_URI;

console.log(`Connecting to ${ url }`)

mongoose
    .connect(url, { useNewUrlParser: true })
    .then(result => console.log(`CONNECTED TO MONGO DB`))
    .catch(e => console.warn(`ERROR CONNECTING TO MONGO DB`))

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

module.exports = mongoose.model('Person', personSchema);
