const express = require('express');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const notesRoute = require('./routes/note');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require("path");

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

/* enable CORS */
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin","*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization, User-Agent");
    //res.header("Access-Control-Allow-Methods: GET, POST");
    // next();
// });

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/notes", notesRoute);

// child folder static
app.use(express.static(path.join(__dirname, "/todosite_client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/todosite_client/build', 'index.html'));
});


app.listen( process.env.SERVE_PORT || 5000, () => {
    console.log("server is running!!");
});