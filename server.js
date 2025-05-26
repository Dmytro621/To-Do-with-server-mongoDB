const express = require('express')
const cors = require('cors')


const app = express()

let todos = []

app.use(express.json())
app.use(cors())

app.get('/todo/', (req, res) => {
    console.log('ToDo added!')
    res.send(todos)
})

app.get('/todo/:id', (req, res) => {
    const id = +req.params.id
    const todo = todos.find(item => item.id === id)

    res.send(todo)
})

app.put('/todo/:id', (req, res) => {
    const id = +req.params.id
    todos = todos.map(item => item.id === id ? {...item, ...req.body} : item)

    res.send('To Do is edited')
})

app.post('/todo/', (req, res) => {
    const newTodo = { ...req.body, id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) }

    todos.push(newTodo)
    res.send(newTodo)
})

app.delete('/todo/:id', (req, res) => {
    const id = +req.params.id
    todos = todos.filter(item => item.id !== id)

    res.send('To Do is deleted')
})

app.listen(3000, () => {
    console.log('start my server')
})