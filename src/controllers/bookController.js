import {author, book} from "../models/index.js";
import NotFoundError from "../error/notFound.js";

class BookController {
    static async listBooks(req, res, next) {
        try {
            const searchBooks = book.find();
            req.result = searchBooks;
            next()
        } catch (err) {
            next(err);
        }
    }

    static async findBookById(req, res, next) {
        try {
            const findBook = await book.findById(req.params.id);
            if (findBook !== null) {
                res.status(200).json({message: "Book found", book: findBook});
            } else {
                next(new NotFoundError("Book not found"));
            }
        } catch (err) {
            next(err);
        }
    }

    static async listBooksByFilter(req, res, next) {
        try {
            const searchCriteria = await processSearchCriteria(req.query);
            if (searchCriteria !== null) {
                const booksByFilter = book.find(searchCriteria).populate("autor");
                req.result = booksByFilter;
                next()
            } else {
                res.status(200).send([]);
            }
        } catch (err) {
            next(err);
        }
    }

    static async insertNewBook(req, res, next) {
        try {
            const newBook = await book.create(req.body);
            res.status(201).json({message: "Book create", book: newBook});
        } catch (err) {
            next(err);
        }
    }

    static async updateBook(req, res, next) {
        try {
            const id = req.params.id;
            const modified = await book.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            res.status(201).json({message: "Success book modified", book: modified});
        } catch (err) {
            next(err);
        }
    }

    static async deleteBook(req, res, next) {
        try {
            const id = req.params.id;
            await book.findByIdAndDelete(id);
            res.status(200).json({message: "Livro excluído com sucesso"});
        } catch (err) {
            next(err);
        }
    }
}

async function processSearchCriteria(params) {
    const {title, publisher, minPages, maxPages, authorName} = params;

    let searchCriteria = {};
    if (title) searchCriteria.titulo = {$regex: title, $options: "i"}; // Case-insensitive search
    if (publisher) searchCriteria.editora = {$regex: publisher, $options: "i"}; // Case-insensitive search

    if (minPages || maxPages) searchCriteria.paginas = {}; // Initialize paginas object if min or max pages are provided
    if (minPages) searchCriteria.paginas.$gte = minPages //Greater than or equal to minPages
    if (maxPages) searchCriteria.paginas.$lte = maxPages; //Less than or equal to maxPages

    if (authorName) {
        const searchAuthor = await author.findOne({nome: authorName});
        if (author !== null) {
            searchCriteria.autor = searchAuthor._id
        } else {
            searchCriteria = null;
        }
    }
    return searchCriteria
}

export default BookController;