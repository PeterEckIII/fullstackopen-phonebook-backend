const mongoose = require('mongoose');

const password = process.argv[2];

// Fix issue with Mongo saving an undefined entry when no name or number is given

const url = `mongodb+srv://peter_eck:${password}@phonebook-pnfhz.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true});

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model('Person', personSchema);

if(process.argv[3] === undefined) {
    Person.find({}).then(res => {
        console.log(`Phonebook`);
        console.log(res);
        process.exit(1);
        mongoose.connection.close();
    })
} else {
    const name = process.argv[3];
    const number = process.argv[4];
    const person = new Person({
        name: name,
        number: number,
    });

    person.save().then(res => {
        console.log(`Added ${res.name} number: ${res.number} to phonebook`);
        mongoose.connection.close();
    });
}
