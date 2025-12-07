import dotenv from "dotenv";
import express from "express";

dotenv.config()

const port = process.env.PORT ||3000;
const app = express();

app.use(express.json());

let teaData = [];
let nextId = 1;

// CREATE
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  return res.status(201).send(newTea);
});

// READ ALL
app.get("/teas", (req, res) => {
  // status should come before send
  return res.status(200).send(teaData);
});

// READ ONE
app.get("/teas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const tea = teaData.find(t => t.id === id);
  if (!tea) {
    return res.status(404).send("tea not found");
  }
  return res.status(200).send(tea); 
});

// UPDATE
app.put("/teas/:id", (req, res) => {
  // req.params is an object; use req.params.id
  const id = parseInt(req.params.id); 
  const tea = teaData.find(t => t.id === id);

  if (!tea) {
    return res.status(404).send("tea not found");
  }

  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;

  // use status(200).send(...), not send(200).send(...)
  return res.status(200).send(tea); 
});

// DELETE
app.delete("/teas/:id", (req, res) => {
  const id = parseInt(req.params.id); 
  const index = teaData.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).send("tea not found");
  }

  teaData.splice(index, 1);
  // 204 means "No Content" so usually no body
  return res.status(204).send(); 
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
