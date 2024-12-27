const express = require('express')
const mongoose = require('mongoose')
require('dotenv/config')

const app = express()

const userRoute = require('./routes/user')

//Connect to db
mongoose.connect(
    process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.7://localhost:27017',
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