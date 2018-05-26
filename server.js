const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
var app=express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('View engine','hbs');
app.use(express.static(__dirname+'/public'));//it used to register middlewere here it is directory that will be used for templatingdirname provide path to the from root tothe node-web-server
app.use((req,res,next) => {
 var now=new Date().toString();
 var log=`${now}: ${req.method}:${req.url}`;
 console.log(log);
 fs.appendFile('server.log',log+'\n',(err)=>{
  if(err){
    console.log('unable to append to server');
  }
 });
 next();  
});//is used to register mutiple middlewere.next is uesed to indicate when we are done.

app.use((req,res,next)=>{
 res.render('maintenance.hbs')
});

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('ScremIt',(text)=>{ 
  return text.toUpperCase();
});

app.get('/',(req,res)=>{
	res.render('home.hbs',{
       pageTitle:'Home Page',
       welcomeMessage:'welcome to my website'
       // currentYear:new Date().getFullYear()
       });
   
});

app.get('/about',(req,res)=>{
	res.render('about.hbs',{
		pageTitle:"About Page"
		// currentYear:new Date().getFullYear()
	});
});

app.get('/bad',(req,res)=>{
   res.send({
   	errorMessage:"Unable to handle error"
   });
});
app.listen((3000),()=>{
	console.log("starting app on port 3000");
});