import mongoose from "mongoose";
import { authorSchema } from "./Author.js";

const bookSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    titulo: {
      type: String,
      required: true,
    },
    editora: {
      type: String,
    },
    preco: {
      type: Number,
    },
    paginas: {
      type: Number,
    },
    autor: { type: mongoose.Schema.Types.ObjectId, ref: "authors" },
  },
  { versionKey: false }
);

const book = mongoose.model("book", bookSchema);

export default book;
