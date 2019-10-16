const mongoose = require('mongoose');

const password = process.argv[2];

// Fix issue with Mongo saving an undefined entry when no name or number is given



if(process.argv[3] === undefined) {
    Person.find({}).then(res => {
        console.log(`Phonebook`);
        res.forEach(person => {
            console.log(`${person.name} --- ${person.number}`)
        })
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
