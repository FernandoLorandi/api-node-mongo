import express from "express";
import dbConnect from "./config/dbConnect.js";
import routes from "./routes/index.js";

// Conectar ao banco de dados
const connection = await dbConnect();

// Configurar o tratamento de erros de conexão
connection.on("error", (erro) => {
  console.log("erro de conexão:", erro);
});

// Configurar o evento de conexão bem-sucedida
connection.once("open", () => {
  console.log("Conexão com o banco de dados estabelecida com sucesso");
});

// Importar o módulo express e criar uma instância do aplicativo
const app = express();
routes(app);

export default app;
