const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

// Logging
morgan.token('body', function getBody(req) {
    const body = req.body;
    const loggedBody = {
        "name": body.name,
        "number": body.number
    }
    return JSON.stringify(loggedBody)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'));

let persons = [
    {
        name: 'Peter Eck',
        number: '217-971-0290',
        id: 1
    },
    {
        name: 'Katie Hofer',
        number: '304-951-3849',
        id: 2
    },
    {
        name: 'Lynn Eck',
        number: '217-971-8478',
        id: 3
    },
    {
        name: 'John Eck',
        number: '217-899-0655',
        id: 4
    }
];

const generateId = () => {
    const id = Math.floor(Math.random() * 200000000000)
    return id;
}

// Home
app.get('/api/', (req, res) => {
    res.send('<h1>Home Page</h1>');
})

// People
app.get('/api/people', (req, res) => {
    res.send(persons);
})

// Persons
app.get('/api/people/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id)
    person
        ? res.send(person)
        : res.status(404).end()
})

// Add Person
app.post('/api/people/', (req, res) => {
    const body = req.body;
    if (!body.name) {
        return res.status(400).json({
            error: 'name missing'
        })
    }
    if (!body.number) {
        return res.status(400).json({
            error: 'number missing'
        })
    }
    if (persons.map(person => person.name).includes(body.name)) {
        return res.status(400).json({
            error: 'name already in phone book'
        })
    }
    if (persons.map(person => person.number).includes(body.number)) {
        return res.status(400).json({
            error: 'number already in phone book'
        })
    }
    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = [...persons, person];
    res.json(person);
})

// Delete Person
app.delete('/api/people/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);
    res.status(204).end();
})

const PORT = process.env.PORT || 3000
// Listen
app.listen(PORT, (req, res) => {
    console.log(`Listening on port ${PORT}`);
})
