require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./database/db');
const authRoutes = require('./routes/auth-routes');

// MongoDB Connection
connectDB();

// Middlewares 
app.use(express.json()); // To parse JSON request bodies

// Routes
app.use('/api/auth/', authRoutes);

app.get("/", (req, res) => { res.send("Hello World!"); });

// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});