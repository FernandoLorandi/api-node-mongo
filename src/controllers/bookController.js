import book from "../models/Book.js";
import NotFoundError from "../error/notFound.js";

class BookController {
    static async listBooks(req, res, next) {
        try {
            const listBooks = await book.find({}).populate("autor").exec();
            res.status(200).json(listBooks);
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

    static async listBooksByPublisher(req, res, next) {
        const publisher = req.query.publisher;
        try {
            const booksByPublisher = await book.find({editora: publisher});
            res.status(200).json(booksByPublisher);
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
            res.status(201).json({message: "Succes book modified", book: modified});
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

export default BookController;