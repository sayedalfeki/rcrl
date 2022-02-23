var date=new Date()
exports.getDelayedDate=(days)=>
{
    
    var day=days*24*60*60*1000
    var date2=Date.parse(date)
    var date3=new Date(date2-day)
    var sqlDate=`${date3.getFullYear()}-${date3.getMonth()+1}-${date3.getDate()}`
    return sqlDate
}
exports.getDateNow=()=>
{
   
return `${date.getFullYear()}-${(date.getMonth())+1}-${date.getDate()}`
}