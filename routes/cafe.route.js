const { isOwner, isUser } = require('../middlewares/isUserType')

const router =  require('express').Router({mergeParams:true})



router.post('/',isOwner)
router.patch('/:coffeeOrderId',isOwner)

module.exports=router