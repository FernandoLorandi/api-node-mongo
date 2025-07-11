import {author} from "../models/index.js";
import NotFoundError from "../error/notFound.js";

class AuthorController {
    // Metodo para buscar todos os autores
    static async listAuthor(req, res, next) {
        try {
            const listAuthors = author.find();
            req.result = listAuthors;
            next()
        } catch (err) {
            next(err);
        }
    }

    static async findAuthorById(req, res, next) {
        try {
            const findAuthor = await author.findById(req.params.id);
            if (findAuthor !== null) {
                res.status(200).json({message: "Author found", author: findAuthor});
            } else {
                next(new NotFoundError("Author not found"));
            }
        } catch (err) {
            next(err);
        }
    }

    static async insertNewAuthor(req, res, next) {
        try {
            const newAuthor = await author.create(req.body);
            res.status(201).json({message: "New author add", author: newAuthor});
        } catch (err) {
            next(err);
        }
    }

    static async updateAuthor(req, res, next) {
        try {
            const id = req.params.id;
            const modified = await author.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            res
                .status(201)
                .json({message: "Success book modified", author: modified});
        } catch (err) {
            next(err);
        }
    }

    static async deleteAuthor(req, res, next) {
        try {
            const id = req.params.id;
            await author.findByIdAndDelete(id);
            res.status(200).json({message: "Author removed"});
        } catch (err) {
            next(err);
        }
    }
}

export default AuthorController;