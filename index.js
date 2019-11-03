require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const Person = require('./models/person.js');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());

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
    },
    {
        name: 'Ryan Eck',
        number: '217-971-9661',
        id: 5
    }
];

const generateId = () => {
    const id = Math.floor(Math.random() * 200000000000)
    return id;
}

// CLIENT //

// Home
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/build/index.html")
})

// Info
app.get('/info', (req, res) => {
    const date = new Date()
    const numOfPersons = persons.length;
    const message = `
        Phonebook has info for ${ numOfPersons } people 
        \n 
        fetched on: ${ date }
    `
    res.send(message);
})

// API //

// persons
app.get('/api/persons', (req, res) => {
    Person
        .find({})
        .then(persons => {
            res.json(persons.map(person => person.toJSON()))
        })
        .catch(e => console.warn(`ERROR FETCHING DATA ${ e }`))
})

// Person
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);
    person ? res.json(person) : res.status(404).end();
})

// Add Person
app.post('/api/persons/', (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            error: 'Missing fields'
        })
    } else if (persons.includes(body.name)) {
        return res.status(400).json({
            error: 'Name already in phonebook'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }
    persons = [ ...persons, person ];
    res.json(person);
})

// Delete Person
app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    persons = persons.filter(person => person.id !== id);
    res.status(204).end();
})

const PORT = process.env.PORT || 3001;
// Listen
app.listen(PORT, (req, res) => {
    console.log(`Listening on port ${ PORT }`);
})
