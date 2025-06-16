import book from "../models/Book.js";

class BookController {
  // Método para buscar todos os livros
  static async listBooks(req, res) {
    try {
      const listBooks = await book.find({}).populate("autor").exec();
      res.status(200).json(listBooks);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving books", error });
    }
  }

  static async findBookById(req, res) {
    try {
      const findBook = await book.findById(req.params.id);
      res.status(200).json({ message: "Book found", book: findBook });
    } catch (error) {
      res.status(500).json({ message: "Book not found", error });
    }
  }

  static async listBooksByPublisher(req, res) {
    const publisher = req.query.publisher;
    try {
      const booksByPublisher = await book.find({ editora: publisher });
      res.status(200).json(booksByPublisher);
    } catch (error) {
      res.status(500).json({ message: "Publisher not found", error });
    }
  }

  static async insertNewBook(req, res) {
    try {
      const newBook = await book.create(req.body);
      res.status(201).json({ message: "Book create", book: newBook });
    } catch (error) {
      res.status(500).json({ message: "Error inserting book", error });
    }
  }

  static async updateBook(req, res) {
    try {
      const id = req.params.id;
      const modified = await book.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(201).json({ message: "Succes book modified", book: modified });
    } catch (error) {
      res.status(500).json({ message: "Error book not modified", error });
    }
  }

  static async deleteBook(req, res) {
    try {
      const id = req.params.id;
      await ook.findByIdAndDelete(id);
      res.status(200).json({ message: "Livro excluído com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Error remove book", error });
    }
  }
}

export default BookController;
