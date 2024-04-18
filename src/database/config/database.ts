import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost:27017/todoApp").then(()=>{
    console.log("Connected to the database")
}).catch(err=>{
    console.log("Connecting to database error: ", err)
})