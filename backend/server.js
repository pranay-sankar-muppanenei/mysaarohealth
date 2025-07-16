require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {
  PORT,
} = require('./config/config');

const dbConnection = require('./config/db.js');
dbConnection();

const publicPath = path.join(__dirname, 'public');
app.use('/public', express.static(publicPath)); 

const indexRoutes = require('./routes/index.routes');
app.use('/api', indexRoutes);



app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});


