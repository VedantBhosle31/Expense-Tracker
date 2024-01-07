const express = require('express')
const bodyParser = require('body-parser');
const groups = require('./groups')
const transactions = require('./transactions')
const user = require('./user')

const app = express();


app.use('/', groups);
app.use('/', transactions);
app.use('/', user);
// Middleware to parse JSON requests
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log("App started at http://localhost:3000")
})
