
import dotenv  from "dotenv"
dotenv.config()
import mongoose from 'mongoose'
import router from './src/routes/routes.js'


import express from 'express';
const app = express()
const port = process.env.PORT || 5000
app.use(express.json())
app.use('/', router)

mongoose.connect('mongodb+srv://sunandini:Mymongodb%403@cluster0.jmx4wnh.mongodb.net/project').then(() => console.log('MONGODB connects successfully'))
    .catch((err) => console.log(err.message))

app.listen(port, () => {
    console.log(`server running on 4000`)
})