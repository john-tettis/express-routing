const express = require('express');
const  math = require('mathjs');
const ExpressError = require('./errors')

const app = express();

app.use(express.json())
app.get('/mean',(req,res,next)=>{
    try{
        let nums = req.query.nums.split(',').map((e)=>Number(e))
        if(nums.some((num)=> isNaN(num))){throw new ExpressError('Input must be numbers',400)}
        if(!nums){throw new ExpressError('Nums must be included in query string- ?nums=1,2,3,4 etc', 400)}
        let mean = nums.reduce((sum,current)=>{
            return sum + current;
        },0)/nums.length;
        
        res.json({response:{
            operation:'mean',
            value:mean
        }})
    }
    catch(e){
        next(e)
    }
    
    
})
app.get('/median',(req,res,next)=>{
    try{
        let nums = req.query.nums.split(',').map((e)=>Number(e))
        let median;
        if(nums.some((num)=> isNaN(num))){throw new ExpressError('Innput must be numbers',400)}
        if(!nums){throw new ExpressError('Nums must be included in query string- ?nums=1,2,3,4 etc', 400)}
        if(nums.length%2 === 0 && nums.length!==0){
            median = (nums[nums.length/2 -1] + nums[nums.length/2])/2
        }
        else{
            median = nums[(nums.length/2)-.5]
        }
        res.json({response:{
            operation:'median',
            value:median
        }})
    }
    catch(e){
        next(e)
    }
})
app.get('/mode',(req,res,next)=>{
    try{
        let nums = req.query.nums.split(',').map((e)=>Number(e))
        if(nums.some((num)=> isNaN(num))){throw new ExpressError('Input must be numbers',400)}
        if(!nums){throw new ExpressError('Nums must be included in query string- ?nums=1,2,3,4 etc', 400)}
        let mode = math.mode(...nums)
        res.json({response:{
            operation:'mode',
            value:mode[0]
        }})
    }
    catch(e){
        next(e)
    }
})


app.use((error,request,response,next)=>{
    console.log(error)
    response.json({error:error.msg})

})
app.listen(3000,()=>{
    console.log('Server live on port 3000-')
})