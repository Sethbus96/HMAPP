const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

/* Port setup*/
const PORT = process.env.PORT || 5000;

/* Cors Setup */
app.use(cors());
app.use(express.json());

/* import routes*/
const user = require("./routes/users/user");
const doctor = require("./routes/admin/doctor");
/* route middlewares */
app.use("/user", user);
app.use("/doctor", doctor);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/public"));
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/index.html"))
  );
}

mongoose.connect(
  "mongodb://localhost:27017/Hospital",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to database")
);

app.listen(PORT, () => console.log("server is started at port " + PORT));
