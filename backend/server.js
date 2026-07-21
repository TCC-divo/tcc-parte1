const express = require("express");
require("dotenv").config();
require("./config/database");

const app = express();

app.use(express.json());
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const solicitacaoRoutes = require("./routes/solicitacaoRoutes");

app.use("/solicitacoes", solicitacaoRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/usuarios", userRoutes);
app.use("/itens", itemRoutes);

app.get("/", (req, res) => {
    res.send("Servidor funcionando!");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor iniciado!");
});