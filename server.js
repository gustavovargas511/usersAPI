const express = require("express");
const cors = require("cors"); // Import the cors package
require("dotenv").config();
const connectDB = require("./config/db");

connectDB();

const port = process.env.PORT || 5000;

/** Routers */
const usersRouter = require("./routes/users");
/********** */

const app = express();

/** Use cors middleware */
app.use(cors());

/**Body parser middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**Main page */
app.get("/", (req, res) => {
  res.send({
    success: true,
    data: {
      message: "Welcome to users API",
    },
  });
});

/** users routes */
app.use("/api/users", usersRouter);
/*************** */

app.listen(port, () => console.log(`Server listening on port: ${port}`));
