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
    
    if (userData['name'] && userData['bio']) {
        Users.insert(userData)
            .then(user => {
                res.status(201).json(user) 
            })
            .catch(error => {
                res.status(500).json({ errorMessage: 'error creating user'})
            })
    } else {
        res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' })
    }
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

    if (id) {
        Users.find(id)
            .then(user => {
                res.status(200).json(user)
            })
            .catch(err => {
                res.status(500).json({ errorMessage: "The user could not be removed" })
            })
    } else {
        res.status(404).json({ errorMessage: "The user with the specified ID does not exist." })
    }
})

// DELETE, remove a user by id
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id
    
    if (id) {
    Users.remove(id)
        .then(deleted => {
            res.status(200).json(deleted)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'error deleting user' })
        })
    } else {
        res.status(404).json({ errorMessage: "The user with the specified ID does not exist." })
    }
})

// PUT, update a user by id
server.put('/api/users/:id', (req, res) => {
    const id = req.params.id

    if (id) {
        if (userData['name'] && userData['bio']) {
            Users.update(id)
                .then(updated => {
                    res.status(200).json(updated)
                })
                .catch(err => {
                    res.status(500).json({ errorMessage: "The user information could not be modified." })
                })
            } else {
                res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
            }
    } else {
        res.status(404).json({ errorMessage: "The user with the specified ID does not exist." })
    }
})