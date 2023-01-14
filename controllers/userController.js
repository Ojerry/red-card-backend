const dotenv = require("dotenv")
dotenv.config()
const User = require('../models/userModel.js')
const bcrypt = require('bcryptjs')
const Jwt = require('jsonwebtoken')
const multer = require('multer');

const register = async (req, res) => {
    const {
        personnelNo,
        password
    } = req.body
    if (!personnelNo || !password) {
        return res.status(422).json({
            error: 'Fill in all fields'
        })
    }
    if (password < 6) {
        return res
            .status(422)
            .json({
                error: 'Password must be more than six character'
            })
    }
    const user = await User.findOne({
        personnelNo
    })
    if (user) {
        return res.status(422).json({
            error: 'User already register'
        })
    }
      // Hash password
  const hashPassword = await bcrypt.hash(password, 10)
    const CreateUser = await User.create({
    personnelNo,
    password: hashPassword,
  })
  return res.status(201).json({
    success: true,
    message: 'Account Created Successfully',
  })
}

const login = async (req, res) => {
    const { personnelNo, password } = req.body
    if (!personnelNo || !password) {
        return res.status(422).json({ error: 'All fields are required' })
    }
    const user = await User.findOne({ personnelNo }).select('+password')
    if (!user) {
        return res.status(422).json({
          error: 'User Does Not Exist. Please register To continue.',
        })
    }
    //Password Comparation with the Encrypted Password
    const isMatch = await bcrypt.compare(password, user.password)
    //Removing password from the reponse
    user.password = null
    if (isMatch) {
        res.status(200).json({ user })
    } else {
        return res.status(401).json('Invalid Login Details. Please Try Again.')
    }
}

// const issueCard = async (req, res) => {
//     const { card, personnelNo } = req.body
//     User.updateOne({personnelNo: personnelNo}, {$push: {cards: card}},
//         function (err) {
//         if (!err) {
//             res.status(201).json({success :"Succesfully updated Cards"})
//         } else {
//             console.log(err)
//         }
//     })
// }
const issueCard = async (req, res) => {
    const {personnelNo} = req.body
    const card = {
        offense: req.body.offense,
        points: req.body.points,
        studentRegNo: req.body.studentRegNo,
        spsignFileName: req.files["spsign"][0].filename,
        chiefsignFileName: req.files["chiefsign"][0]?.filename,
        examOffSign: req.files["examOffsign"][0]?.filename
    }
    console.log(card)
    console.log(personnelNo)
    // User.updateOne({personnelNo: personnelNo}, {$push: {cards: card}},
    // function (err) {
    //     if (!err) {
    //         res.status(201).json({success :"Succesfully updated Cards"})
    //     } else {
    //         console.log(err)
    //     }
    // })
}

const removeCard = async (req, res) => {
    const { card, personnelNo } = req.body
    User.updateOne({personnelNo: personnelNo}, {$pull: {cards: card}},
        function (err) {
        if (!err) {
            res.send("Succesfully updated Article")
        } else {
            res.send(err)
        }
    })
}
module.exports = {
    register,
    login,
    issueCard,
    removeCard
  }