const express = require("express");
const app = express();
const connectTodb = require("./backend/mongo/connectTodb");
const router = require("./backend/routes/route");
const notFound = require("./backend/middleware/notFound");
const errorHandler = require("./backend/middleware/errorHandler");

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/v1/task", router);

app.use(notFound);

app.use(errorHandler);

const start = async () => {
  try {
    await connectTodb();
    app.listen(4050, () => {
      console.log("server is awake on http://localhost:4050");
    });
  } catch (error) {
    console.log("server is not starting");
  }
};

start();
