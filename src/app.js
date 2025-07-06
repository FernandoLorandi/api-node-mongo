import express from "express";
import dbConnect from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import handler404 from "./middlewares/404Handler.js";

// Conectar ao banco de dados
const connection = await dbConnect();

// Configurar o tratamento de erros de conexão
connection.on("error", console.log.bind(console, "Erro de conexão"));

// Configurar o evento de conexão bem-sucedida
connection.once("open", () => {
    console.log("Conexão com o banco de dados estabelecida com sucesso");
});

// Importar o módulo express e criar uma instância do aplicativo
const app = express();
app.use(express.json());
routes(app);

app.use(handler404);

// Middleware para tratamento de erros
app.use(errorHandler)

export default app;