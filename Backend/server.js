const express = require("express")
const app = express()
const cors = require('cors')


app.use(cors({
     origin: 'http://localhost:5173', // vite frontend
  credentials: true
}))


app.use(express.json())
app.use("/", commonRouter)
app.use(authUser)
app.use('/courses', courseRouter)
app.use('/videos', videosRouter)
app.use('/admin', studentDataRouter)
app.use('/student', studentRouter)


app.listen(4000, 'localhost', (req, res) => {
    console.log("Server started at port 4000");    
})
//nodemon server.js