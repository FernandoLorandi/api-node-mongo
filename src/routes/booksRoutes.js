import express from "express";
import BookController from "../controllers/bookController.js";
import pagination from "../middlewares/pagination.js";

const routes = express.Router();

// Define as rotas para os livros
routes.get("/books", BookController.listBooks, pagination);
routes.get("/books/search", BookController.listBooksByFilter, pagination);
routes.get("/books/:id", BookController.findBookById);
routes.post("/books", BookController.insertNewBook);
routes.put("/books/:id", BookController.updateBook);
routes.delete("/books/:id", BookController.deleteBook);

export default routes;