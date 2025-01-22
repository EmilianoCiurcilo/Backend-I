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
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static("public"));

app.use(
    session({
        secret: "ClaveSecreta",
        resave: true,
        saveUninitialized: true,
    }),
);

initializedPassport();
app.use(cookieParser());

app.use("/api", routes);

app.use("/", viewsRoutes);

const httpServer = app.listen(PORT, () => {
    console.log(`Ejecutándose en http://localhost:${PORT}`);
});

export const io = new Server(httpServer);

io.on("connection", (socket) => {
    console.log("Nuevo usuario Conectado");
});