const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routers/auth.js");
const serviceRoutes = require("./routers/service.js");
const bookingRouters = require("./routers/booking.js");
const quoteRouters = require("./routers/quote.js");
const userRouters = require("./routers/userRouter.js")
 
dotenv.config();
const app = express();

// Connection to DB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("err", err);
    process.exit(1);
  });

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Routes Middlewares
app.use("/api", authRoutes);
app.use("/api", serviceRoutes);
app.use("/api", bookingRouters);
app.use('/api', quoteRouters);
app.use('/api', userRouters);

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
