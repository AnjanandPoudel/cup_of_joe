const router =  require('express').Router()



const cafeRouter= require('./cafe.route')
const coffeeOrderRouter= require('./coffeeOrder.route')
const ownerRouter= require('./owner.route')
const userRouter= require('./user.route')


router.use('/cafe',cafeRouter)
router.use('/coffee-order',coffeeOrderRouter)
router.use('/owner',ownerRouter)
router.use('/user',userRouter)

module.exports=router