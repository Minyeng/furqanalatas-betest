const express = require('express')
const mongoose = require('mongoose')
require('dotenv/config')

const app = express()

const userRoute = require('./routes/user')

//Connect to db
mongoose.connect(
    process.env.DATABASE_URL || 'mongodb+srv://root:12345@db-furqanalatas-betest.xfyh8ij.mongodb.net/db-furqanalatas-betest',
    () => console.log('DB connected')
);

app.use(express.json())
app.use('/api/user/', userRoute);
app.get('/', (req, res) => {
    res.send('Welcome!')
})

app.listen(process.env.PORT || 5000, () => {
    console.log('Success')
})