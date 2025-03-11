// require("dotenv").config();
// const express = require("express");
// const helmet = require("helmet");
// const path = require("path");
// const axios = require("axios"); // Para fazer requisições HTTP
// const app = express();

// // Usando Helmet para aplicar a política de segurança CSP
// app.use(helmet());

// // Definindo Content Security Policy (CSP) personalizada
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"], // Apenas a origem do próprio servidor
//       scriptSrc: ["'self'", "'unsafe-inline'"], // Permite scripts da mesma origem e inline
//       scriptSrcAttr: ["'self'", "'unsafe-inline'"], // Permite event handlers inline
//       styleSrc: ["'self'", "'unsafe-inline'"], // Permite inline styles, se necessário
//       imgSrc: ["'self'", "data:"], // Permite imagens da mesma origem e imagens base64
//       fontSrc: ["'self'"], // Permite fontes da mesma origem
//       connectSrc: ["'self'"], // Permite conexões com a mesma origem
//       objectSrc: ["'none'"], // Bloqueia objetos externos
//       upgradeInsecureRequests: [], // Força a utilização de HTTPS (se necessário)
//     },
//   })
// );

// // Servindo arquivos estáticos (CSS, JS, etc.)
// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.json()); // Para aceitar JSON no corpo das requisições

// // Passando a chave de API de forma segura ao front-end
// app.get("/api-key", (req, res) => {
//   const apiKey = process.env.OPENAI_API_KEY;
//   console.log("Chave da API no servidor:", apiKey); // Adicionando log para verificar a chave
//   if (!apiKey) {
//     return res
//       .status(500)
//       .json({ error: "Chave da API não encontrada no ambiente" });
//   }
//   res.json({ apiKey });
// });

// // Rota para o endpoint /chat, que vai chamar a API do OpenAI
// app.post("/chat", async (req, res) => {
//   const userMessage = req.body.message;
//   const apiKey = process.env.OPENAI_API_KEY;

//   const response = await fetch("https://api.openai.com/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${apiKey}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: userMessage }],
//     }),
//   });

//   const data = await response.json();
//   res.json(data);
// });

// // Rota principal (index.html com a referência para o CSS e o JS)
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

// // Iniciando o servidor na porta 3000
// app.listen(3000, () => {
//   console.log("Servidor rodando na porta 3000");
// });
