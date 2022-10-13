const express = require('express')
const multer = require('multer')
const upload = multer({dest: 'src/imgs/'})

const app = express()
const port = 3000



app.get('/', (req, res) => {
  res.send('Hello World!<br>This is the home page of the website')
})

// import the html file
app.get('/upload', function(req, res){
	res.sendfile(__dirname+"upload.html")
})

// upload messages
app.post('/upload-file', upload.single('uploaded_file'), function (req, res) {
	upload(req, res, function(err) {
		if(err){
			return res.end("Error uploading file.")
		}
	})

	res.end("The file is uploaded successfully!")
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
