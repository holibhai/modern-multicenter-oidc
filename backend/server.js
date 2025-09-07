require("dotenv").config();
const fs = require("fs");
const https = require("https");
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const xss = require("xss-clean");
const morgan = require("morgan");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const { jwtCheck } = require("./auth");
const ordersRouter = require("./routes/orders");
const config = require("../config/default.json");

const app = express();


app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "data:", "https:"],
    },
  },
}));
app.use(cors(config.security.cors));
app.use(rateLimit(config.security.rateLimit));
app.use(hpp());
app.use(xss());
app.disable("x-powered-by");
app.use(compression());
app.use(morgan("combined"));
app.use(cookieParser());


app.use(express.json({ limit: "100kb" })); 
app.use(express.urlencoded({ extended: false }));



app.use(jwtCheck);              
app.use("/api/orders", ordersRouter);


app.use((err, req, res, _next) => {
  console.error(err);
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ error: "Invalid token" });
  }
  res.status(400).json({ error: err.message || "Bad request" });
});

(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const key = fs.readFileSync(process.env.SSL_KEY);
  const cert = fs.readFileSync(process.env.SSL_CERT);

  https.createServer({ key, cert }, app).listen(process.env.PORT, () => {
    console.log(`HTTPS API running on https://localhost:${process.env.PORT}`);
  });
})();
