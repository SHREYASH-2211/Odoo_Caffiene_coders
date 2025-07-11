const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./Models/db');

const app = express();
const userRoute = require('./Routes/userRoute');


app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use('/api/users', userRoute);

const port = process.env.PORT || 5000;

app.use('/', (req, res) => {
  res.send('Hello world from backend');
});
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});