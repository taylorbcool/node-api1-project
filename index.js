// implement your API here
const express = require('express');
const server = express();

const Users = require('./data/db');

server.use(express.json());

const port = 8000;
server.listen(port, () => console.log(`\n ** api on port ${port} **`))

// POST, create a user
server.post('/api/users', (req, res) => {
    const userData = req.body;

    Users.add(userData)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(error => {
            res.status(500).json({ errorMessage: 'error creating user'})
        })
})

// GET, returns list of users
server.get('/api/users', (req, res) => {

    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'error getting the list of users' })
        })
})

// GET, return a specific user by id
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id

    Users.find(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'error getting the user' })
        })
})

// DELETE, remove a user by id
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id

    Users.delete(id)
        .then(deleted => {
            res.status(200).json(deleted)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'error deleting user' })
        })
})

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id

    Users.put(id)
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'error updating user' })
        })
})