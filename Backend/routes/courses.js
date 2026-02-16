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