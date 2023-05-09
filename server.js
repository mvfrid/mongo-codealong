import express from "express";
import cors from "cors";
import mongoose from 'mongoose';

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/animals";
mongoose.connect("mongodb://127.0.0.1", { useNewUrlParser : true, useUnifiedTopology: true })
mongoose.Promise = Promise

const Author = mongoose.model('Author', {
  name: String
})

if (process.env.RESETDATABASE) {
  console.log('Resetting database!')

const seedDatabase = async () => {
  await Author.deleteMany()

  const tolkien = new Author({ name: "J.R.R.Tolkien" })
  await tolkien.save()

  const rowling = new Author({ name: "J.K.Rowling" })
  await rowling.save()

  console.log('Hello there sunshine')
  }
seedDatabase()
}

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

app.get("/authors", async (req, res) => {
  const authors = await Author.find()
  res.json(authors)
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
