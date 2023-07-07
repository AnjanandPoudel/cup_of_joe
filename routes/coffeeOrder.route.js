const { isOwner, isUser } = require('../middlewares/isUserType')

const router =  require('express').Router({mergeParams:true})


router.get('/',isUser)
router.post('/',isUser)
router.patch('/:coffeeOrderId',isOwner)
router.delete('/:coffeeOrderId',isOwner)

module.exports=router