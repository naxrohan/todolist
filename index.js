const express = require('express');
const auth = require('./routes/auth');
const userRoute = require('./routes/user');
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
app.use("/api/auth", auth);
app.use("/api/users", userRoute);


app.listen( process.env.SERVE_PORT || 5000, () => {
    console.log("server is running!!");
});