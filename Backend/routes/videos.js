const express = require('express')
const pool = require('../db/pool')
const result = require('../utils/result')
const {checkAuthorization} = require('../utils/auth')


const router = express.Router()

router.get('/all-videos', checkAuthorization,(req, res) => {
    const sql = 'SELECT * FROM videos'
    pool.query(sql, (error,data) => {
        res.send(result.createResult(error, data))
    })
})

router.post('/add',checkAuthorization,(req, res) => {
    const {course_id,title,description,youtube_url} = req.body
    const sql = 'INSERT INTO videos(course_id,title,description,youtube_url,added_at)  VALUES(?,?,?,?,CURDATE())'
    pool.query(sql, [course_id,title,description,youtube_url] ,(error,data) => {
        res.send(result.createResult(error, data))
    })
})

router.put('/update/:videosId', checkAuthorization, (req, res) => {
    const videosId = req.params.videosId
    const { course_id, title, description, youtube_url } = req.body
    const sql = 'UPDATE videos SET course_id=?,title=?,description=?,youtube_url=? WHERE video_id = ?'

    pool.query(sql, [course_id, title, description, youtube_url, videosId], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

router.delete('/:videosId', checkAuthorization,(req, res) => {
    const videosId = req.params.videosId
    const sql = 'DELETE FROM videos WHERE video_id = ?'

    pool.query(sql, [videosId] ,(error,data) => {
        res.send(result.createResult(error, data))
    })
})

module.exports = router