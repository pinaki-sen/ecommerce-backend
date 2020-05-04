require('dotenv').config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//My Routes
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");
const categoryRoutes = require("./routes/category.js");
const productRoutes = require("./routes/product.js");
const orderRoutes = require("./routes/order.js");


// DB connection
mongoose.connect(process.env.MONGODB_URI || process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED");
});

// Dummy test
app.get('/',  (req, res) =>  {
    res.json({
        message: "Hello World"
    });
});


// Middlewire
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());



//My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);



//Port
const port = process.env.PORT || 8000;



//Starting a Server
app.listen(port, () => {
    console.log(`app is running at ${port}`);
});
