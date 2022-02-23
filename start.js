const user_router=require('./routers/user.router')
const sample_router=require('./routers/sample.router')
const express=require('express')
const bodyparser=require('body-parser')

const app=express()
let port=process.env.port||3030

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json({extended:true}))
app.use('/',(req,res)=>{
res.json({
    'message':'hello from my app'
})

})
app.use('/user',user_router)
app.use('/sample',sample_router)

app.listen(port,()=>{
    console.log(new Date().getDate())
    console.log('server started with port '+port)
})