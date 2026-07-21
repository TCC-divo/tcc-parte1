const express = require("express");
require("dotenv").config();
require("./config/database");

const app = express();

app.use(express.json());

const userRoutes = require("./routes/userRoutes");
app.use("/usuarios", userRoutes);

app.get("/", (req, res) => {
    res.send("Servidor funcionando!");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor iniciado!");
});