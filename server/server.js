import express from 'express'
const app = express()

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

import dotenv from 'dotenv'
dotenv.config()

import cors from 'cors'
app.use(cors())

import morgan from 'morgan'
import 'express-async-errors'

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'
const __dirname = dirname(fileURLToPath(import.meta.url))

// db and authentication
import connectDB from './db/connect.js'

// routers
import authRouter from './routes/authRoute.js'
import qrCodeRouter from './routes/qrCodeRoute.js'
import productRoute from './routes/productRoute.js'
import itemRoute from './routes/itemRoute.js'
import warrantyRoute from './routes/warrantyRoute.js'
import manufacturerRoute from './routes/manufacturerRoute.js'
import retailerRoute from './routes/retailerRoute.js'

// middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddeware from './middleware/error-handler.js'
import authenticateUser from './middleware/auth.js'

if (process.env.NODE_ENV !== 'Production') {
    app.use(morgan('dev'))
}

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome!')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/qr', qrCodeRouter)
app.use('/api/v1/product', authenticateUser, productRoute)
app.use('/api/v1/item', itemRoute)
app.use('/api/v1/warranty', authenticateUser, warrantyRoute)
app.use('/api/v1/manufacturer', authenticateUser, manufacturerRoute)
app.use('/api/v1/retailer', authenticateUser, retailerRoute)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddeware)

const PORT = process.env.PORT || 5500

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}...`);
        })
    } catch (error) {
        console.log(error)
    }
}

start()