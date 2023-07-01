let express = require('express')
let app = express()
let port = 3003

app.listen(port, function() {
    console.log('http://localhost:' + port)
})

let cors = require('cors')
app.use(cors({origin: 'http://localhost:5173'}))

app.use(express.json())

let mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/clothes-shop')