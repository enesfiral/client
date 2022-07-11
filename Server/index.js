import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import memoryRouter from './routers/memoryRouter.js'

dotenv.config()

const app = express()

app.use(express.json({ limit: '200mb' }))

app.use('/memories', memoryRouter)

app.listen(process.env.PORT, () => {
    mongoose
    .connect(process.env.MONGO_URI, {
        
    })
    .then(() => console.log('database bağlantısı başarılı'))
    .catch((err) => console.log(err))

});