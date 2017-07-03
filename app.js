const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/static", express.static("public"));

app.set("view engine", "pug");

const routes = require("./routes");

app.use(routes);

app.listen(443, () => {
    console.log("127.0.0.1:443");
});