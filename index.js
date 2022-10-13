const express = require('express')
const multer = require('multer')
const upload = multer({dest: 'src/imgs/'})

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!<br>This is the home page of the website')
})

app.post('/upload', upload.single('uploaded_file'), function (req, res) {

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
