const express = require('express')  
const pool = require('../db/pool')
const result = require('../utils/result')
const {checkAuthorization} = require('../utils/auth')

const router = express.Router()

router.get('/all-courses', checkAuthorization, (req, res)=>{
    const sql = 'SELECT * FROM COURSES'
    pool.query(sql,(error, data)=>{
        res.send(result.createResult(error, data))
    })
})

router.get('/:courseId', (req, res)=>{
    const courseId = req.params.courseId
    const sql = 'SELECT * FROM COURSES WHERE course_id=?'
    pool.query(sql,[courseId], (error, data) => {
        res.send(result.createResult(error,data))
    })
})

router.post('/add', checkAuthorization, (req,res)=>{
    const {Course_id, course_name, description, fees, start_date, end_date, video_expiry_days} = req.body
    const sql = 'INSERT INTO courses(course_id,course_name, description,fees, start_date, end_date,video_expire_days) VALUES(?,?,?,?,?,?,?)'
    pool.query(sql, [Course_id, course_name, description, fees, start_date, end_date, video_expiry_days], (error, data)=> {
        res.send(result.createResult(error,data))
    })
})

