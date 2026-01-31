require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require('cors')

const PORT = process.env.PORT || 8080;
connectDB();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use("/", require("./routes/userRoute"))
app.use("/recipe", require("./routes/recipeRoute"));

app.listen(PORT, () => {
    console.log(`App is listening to the port ${PORT}`);
});
