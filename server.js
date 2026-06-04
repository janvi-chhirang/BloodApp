const express=require('express')
const dotenv=require('dotenv')
dotenv.config()
const colors=require('colors')
const morgan=require('morgan')
const cors=require('cors')
const connectDB=require('./config/db')
const  path=require('path')

const app=express()
connectDB()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

//routes
app.get('/', (req, res) => {
    res.send("API is running...");
});

app.use('/api/auth',require('./routes/auth.routes'))

app.use('/api/inventory',require('./routes/Inventory.routes'))
app.use('/api/analytics',require('./routes/analytics.routes'))
app.use('/api/admin',require('./routes/admin.routes'))

 app.use(express.static(path.join(__dirname, './client/build')));

 app.get('/:splat*', (req, res) => {
   res.sendFile(path.join(__dirname, './client/build/index.html'));
 });

app.listen(process.env.PORT,(req,res)=>{
 console.log("Node server started");
})

