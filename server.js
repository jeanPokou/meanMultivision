
//==================== calling nodes module
var express=require('express'),
	stylus=require('stylus'),
	logger=require('morgan'),
	bodyParser=require('body-parser'),
	mongoose =require('mongoose');

//=================== setting development environment variable
var env = process.env.NODE_ENV= process.env.NODE_ENV || "development";



var app=express();

// compiling function for stylus
function compile(str,path){
	return stylus(str).set('filename',path);
}


//===================== setting public path for view
app.set('views',__dirname+'/server/views');
app.set('view engine','jade');

//===================== stylus middleware
app.use(stylus.middleware(
	{
		src:__dirname+'/public',
		compile:compile

	}

));

app.use(express.static( __dirname +'/public'));


//====================== connecting mongodb and  event handler
if(env==='development'){
	mongoose.connect('mongodb://localhost:27017/multivision');
}
else
{
	mongoose.connect('mongodb://jean:blessed22@ds053380.mongolab.com:53380/jmpmultivision');
}

//mongoose.connect('mongodb://localhost:27017/multivision');
//mongoose.connect('mongodb://jean:blessed22@ds053380.mongolab.com:53380/jmpmultivision');
var db=mongoose.connection;
db.on('error',console.error.bind (console,'connection error'));
db.once('open',function callback(){
	console.log('multivision db opened');
});

//======================  mongoose Schema
/*
var messageSchema=mongoose.Schema({message:String});
var Message=mongoose.model('message',messageSchema);  // mongo model
var mongoMessage;
Message.findOne().exec(function(err , messageDoc){
	mongoMessage= messageDoc.message;
});
*/


//====================== routing for partial
app.get('/partials/:partialPath',function(req,res){
	res.render('partials/'+ req.params.partialPath)
});

//====================== handle all  request with server Index
app.get('*',function(req,res){
		res.render('index');
});

//====================== server port
var port=process.env.PORT || 3030;
app.listen(port);
console.log("listening to port "+ port+ " ......");