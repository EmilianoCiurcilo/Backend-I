import express from "express";
import routes from "./router/index.js";
import __dirname from "./dirname.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import viewsRoutes from "./router/views.routes.js";
import { connectMongoDB } from "./config/mongoDB.config.js";
import session from "express-session";
import { initializedPassport } from "./config/passport.config.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 8080;

connectMongoDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", handlebars.engine()); // Inicia el motor del la plantilla
app.set("views", __dirname + "/views"); // Indicamos que ruta se encuentras las vistas
app.set("view engine", "handlebars"); // Indicamos con que motor vamos a utilizar las vistas
app.use(express.static("public"));

app.use(
    session({
        secret: "ClaveSecreta", // palabra secreta
        resave: true, // Mantiene la session activa, si esta en false la session se cierra
        saveUninitialized: true, // Guarda la session
    }),
);

initializedPassport();
app.use(cookieParser());

// Rutas de la api
app.use("/api", routes);

// Ruta de las vistas
app.use("/", viewsRoutes);

const httpServer = app.listen(PORT, () => {
    console.log(`Ejecutándose en http://localhost:${PORT}`);
});

// Configuramos socket
export const io = new Server(httpServer);

io.on("connection", (socket) => {
    console.log("Nuevo usuario Conectado");
});