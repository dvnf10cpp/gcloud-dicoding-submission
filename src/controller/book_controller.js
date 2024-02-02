class BookController {
    constructor(bookService) {
        this.bookSvc = bookService
    }

    fetchAll = (req, h) => {
        const { name, reading, finished } = req.query

        const query = {
            name, reading, finished 
        }

        const resp = this.bookSvc.getBooks(query)

        return this._createHapiResponse(h, resp)
    }

    fetchByID = (req, h) => {
        const { bookId } = req.params 

        const resp = this.bookSvc.getBookByID(bookId)

        return this._createHapiResponse(h, resp)
    }

    addBook = (req, h) => {
        const book = {...req.payload}

        const resp = this.bookSvc.saveBook(book)

        return this._createHapiResponse(h, resp)
    }

    updateBook = (req, h) => {
        const { bookId } = req.params
        const book = { ...req.payload }

        const resp = this.bookSvc.updateBook(bookId, book)

        return this._createHapiResponse(h, resp)
    }

    deleteBook = (req, h) => {
        const { bookId } = req.params

        const resp = this.bookSvc.removeBook(bookId)
        
        return this._createHapiResponse(h, resp)
    }

    _createHapiResponse = (h, resp) => {
        const { code } = resp 
        delete resp.code 
        const hresp = h.response(resp)
        hresp.code(code)

        return hresp
    }
}

module.exports = BookController