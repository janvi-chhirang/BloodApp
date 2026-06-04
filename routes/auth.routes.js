const express=require('express')
const { registerController } = require('../controller/auth.controller')
const { LoginController } = require('../controller/auth.controller')
const { getCurrentUserController } = require('../controller/auth.controller')
const authMiddleware=require('../middlewares/auth.middleware')

const router=express.Router()

//routes
//register:-post
router.post('/register',registerController)

//login:-post
router.post('/login', LoginController)

//get current user:-get
router.get('/current-user',authMiddleware,getCurrentUserController)

module.exports=router