const user_router=require('./routers/user.router')
const sample_router=require('./routers/sample.router')
const express=require('express')
const bodyparser=require('body-parser')
const host='0.0.0.0'
const app=express()
let port=3000

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json({extended:true}))
app.use('/',(req,res)=>{
res.json({
    'message':'hello from my app'
})

})
app.use('/user',user_router)
app.use('/sample',sample_router)

app.listen(port,host,()=>{
    console.log(new Date().getDate())
    console.log('server started with port '+port)
})