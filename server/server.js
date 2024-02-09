const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
app.use(cors());

app.use(express.json());
const connectDB = require('./config/ConnectDB');

//route
const userRoute = require('./routes/UserRoute');


app.use("/api/auth",userRoute);

app.get("/", (req, res) => {
	res.send("Hello World");
});


app.listen(process.env.PORT,  () => {
    console.log(`Listening on ${PORT}`);
    connectDB();
});

const PORT = process.env.PORT || 3001;