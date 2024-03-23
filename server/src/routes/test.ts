import express from 'express'

const testRouter = express.Router();
testRouter.post("/data",(req,res)=>{
    const {data} = req.body;
    if(!data){
        res.json("NO DATA OBJECT PRESENT")
    }
    res.json(data)
})

export default testRouter