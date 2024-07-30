const express = require('express');
const mongoose=require('mongoose');
const app = express();
const dbConnect=()=>{
    try {
        const conn=mongoose.connect(process.env.MONGO_URI)
        console.log("connected to database")
    }catch(error){
        console.log("error connecting to the database!!")
    }
}

const dotenv = require('dotenv').config();

const port = process.env.PORT || 8000;
dbConnect()

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
