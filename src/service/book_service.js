const { nanoid } = require('nanoid')

class BookService {
    constructor(bookRepository) {
        this.bookRepo = bookRepository
    }

    getBooks = (query) => {
        const resp = this.bookRepo.getBooks(query)

        return resp
    }

    getBookByID = (id) => {
        const resp = this.bookRepo.getBookByID(id)

        return resp
    }

    saveBook = (payload) => {
        const result = this._validateBook(payload, 'menambahkan')

        if (typeof result === 'object') {
            return result 
        }

        const currentTimeAt = new Date().toISOString()

        const book = {
            id: nanoid(16),
            ...payload,
            finished: payload.readPage === payload.pageCount,
            insertedAt: currentTimeAt,
            updatedAt: currentTimeAt
        }

        const resp = this.bookRepo.saveBook(book)

        return resp
    }

    updateBook = (id, payload) => {
        const result = this._validateBook(payload, 'memperbarui')

        if (typeof result === 'object') {
            return result 
        }

        const currentTimeAt = new Date().toISOString()


        const updatedBook = {
            id,
            ...payload,
            updatedAt: currentTimeAt
        }

        const resp = this.bookRepo.updateBook(updatedBook)

        return resp 
    }

    removeBook = (id) => {
        const resp = this.bookRepo.removeBook(id)

        return resp
    }

    _validateBook = (payload, event) => {
        const { name, readPage, pageCount } = payload

        if (!name) {
            return {
                status: 'fail',
                code: 400,
                message: `Gagal ${event} buku. Mohon isi nama buku`
            }
        }

        if (readPage > pageCount) {
            return {
                status: 'fail',
                code: 400,
                message: `Gagal ${event} buku. readPage tidak boleh lebih besar dari pageCount`
            }
        }

        return true
    }
}

module.exports = BookService