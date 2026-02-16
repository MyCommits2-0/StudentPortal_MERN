const express = require('express')
const pool = require('../db/pool')
const result = require('../utils/result')
const { checkAuthorization } = require('../utils/auth')

const router = express.Router()

router.get('/enrolled-students', checkAuthorization, (req, res) => {
    const sql = 'SELECT * FROM students '
    pool.query(sql, (error, data) => {
        res.send(result.createResult(error, data))
    })
})

module.exports = router