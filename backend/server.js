const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

//Connect to database
connectDB();

const app = express();

//get data from the body?
app.use(express.json()); //allows us to send raw json
app.use(express.urlencoded({ extended: false })); //accepts urlencoded form

app.get('/', (req, res) => {
  res.status(201).json({ message: 'Welcome to the Support Desk API' });
});

//Routes
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
