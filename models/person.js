const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

console.log(`Connecting to ${url}`);

mongoose.connect(url, { useNewUrlParser: true })
    .then(res => {
        console.log(`Connected to MongoDB`);
    })
    .catch(error => {
        console.log(`Error connecting to MongoDB: ${error}`);
    });

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set('toJSON', {
    transform: (doc, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id,
        delete returnedObj._v
    }
});


module.exports = mongoose.model('Person', personSchema);
