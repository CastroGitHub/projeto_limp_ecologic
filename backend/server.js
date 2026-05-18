require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());



// CADASTRO
app.post("/register", async (req, res) => {
  const { nome, email, senha } = req.body;

  const hash = await bcrypt.hash(senha, 10);

  const sql =
    "INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)";

  db.query(sql, [nome, email, hash], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Erro");
    }

    res.send("Usuário criado");
  });
});



// LOGIN
app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, data) => {
    if (err) {
      return res.send("Erro");
    }

    if (data.length === 0) {
      return res.send("Usuário não encontrado");
    }

    const user = data[0];

    const validPassword = await bcrypt.compare(
      senha,
      user.senha
    );

    if (!validPassword) {
      return res.send("Senha errada");
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET
    );

    res.json({
      token,
      user,
    });
  });
});



app.listen(3333, "0.0.0.0", () => {
  console.log("Servidor rodando");
});