const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const connectDB = require("./config/db");

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

connectDB();

const testRoutes = require("./routes/testRoute");
const authRoutes = require("./routes/authRoute");
const userRoutes = require("./routes/userRoute");

app.use("/api", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


app.listen(PORT, () => {
    console.log(`DevCon server is running on port ${PORT}`);
});