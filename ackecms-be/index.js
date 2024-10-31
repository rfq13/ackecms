require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const routes = require("./routes");
const cors = require("cors");

app.use(bodyParser.json());
const corsOptions = {
  origin: process.env.FE_URL,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO_URI);

app.use(routes);

const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
