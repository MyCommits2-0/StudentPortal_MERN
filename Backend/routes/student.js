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


///my-coursewith-videos
router.get('/my-course-with-videos/:course_id', (req, res) => {
    const email = req.headers.email
    const Course_id = req.params.course_id
    const sql = `SELECT c.*, v.video_id, v.title, v.youtube_url, v.added_at,c.video_expire_days 
                 FROM students s 
                 INNER JOIN courses c ON s.course_id = c.course_id 
                 INNER JOIN videos v ON v.course_id = c.course_id 
                 WHERE s.email = ? AND DATEDIFF(CURDATE(), v.added_at) <= c.video_expire_days AND c.course_id = ?;`
    pool.query(sql, [email, Course_id], (error, data) => {
        res.send(result.createResult(error, data))
    })
})


 module.exports = router;