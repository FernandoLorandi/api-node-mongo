import { author } from "../models/Author.js";

class AuthorController {
  // Método para buscar todos os livros
  static async listAuthor(req, res) {
    try {
      const listAuthors = await author.find();
      res.status(200).json(listAuthors);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving authors", error });
    }
  }

  static async findAuthorById(req, res) {
    try {
      const findAuthor = await author.findById(req.params.id);
      res.status(200).json({ message: "Author found", author: findAuthor });
    } catch (error) {
      res.status(500).json({ message: "Author not found", error });
    }
  }

  static async insertNewAuthor(req, res) {
    try {
      const newAuthor = await author.create(req.body);
      res.status(201).json({ message: "New author add", author: newAuthor });
    } catch (error) {
      res.status(500).json({ message: "Error inserting new author", error });
    }
  }

  static async updateAuthor(req, res) {
    try {
      const id = req.params.id;
      const modified = await author.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res
        .status(201)
        .json({ message: "Succes book modified", author: modified });
    } catch (error) {
      res.status(500).json({ message: "Error book not modified", error });
    }
  }

  static async deleteAuthor(req, res) {
    try {
      const id = req.params.id;
      await author.findByIdAndDelete(id);
      res.status(200).json({ message: "Author removed" });
    } catch (error) {
      res.status(500).json({ message: "Error remove book", error });
    }
  }
}

export default AuthorController;
