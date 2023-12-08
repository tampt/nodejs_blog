const path = require('path');
const express = require('express');
const morgan = require('morgan');
//const handlebars = require('express-handlebars');
const { engine } = require('express-handlebars');

const route = require('./routes');
const db = require('./config/db');

db.connect();

const app = express();
const port = 3000;

// Hiển thị hình ảnh
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// HTTP Loggers
// app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
