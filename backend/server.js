const express = require('express')
const cors = require('cors')
const formRoutes = require('./routes/formRoutes')

require('dotenv').config()

const mongoConfig = require('./config')

mongoConfig()

const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')

const { authorize } = require('./middleware/authMiddleware')

const app = express()

const PORT = 8080

app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/api/users', authorize, userRoutes)
app.use('/api/forms', formRoutes);

app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT)
})

