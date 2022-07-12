const express = require('express');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const notesRoute = require('./routes/note');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();

dotenv.config();

mongoose.connect(
    process.env.MONGO_CONNECT_STR
)
.then(() => console.log("db connected.."))
.catch((error) => {
    console.log(error)
    console.log("failed db connection..")
})


app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/notes", notesRoute);


app.listen( process.env.SERVE_PORT || 5000, () => {
    console.log("server is running!!");
});