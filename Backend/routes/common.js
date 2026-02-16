const express = require('express')
const pool = require('../db/pool')
const result = require('../utils/result')
const config = require('../utils/config')
const cryptojs = require('crypto-js')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post("/student/register-to-course", (req, res) => {
    const { name, email, course_id, mobile_no } = req.body

    const sql = "SELECT * FROM users WHERE email=?"
    pool.query(sql, [email], (error, data) => {
        if (error) {
            return res.send(result.createResult(error))
        }
        else if (data.length == 0) {
            const password = "sunbeam";

            const role = "student";

            const usersql = `INSERT INTO users(email,password,role) VALUES(?,?,?)`
            pool.query(usersql, [email, password, role], (error, data) => {

                if (error) {
                    return res.send(result.createResult(error))
                }

                const sql2 = `INSERT INTO students(name, email, course_id, mobile_no) VALUES(?,?,?,?)`
                pool.query(sql2, [name, email, course_id, mobile_no], (error, data) => {
                    if (error) {
                        return res.send(result.createResult(error))
                    }
                    res.send(result.createResult(null, data))

                })
            })
        }
        else {
            const sql=`INSERT INTO students(name,email, course_id,mobile_no) VALUES(?,?,?,?)`;
             pool.query(sql,[name,email, course_id,mobile_no],(error,data)=>{
             if(error){
                 return res.send(result.createResult(error));
             }
            res.send(result.createResult(null,data));
            })
        }
    })
})

//login wala 
router.post('/auth/login', (req, res) => {
    const { email, password } = req.body

    const sql = 'SELECT * FROM users WHERE email =? and password =?'

    pool.query(sql, [email, password], (error, data) => {
        if(error) {
            res.send(result.createResult(error))
        }
        else if(data.length == 0){
            res.send(result.createResult('Invalid email or password bro'))
         }
         else{
            const user = data[0]
            const payload = {
                email: user.email,
                role: user.role
            }
            const token = jwt.sign(payload, config.SECRET)
            const role = user.role

            const userData = {
                token, 
                role
            }
            res.send(result.createResult(null, userData))
         }
    })
})

router.get('/courses/all-active-courses', (req, res) => {
    const sql = 'SELECT * from courses'
    pool.query(sql, (error, data) => {
        res.send(result.createResult(error, data))
    })
})

module.exports = router