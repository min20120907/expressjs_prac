const express = require('express')
const multer = require('multer')
const fs = require('fs')
const mysql = require('mysql')

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'phpmyadmin',
	password : 'jefflin123',
	database : 'Photos'
})

function addDB(req, file) {
	const FILE = file.originalname
	const UPLOADER = req.body.name
	//https://stackoverflow.com/questions/5129624/convert-js-date-time-to-mysql-datetime
	const UPLOAD_TIME = new Date().toISOString().slice(0, 19).replace('T', ' ')
	console.log(FILE, UPLOADER, UPLOAD_TIME)

	connection.connect(function(err) {
		if (err) {
			console.error('error connecting db: ' + err.stack)
			return
		}

		console.log('connected to db as id ' + connection.threadId)

		const sql = 'INSERT INTO Gallery (FILE, UPLOADER, UPLOAD_TIME) VALUES (?)'
		const values = [FILE, UPLOADER, UPLOAD_TIME]
		connection.query(sql, [values],
			function (error, results, fields) {
				if (error) throw error
		})
	})
}

const storage = multer.diskStorage({ 
	destination: function (req, file, cb) {
		const dest = `src/imgs/${req.body.name}`
		if (fs.existsSync(dest)) {
			cb(null, dest)
		} else {
			fs.mkdir(dest, (error) => cb(error, dest))
		}
	},
	filename: function (req, file, cb) {
		addDB(req, file)
		cb(null, file.originalname)
	}
})

const upload = multer({
	storage: storage
})

const app = express()
const port = 3000

// home page message
app.get('/', (req, res) => {
	res.sendFile(__dirname+"/home.html")
	app.use(express.static(process.env.PWD))
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
// preview page
app.get('/preview', function(req, res){
	res.sendFile(__dirname+"/preview.html")
})
// home page
app.get('/home', function(req, res){
	res.sendFile(__dirname+"/home.html")
})
// preview results page
app.get('/preview-result', function(req, res){
	res.sendFile(__dirname+"/preview.html")
	let albumName = req.query.aname
	let pathName = "src/imgs/"
	app.use(express.static(process.env.PWD + '/' + pathName + albumName))

	const template = (text) => {
	return `<!DOCTYPE html>
<html>
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
    img {
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 5px;
        width: 150px;
    }

    img:hover {
        box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
    }
    </style>
    </head>
    <body>
        <h1>Image preview</h1>
${text}
    </body>
</html>`
	}

	res.send(template(fs.readdirSync(pathName+albumName).map(i => '        <a href="'+i+'"><img src="'+i+'" style="width:200px"></a>').join('\n')))
})
