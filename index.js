require('dotenv').config()
const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");
const cors = require("cors");
const notesRoutes = require("./routes/notes");
const client = require("./config/db")

const port = process.env.PORT || 8000;

//Middlewares
app.use(express.json());
app.use(cors());
app.use("/auth", authRoutes);
app.use("/note", notesRoutes);
client.connect(() => {
    console.log("Connected database")
})
app.get("/", (req, res) => {
    res.send("Server is up and running");
})
app.listen(port, () => {
    console.log("Server at 8000");
})