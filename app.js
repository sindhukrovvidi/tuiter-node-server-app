import express from "express";
import cors from "cors";
import HelloController from "./controllers/hello-controller.js";
import UserController from "./users/users-controller.js";
import TuitsController from "./controllers/tuits/tuits-controller.js";
import session from "express-session";
import AuthController from "./users/auth-controller.js";
import mongoose from "mongoose";


const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/tuiter'
mongoose.connect('mongodb+srv://Cluster35123:XkZFfklxSVhS@cluster35123.3qi5xab.mongodb.net/tuiter?retryWrites=true&w=majority');

const app = express();
app.use(
  session({
    secret: "any string",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.json());

app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:3000",
    "https://a5--sindhu-tuiter-app.netlify.app",
    "https://a6--sindhu-tuiter-app.netlify.app",
    "https://tuiter-node-server-app-vltx.onrender.com/api",
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, DELETE, PATCH, OPTIONS"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  next();
});

HelloController(app);
UserController(app);
TuitsController(app);
AuthController(app);
const port = process.env.PORT || 4000;

app.listen(port);
