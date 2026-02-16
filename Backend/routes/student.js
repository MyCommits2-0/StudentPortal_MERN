const express = require("express")
const result = require("../utils/result")
const pool = require("../db/pool")
const crypto = require("crypto-js")


const router = express.Router()

router.put('/change-password', (req, res) =>{
    const { email, newpassword, confirmpassword } = req.body

    if(newpassword != confirmpassword){
        return res.send(result.createResult("Password mismatched bro"))
    }

    const sql = `UPDATE users SET password =? WHERE email =?`
    
})