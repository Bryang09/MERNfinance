require("dotenv").config();
const usersRoutes = require("./routes/users");

const express = require("express");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/", usersRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("listen on port", process.env.PORT);
});
