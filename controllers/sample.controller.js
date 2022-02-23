const con=require('../conmysql')
const helper=require('../helpers')

exports.addSample=(req,res)=>
{
console.log(helper.getDateNow)
var sampleId=req.body.sampleId
var createdBy=req.body.createdBy
var sql=`insert into sample(sample_id,created_at,created_by) values ('${sampleId}','${helper.getDateNow()}',${createdBy})`
con.query(sql,(err,sample)=>
{
if(err)
{
    res.json({
        'err':err
    })
    throw err
}
if(sample)
res.json({
    'added':true,
    'sample':sample
})
else
res.json({
    'added':false,
    'sample':sample
})
})
}
exports.sendSample=(req,res)=>
{
var sample_id=req.params.sampleId
//var send_at=req.body.sendAt
var send_by=parseInt(req.body.sendBy)
var sql=`update sample set sent_at='${helper.getDateNow()}',sent_by=${send_by} where sample_id='${sample_id}'`
con.query(sql,(err,sample)=>
{
if(err)
{
    res.json({'error':err})
    throw err
}
if(sample.affectedRows>0)
res.json({
    'sended':true,
    'sample':sample
})
else
res.json({
    'sended':false,
    'sample':sample
})
})
}
exports.finishSample=(req,res)=>
{
    var sample_id=req.params.sampleId
    var finished_by=parseInt(req.body.finishedBy)
    var sql=`update sample set finished_at='${helper.getDateNow()}',finished_by=${finished_by} where sample_id='${sample_id}'`
    con.query(sql,(err,sample)=>
    {
    if(err)
    {
        res.json({'error':err})
        throw err
    }
    if(sample.affectedRows>0)
    res.json({
        'finished':true,
        'sample':sample
    })
    else
    res.json({
        'finished':false,
        'sample':sample
    })
    })
}
exports.deleteSample=(req,res)=>
{
var sample_id=req.params.sampleId
var sql=`delete from sample where sample_id='${sample_id}'`
con.query(sql,(err,sample)=>
    {
    if(err)
    {
        res.json({'error':err})
        throw err
    }
    if(sample.affectedRows>0)
    res.json({
        'deleted':true,
        'sample':sample
    })
    else
    res.json({
        'deleted':false,
        'sample':sample
    })
    })
}
exports.getAllSamples=(req,res)=>
{
    var sql=`SELECT sample.sample_id,sample.created_at,u1.user_name as 'created by',sample.sent_at ,u2.user_name as 'sent by',sample.finished_at,u3.user_name as 'finished by ' FROM sample LEFT JOIN users as u1 ON sample.created_by=u1.id
    LEFT JOIN users as u2 on sample.sent_by=u2.id LEFT JOIN users  as u3 on sample.finished_by=u3.id order by sample_id desc`
    con.query(sql,(err,samples)=>
    {
        if(err)
        {
            res.json({'error':err})
            throw err
        }
        if(samples.length>0)
        res.json({
            samples
        })
        else
        res.json({
            'msg':'no samples founded'
        })
    })
}
exports.getSample=(req,res)=>
{
var sample_id=req.params.sampleId
var sql=`SELECT sample.sample_id,sample.created_at,u1.user_name as 'created by',sample.sent_at ,u2.user_name as 'sent by',sample.finished_at,u3.user_name as 'finished by ' FROM sample LEFT JOIN users as u1 ON sample.created_by=u1.id
LEFT JOIN users as u2 on sample.sent_by=u2.id LEFT JOIN users  as u3 on sample.finished_by=u3.id  where sample_id='${sample_id}'`
con.query(sql,(err,sample)=>
    {
        if(err)
        {
            res.json({'error':err})
            throw err
        }
        if(sample.length>0)
        res.json({
            sample
        })
        else
        res.json({
            'msg':'no sample founded'
        })
    })
}
exports.getNotSendedSamples=(req,res)=>
{
var sql=`select sample_id from sample where sent_at is null`
con.query(sql,(err,samples)=>
    {
        if(err)
        {
            res.json({'error':err})
            throw err
        }
        if(samples.length>0)
        res.json({
            samples
        })
        else
        res.json({
            'msg':'all sample  was sended'
        })
    })
}
exports.getNotfinishedSamples=(req,res)=>
{
var sql=`select sample_id from sample where sent_at is not null and finished_at is null`
con.query(sql,(err,samples)=>
    {
        if(err)
        {
            res.json({'error':err})
            throw err
        }
        if(samples.length>0)
        res.json({
            samples
        })
        else
        res.json({
            'msg':'all sample  was finished'
        })
    })
}
exports.getdelayedSendedSamples=(req,res)=>
{
    var days=req.query.days
    console.log(helper.getDelayedDate(days))
var sql=`select sample_id from sample where created_at < '${helper.getDelayedDate(days)}' and sent_at is null`
con.query(sql,(err,samples)=>
    {
        if(err)
        {
            res.json({'error':err})
            throw err
        }
        if(samples.length>0)
        res.json({
            samples
        })
        else
        res.json({
            'msg':'all sample  was sended'
        })
    })
}
exports.getdelayedFinishedSamples=(req,res)=>
{
    var days=req.query.days
    
console.log(getDelayedDate(days))
var sql=`select sample_id from sample where sent_at < '${getDelayedDate(days)}' and finished_at is null`
con.query(sql,(err,samples)=>
    {
        if(err)
        {
            res.json({'error':err})
            throw err
        }
        if(samples.length>0)
        res.json({
            samples
        })
        else
        res.json({
            'msg':'all sample  was finished'
        })
    })
}