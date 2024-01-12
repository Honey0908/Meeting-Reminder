var express = require('express');
const config = require('./config');
const cors = require('cors');
// const bodyParser = require('body-parser');
const router = require('./src/router')


var app = express();
const port = config.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/', router);

app.listen(port, () => {
    console.log('Server is running on port:', port);
});
