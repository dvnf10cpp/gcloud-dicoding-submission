const BookRepository = require('../repository/book_repository')
const BookService = require('../service/book_service')
const BookController = require('../controller/book_controller')

const bookRepo = new BookRepository()
const bookSvc = new BookService(bookRepo)
const bookCtr = new BookController(bookSvc)

const bookRoutes = [
    {
        method: 'GET',
        path: '/books',
        handler: bookCtr.fetchAll
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: bookCtr.fetchByID
    },
    {
        method: 'POST',
        path: '/books',
        handler: bookCtr.addBook
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: bookCtr.updateBook
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: bookCtr.deleteBook
    },
]

module.exports = bookRoutes