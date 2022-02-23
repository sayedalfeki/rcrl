const user_router=require('./routers/user.router')
const sample_router=require('./routers/sample.router')
const express=require('express')
const bodyparser=require('body-parser')
//const con=require('./conmysql')
const app=express()
let port=process.env.port||3030
/*var con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'blood'
})
con.connect((err)=>{
if(err) throw err

console.log('connected to database')

})*/
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json({extended:true}))
app.use('/user',user_router)
app.use('/sample',sample_router)
/*app.use((req,res)=>{
//res.send('hello from express')
con.query('select * from sample',(er,result)=>{
    if(er) throw er
    res.json(result)
    })
})*/
app.listen(port,()=>{
    console.log(new Date().getDate())
    console.log('server started with port '+port)
})