import express from "express";
import BookController from "../controllers/bookController.js";

const routes = express.Router();

// Define as rotas para os livros
routes.get("/books", BookController.listBooks);
routes.get("/books/search", BookController.listBooksByPublisher);
routes.get("/books/:id", BookController.findBookById);
routes.post("/books", BookController.insertNewBook);
routes.put("/books/:id", BookController.updateBook);
routes.delete("/books/:id", BookController.deleteBook);

export default routes;
