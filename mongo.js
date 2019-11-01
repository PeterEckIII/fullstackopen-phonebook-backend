require('dotenv').config()
const mongoose = require('mongoose');

if (process.argv < 3) {
    console.log('Give password as argument')
    process.exit(1);
}

const password = process.argv[ 2 ];

const url = `mongodb+srv://jpeckiii:${ process.env.MONGO_PASSWORD }@phonebook-zdhue.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

// const person1 = new Person({
//     name: 'Katie Hofer',
//     number: '304-951-6878',
// })

// person1
//     .save()
//     .then(res => {
//         console.log(`New contact, ${ person1.name } saved to phonebook`)
//         mongoose.connection.close();
//     })

Person
    .find({})
    .then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close();
    })
