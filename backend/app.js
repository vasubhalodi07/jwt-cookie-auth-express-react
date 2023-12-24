const express = require("express");
const app = express();

const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());

const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });

const dbconn = require("./config/dbconn");
dbconn();

const user = require("./router/user.route");
app.use("/api/user", user);

app.get("/", (req, res) => {
  res.send("server running!");
});

app.listen(process.env.PORT, (req, res) => {
  console.log("listen on port " + process.env.PORT);
});
