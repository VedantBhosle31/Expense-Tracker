const express = require('express')
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient;
const app = express();


app.get('/', (req, res) => {
    res.send('put /students for list all students');
});

app.listen(3000, () => {
    console.log("App started at http://localhost:3000")
})
