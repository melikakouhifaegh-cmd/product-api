require("dotenv").config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const express = require("express");
const connectDB = require("./config/db");
const requestLogger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const productRoutes = require("./routes/productRoutes");

const app = express();

connectDB();

app.use(express.json());
app.use(requestLogger);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Product API is running" });
});

app.use("/api/products", productRoutes);

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
