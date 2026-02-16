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
    pool.query(sql, [confirmpassword, email], (error, data) => {
        if (error) {
            return res.send(result.createResult(error));
        }

        else if (data.affectedRows == 0) {
            return res.send("Invalid credentials bro ");
        }

        res.send(result.createResult(null, data)); 
    })
})


// /get all registered courses of a student

// student.js
router.get('/my-courses', (req, res) => {
    const email = req.headers.email
    const sql = 'SELECT c.* FROM courses c JOIN students s ON c.course_id = s.course_id WHERE s.email = ? AND CURDATE()<=c.end_date'
    pool.query(sql, [email], (error, data) => {
        res.send(result.createResult(error, data))
    })
})