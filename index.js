const express = require('express')
const multer = require('multer')
const fs = require('fs')

const storage = multer.diskStorage({ 
	destination: function (req, file, cb) {
		const dest = `src/imgs/${req.body.name}`
		if (fs.existsSync(dest)) {
			cb(null, dest);
		} else {
			fs.mkdir(dest, (error) => cb(error, dest));
		}
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname)
	}
});

const upload = multer({
	storage: storage
})

const app = express()
const port = 3000

// home page message
app.get('/', (req, res) => {
	res.send('Hello World!<br>This is the home page of the website')
})

// import the html file
app.get('/upload', function(req, res){
	res.sendFile(__dirname+"/upload.html")
})

// upload messages
app.post('/upload-file', upload.array('files'), function (req, res) {
	res.end("The file is uploaded successfully!")
})

// server ontime message
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
