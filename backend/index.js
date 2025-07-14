const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./Models/db');

const app = express();
const userRoute = require('./Routes/userRoute');
const swapRequestRoute = require('./Routes/SwapRequestRoute');

app.use(cors({
  origin: ['http://localhost:3000',"https://skillswap1234.netlify.app/"],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use('/api/users', userRoute);
app.use('/api/swaps', swapRequestRoute);

const port = process.env.PORT || 5000;

app.use('/', (req, res) => {
  res.send('Hello world from backend');
});
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});