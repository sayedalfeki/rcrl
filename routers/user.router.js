const user=require('../controllers/user.controller');
const express=require('express')
const router=express.Router()
router.get('/?',user.loginuser)
router.get('/:id',user.getUser)
router.post('/adduser',user.addUser)
router.put('/:id/:password',user.changePassword)
//router.delete('/:id',user.deleteUser)
module.exports=router