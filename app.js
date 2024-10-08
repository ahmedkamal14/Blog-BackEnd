const express = require("express");
const dotenv = require("dotenv");
const { connectDb } = require("./db/connect.js");
const { authRouter } = require("./routes/auth.js");
const { blogRouter } = require("./routes/blog.js");
const { uploadsRouter } = require("./routes/uploads.js");

//Testing Html Files
const path = require("path");

const app = express();

// Authorization MW
const { protect } = require("./middleware/authorization.js");

// Security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");

// Security MW
const allowedDomains = [
  "http://localhost:5173", // Dev team domain
  "https://ahmedkamal14.github.io", // Actual production domain
];

// Configure CORS
app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedDomains.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    optionsSuccessStatus: 200,
  })
);

// Ensure OPTIONS requests are handled
app.options(
  "*",
  cors({
    origin: allowedDomains,
  })
);

app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(helmet());

app.use(xss());

dotenv.config();

// Home Page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// PORT
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;

// Parse Json MW
app.use(express.json());

// Auth Route
app.use("/api/v1/auth", authRouter);

// Blog Route
app.use("/api/v1/blogs", protect, blogRouter);

// Uploads Route
app.use("/api/v1/uploads", protect, uploadsRouter);

const start = async () => {
  try {
    // eslint-disable-next-line no-undef
    await connectDb(process.env.VITE_MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
