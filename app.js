const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const session = require('express-session')
const mongoStore = require('connect-mongodb-session')(session)
const connectDB = require('./config/db')
const cors = require('cors')

dotenv.config()

connectDB()

const app = express()
app.use(cors())

const store = new mongoStore({
    collection: 'sessions',
    uri: process.env.MONGO_URI,


})




app.use(express.json());
app.use(express.urlencoded({extended: false}))


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    store
}))

app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`http://localhost:${PORT}`));
