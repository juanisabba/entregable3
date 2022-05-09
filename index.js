const express = require("express");
const Contenedor = require("./entregable2");
const app = express();

const PORT = 8080;
app.get("/productos", async (req, res) => {
  const contenedor = new Contenedor("./productos.json");
  let productos = await contenedor.getAll();
  res.send(productos);
});

app.get("/productoRandom", async (req, res) => {
  const contenedor = new Contenedor("./productos.json");
  let productos = await contenedor.getAll();
  let randomProduct = Math.floor(Math.random() * productos.length);
  res.send(productos[randomProduct]);
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
