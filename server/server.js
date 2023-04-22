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

import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'

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
import claimRoute from './routes/claimRoute.js'
import chatRoute from './routes/chatRoute.js'

// middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddeware from './middleware/error-handler.js'
import authenticateUser from './middleware/auth.js'

if (process.env.NODE_ENV !== 'Production') {
    app.use(morgan('dev'))
}

// only when production
app.use(express.static(path.resolve(__dirname, '../client/dist')))
app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", 'http://localhost:4001'],
    },
  }))
app.use(xss())
app.use(mongoSanitize())

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome!')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/qr', authenticateUser, qrCodeRouter)
app.use('/api/v1/product', authenticateUser, productRoute)
app.use('/api/v1/item', authenticateUser, itemRoute)
app.use('/api/v1/warranty', authenticateUser, warrantyRoute)
app.use('/api/v1/manufacturer', authenticateUser, manufacturerRoute)
app.use('/api/v1/retailer', authenticateUser, retailerRoute)
app.use('/api/v1/claim', authenticateUser, claimRoute)
app.use('/api/v1/chat', authenticateUser, chatRoute)


// only when production
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'))
})

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