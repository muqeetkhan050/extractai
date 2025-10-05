const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')

const app=express()

app.use(express.json())
app.use(cors())

mongoose.connect('mongodb+srv://muqeetkhan050:<db_password>@cluster0.ajh2vsl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>console.log('MongoDB connected'))
.catch(err=>console.log(err))
app.listen(5000, () => console.log("Server running on port 5000"));