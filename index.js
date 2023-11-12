require("dotenv").config();
const express = require("express");

const userRouter = require("./routes/userRoute");
const app = express();
const PORT = 6600 || process.env.PORT;

const connectDatabase = require("./DB/config");
app.use(express.json());
app.use("/user", userRouter);

connectDatabase();

app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT} ✅ ✅ `);
});
