const express = require('express');
const multer = require("multer");
const socket = require('socket.io');
const fs = require('fs');
//const ck5 = require('@ckeditor/ckeditor5-build-classic');
const app = express();

const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};

const storage = multer.diskStorage({ // notice you are calling the multer.diskStorage() method here, not multer()
    destination: function(req, file, cb) {
        cb(null, 'uploaded_images/')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({storage});

// App setup

// Static Files
app.use(express.static('dist'));
app.use(express.static('uploaded_images'));
app.use(express.static('public'));

// app.use(express.static('templates'));
// app.use(express.static('node_apps'));

// return image from uploaded images
app.get('/uploaded_images/:uploadid', function(req,res){
    console.log(req.params);
    res.sendFile(__dirname + '/uploaded_images/'+ req.params.uploadid);
});

app.get('/upload_img/', function(req,res){
    
    console.log('in upload get method... probably return null here.')
    res.send(null)

});

app.post(
  "/upload_img/",
  upload.single("upload" /* name attribute of <file> element in your form */),
  (req, res) => {
     const dummy = "butts"
      try{
          var return_obj = {
              url: "uploaded_images/" + req.file.filename
          }
          res.send(return_obj)

      }catch(err){

        
          // delete the uploaded file if there was an issue
          console.log("in error.")
          fs.unlink(req.file.path, (err) => {
              if (err) throw err;
              console.log("an error occurred so '" + req.file.filename + "' was not uploaded.")
          });

          res.status(500)
            .contentType("text/plain")
            .end("Error uploading file.")
      }
    // const tempPath = req.file.path;
    // const targetPath = path.join(__dirname, "./uploads/image.png");
    //
    // if (path.extname(req.file.originalname).toLowerCase() === ".png") {
    //   fs.rename(tempPath, targetPath, err => {
    //     if (err) return handleError(err, res);
    //
    //     res
    //       .status(200)
    //       .contentType("text/plain")
    //       .end("File uploaded!");
    //   });
    // } else {
    //   fs.unlink(tempPath, err => {
    //     if (err) return handleError(err, res);
    //
    //     res
    //       .status(403)
    //       .contentType("text/plain")
    //       .end("Only .png files are allowed!");
    //   });
    // }
  }
);

// app.post('/upload_img/', function(req,res){
//
//     console.log('attempting image save')
//
//
//     const postBody = req.body;
//     console.log("body:");
//     console.log(postBody);
//     console.log("upload: " + postBody.upload);
//
// 	//res.sendFile(__dirname + '/templates/layout/layout.partial')
//     return_obj = {
//         url: "butt",
//     }
//     res.send(return_obj)
//
// });

var server = app.listen(4000, function(){
	console.log('Listening to requests on port 4000');
});




// app.get('/content', function(req, res){
// 	res.render('content_app');
// });

// Socket Setup
var io = socket(server);

io.on('connection', function(socket){
	console.log('+++ socket connected:', socket.id );

	// specify disconnect event
	socket.on('disconnect', function(){
		console.log('	--- socket disconnected:', socket.id );
	});

	// process emitters from client
	// socket.on('message_name', function(data){
	// 	// perform data operations
	// 	io.sockets.emit('message_name', data);
	// })

	// to broadcast
	// socket.on('emit_broadcast', function(data){
	// 	// emit to all connected sockets other than the sender
	// 	// 		notice the different emitted name
	// 	socket.broadcast.emit('broadcast_handler')
	// })

});
