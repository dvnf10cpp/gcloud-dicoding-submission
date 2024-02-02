class BookRepository {
    
    constructor() {
        this.books = []
    }

    getBooks = (query) => {

        const filtered = this._filteredByQuery(query)

        const mappedBooks = filtered.map(book => {
            return {
                id: book.id,
                name: book.name,
                publisher: book.publisher
            }
        })

        return {
            status: 'success',
            code: 200,
            data: {
                books: mappedBooks
            }
        }
    }

    getBookByID = (id) => {
        const book = this.books.find(book => book.id === id)

        if (!book) {
            return {
                status: 'fail',
                code: 404,
                message: 'Buku tidak ditemukan'
            }
        }

        return {
            status: 'success',
            code: 200,
            data: {
                book
            }
        }
    }

    saveBook = (book) => {
        const prevLen = this.books.length

        this.books.push(book)

        if ( prevLen === this.books.length) {
            return {
                status: 'fail',
                code: 500,
                message: 'failed to save book'
            }
        }

        return {
            status: 'success',
            code: 201,
            message: "Buku berhasil ditambahkan",
            data: {
                bookId: book.id
            }
        }
    }

    updateBook = (book) => {
        const { id } = book 

        const index = this.books.findIndex(book => book.id === id)

        if (index == -1) {
            return {
                status: 'fail',
                code: 404,
                message: 'Gagal memperbarui buku. Id tidak ditemukan'
            }
        }

        const updatedBook = {
            ...this.books[index],
            ...book,
        }

        this.books[index] = updatedBook

        return {
            status: 'success',
            code: 200,
            message: 'Buku berhasil diperbarui'
        }
    }

    removeBook = (id) => {
        const prevLen = this.books.length

        const updatedData = [...this.books].filter(book => book.id !== id)

        if (prevLen === updatedData.length) {
            return {
                status: 'fail',
                code: 404,
                message: 'Buku gagal dihapus. Id tidak ditemukan'
            }
        }

        this.books = updatedData

        return {
            status: 'success',
            code: 200,
            message: 'Buku berhasil dihapus'
        }
    }

    _filteredByQuery = (query) => {
        const { name, reading, finished } = query 

        const tempBooks = [...this.books]
        let result = tempBooks

        if (name) {
            result = tempBooks.filter(book => {
                return book.name.toLowerCase().includes(name.toLowerCase())
            })
        }

        if (reading) {
            result = tempBooks.filter(book => {
                return book.reading === (parseInt(reading) === 0 ? false : true)
            })
        }

        if (finished) {
            result = tempBooks.filter(book => {
                return book.finished === (parseInt(finished) === 0 ? false : true)
            })
        }

        

        return result
    }
}

module.exports = BookRepository