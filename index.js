require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const Person = require('./models/person');

// Configure App
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

/////////////
//// API ////
/////////////


// persons
app.get('/api/persons/', (req, res) => {
    Person
        .find({})
        .then(persons => {
            res.json(persons.map(person => person.toJSON()))
        })
        .catch(e => console.warn(`ERROR FETCHING DATA ${ e.message }`))
})

// Person
app.get('/api/persons/:id', (req, res, next) => {
    Person
        .findById(req.params.id)
        .then(person => person ? res.json(person.toJSON()) : res.status(404).end())
        .catch(e => next(e))
})

// Update Person
app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body;

    const person = {
        name: body.name,
        number: body.number
    }

    Person
        .findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => res.json(updatedPerson.toJSON()))
        .catch(e => next(e))
})

// Add Person
app.post('/api/persons/', (req, res, next) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            error: 'Missing fields'
        })
    }
    const person = new Person({
        name: body.name,
        number: body.number,
    });

    person
        .save()
        .then(savedPerson => {
            res.json(person);
        })
})

// Delete Person
app.delete('/api/persons/:id', (req, res, next) => {
    Person
        .findByIdAndRemove(req.params.id)
        .then(removedPerson => {
            res.status(204).end();
        })
        .catch(e => next(e))
})


const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
    console.log(error.message);
    if (error.name === 'CastError' && error.kind === 'ObjectID') {
        return res.status(404).send({ error: 'Malformatted ID' })
    }

    next(error);
}

app.use(errorHandler);

// Listen
const PORT = process.env.PORT || 3001;

app.listen(PORT, (req, res) => {
    console.log(`Listening on port ${ PORT }`);
})
