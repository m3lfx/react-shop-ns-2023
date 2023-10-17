const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const cors = require('cors')
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({limit: "100mb", extended: true }));
app.use(cookieParser());

app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1', order);



module.exports = app