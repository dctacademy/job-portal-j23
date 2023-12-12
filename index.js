const express = require('express')
const app = express()
const port = 3031
app.use(express.json())


app.listen(port, () => {
    console.log('server running on port', port)
})