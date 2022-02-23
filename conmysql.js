const mysql=require('mysql')
var con=mysql.createConnection({
    host:'mysql-70000-0.cloudclusters.net',
    port:10228,
    user:'sayed',
    password:'rcrl1234',
    database:'blood'
    
    
})
con.connect((err)=>{
if(err) throw err
console.log('connected to database')
})
module.exports=con