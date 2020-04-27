const express = require('express')
const {v4} = require('uuid')
const app = express()

let BOOKS_SCHEMA = {
    name: 'string',
    author: 'string',
    year: 'string',
    available: 'number'
}

let DB = [
    {name: 'Cosmos', author: 'Carl Sagan', year: '1980', available: 1, id: "1"},
    {name: 'Cosmos', author: 'Carl Sagan', year: '1980', available: 1, id: "2"}
]

app.use(express.json())

//POST (add book to library)
app.post('/books', (req, res) => {
    const newBook = {...req.body, id: v4()}
    DB.push(newBook)
    res.status(201).json(newBook)
})

//GET (list books)
app.get('/books', (req, res) => {
    res.status(200).json(DB)
})

//GET (list book)
app.get('/books/:id', (req, res) => {
    const idx = DB.findIndex(c => c.id === req.params.id)
    res.status(200).json(DB[idx])
})

//PUT (update book information)
app.put('/books/:id', (req, res) => {
    const idx = DB.findIndex(c => c.id === req.params.id)
    DB[idx] = {...req.body, id: req.params.id}
    res.json(DB[idx])
})

//DELETE (remove book from library)
app.delete('/books/:id', (req, res) => {
    DB = DB.filter(c => c.id !== req.params.id)
    res.status(200).json({message: "Book has been deleted"})
})

app.listen(4000, () => console.log("Server has been started on port 4000..."))
