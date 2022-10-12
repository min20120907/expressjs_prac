const express = require('express')
const multer = require('multer')
const app = express()
const port = 3000
const storage =   multer.diskStorage({  
  destination: function (req, file, callback) {  
    callback(null, './src/imgs/');  
  },  
  filename: function (req, file, callback) {  
    callback(null, file.originalname);  
  }  
});  
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
