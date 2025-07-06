import express from "express";
import AuthorController from "../controllers/authorController.js";

const routes = express.Router();

// Define as rotas para os livros
routes.get("/authors", AuthorController.listAuthor);
routes.get("/authors/:id", AuthorController.findAuthorById);
routes.post("/authors", AuthorController.insertNewAuthor);
routes.put("/authors/:id", AuthorController.updateAuthor);
routes.delete("/authors/:id", AuthorController.deleteAuthor);

export default routes;
