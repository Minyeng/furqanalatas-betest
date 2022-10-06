const express = require('express')
const mongoose = require('mongoose')
require('dotenv/config')

const app = express()

const userRoute = require('./routes/user')

//Connect to db
mongoose.connect(
    process.env.DATABASE_URL, () => console.log('DB connected')
);

app.use(express.json())
app.use('/api/user/', userRoute);

app.listen(3000, () => {
    console.log('Success')
})