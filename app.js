require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./database/db');
const authRoutes = require('./routes/auth-routes');
const homeRoutes = require('./routes/home-routes');
const adminRoutes = require('./routes/admin-routes');

// MongoDB Connection
connectDB();

// Middlewares 
app.use(express.json()); // To parse JSON request bodies

// Routes
app.use('/api/auth/', authRoutes);
app.use('/api/home/', homeRoutes);
app.use('/api/admin/', adminRoutes);

app.get("/", (req, res) => { res.send("Hello World!"); });

// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});