const express = require('express')
const cors = require('cors')


const app = express()

let todos = [
    { user: 'Dima', id: 1 },
    { user: 'Pasha', id: 2 },
    { user: 'Anton', id: 3 },
]

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send(todos)
})

app.get('/:id', (req, res) => {
    const id = +req.params.id
    const todo = todos.find(item => item.id === id)

    res.send(todo)
})

app.get('/lala', (req, res) => {
    console.log('ALLALALAAL')
    res.send('ДАРОВА')
})

app.put('/:id', (req, res) => {
    const id = +req.params.id
    todos = todos.map(item => item.id === id ? {...item, ...req.body} : item)

    res.send('OOOOKKEEEEEEYYY')
})

app.delete('/:id', (req, res) => {
    const id = +req.params.id
    todos = todos.filter(item => item.id !== id)

    res.send('OOOOKKEEEEEEYYY')
})

app.post('/', (req, res) => {
    const newTodo = { ...req.body, id: Math.floor(Math.random() * 100) }

    todos.push(newTodo)
    res.send(todos)
})

app.listen(3000, () => {
    console.log('start my server')
})