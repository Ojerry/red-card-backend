const express = require('express')
const upload = require("../middleware/upload");
const {
  register,
  login,
  issueCard,
  removeCard
} = require('../controllers/userController.js')

const userRouter = express.Router()

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.post('/issue-card', upload.fields([{name: "spsign", maxCount:1},{name:"chiefsign", maxCount:1},{name:"examOffsign", maxCount:1}]),issueCard)
userRouter.post('/remove-card', removeCard)

module.exports = userRouter
