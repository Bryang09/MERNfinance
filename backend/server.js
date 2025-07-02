require("dotenv").config();
const mongoose = require("mongoose");
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/user");

const express = require("express");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/", usersRoutes);
app.use("/api/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Connected to db & listening on port ${process.env.PORT}`);
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("listen on port", process.env.PORT);
});
