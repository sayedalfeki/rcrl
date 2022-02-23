var con =require('../conmysql')
exports.loginuser=(req,res)=>{
    var user_name=req.query.user_name
    var password=req.query.password
    console.log(user_name)
    console.log(password)
var sql=`select * from users where user_name='${user_name}' and password='${password}'`
con.query(sql,(err,user)=>{
    if(err) {
        res.json({
            'error':err
        })
        throw err
    }
    if(user.length>0)
    res.json({
        'login':true
    })
    else
    {
        res.json({
            'login':false
        }) 
    }
})
}
exports.getUser=(req,res)=>
{
var id=req.params.id
console.log(id)
var sql=`select * from users where id=${id}`
con.query(sql,(err,user)=>{
    if(err) {
        res.json({
            'error':err
        })
        throw err
    }
    if(user.length>0)
    res.json({
        'user':user,
        
    })
    else
    {
        res.json({
            'user':'no user founded'
        }) 
    }

})
}
exports.addUser=(req,res)=>
{
   // var id=null
var firstName=req.body.firstName
var middleName=req.body.middleName
var lastName=req.body.lastName
var userName=req.body.userName
var password=req.body.password
var manager=parseInt(req.body.manager)
console.log({
    'firstname':firstName,
    'middlename':middleName,
    'lastname':lastName,
    'username':userName,
    'password':password,
    'manager':manager
})
var sql=`insert into users values(null,'${firstName}','${middleName}','${lastName}','${userName}','${password}',${manager})`
con.query(sql,(err,user)=>{
    if(err) {
        res.json({
            'error':err
        })
        throw err
    }
    if(user)
    res.json({
        'user':user,
        'added':true
    })
    else
    {
        res.json({
            'user':user,
            'added':false
        }) 
    }
})

}
exports.changePassword=(req,res)=>
{
var id=req.params.id;
var password=req.params.password
var sql=`update users set password='${password}'where id=${id}`
con.query(sql,(err,user)=>
{
if(err)
{
    res.json({
        'err':err
    })
    throw err
}
if(user)
res.json({
    'user':user,
    'updated':true
})
else
res.json({
    'user':user,
    'updated':false
})
})
}
exports.deleteUser=(req,res)=>
{
var id=req.params.id
var sql=`delete from users where id=${id}`
con.query(sql,(err,user)=>{
    if(err)
    {
        res.json({
            'err':err
        })
        throw err
    }
    if(user.affectedRows>0)
    res.json({
        'user':user,
        'deleted':true
    })
    else
    res.json({
        'user':user,
        'deleted':false
    })
})
}