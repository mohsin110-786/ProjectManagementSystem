const express = require("express");
const dotenv = require("dotenv");  
const userRouters = require ("./routes/userRoutes.js");
const cors = require("cors");
dotenv.config();
const connectDB = require("./config/database");

connectDB();   

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users" , userRouters);

app.get("/", (req, res) => {
    res.send("Project Management System API is running");
});
// Feature update practice
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});