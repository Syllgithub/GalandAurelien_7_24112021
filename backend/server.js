require("dotenv").config(); // Variables d'environnement

const express = require("express");
const app = express();
const path = require("path");

// Autorisation CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Middleware
app.use(express.json()); // Pour les corps de requête en JSON
app.use("/images", express.static(path.join(__dirname, "images"))); // Chemin des images pour multer

// Création des différentes routes
app.use("/", require("./routes/userRoutes"));
app.use("/posts", require("./routes/postsRoutes"));
app.use("/comments", require("./routes/commentsRoutes"));

// Gestion des erreurs du serveur
app.use((err, req, res, next) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);

  res.status(500).json({
    message: "Something went wrong",
  });
});

// Configuration du port d'écoute pour le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
