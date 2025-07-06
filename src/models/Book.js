import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        titulo: {
            type: String,
            required: [true, 'O título do livro é obrigatório'],
        },
        editora: {
            type: String,
            required: [true, 'O nome da editora é obrigatório'],
            enum: {
                values: ["Casa do código", "Alura"],
                message: "A editora deve ser uma das opções: Casa do código ou Alura"
            }
        },
        preco: {
            type: Number,
        },
        paginas: {
            type: Number,
            min: [10, 'O número mínimo de páginas é 10'],
            max: [5000, 'O número máximo de páginas é 5000'],
        },
        autor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "authors",
            required: [true, 'O campos autor(a) é obrigatório']
        },
    },
    {versionKey: false}
);

const book = mongoose.model("book", bookSchema);

export default book;