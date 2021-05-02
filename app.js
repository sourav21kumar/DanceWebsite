// IMPORTING THE MODULES REQUIRED
const express = require("express");
const fs = require("fs");
const path = require('path');

// this bodyparser is a middleware and herer in the code we have not used this body parser in this website building we have only imported it
const bodyparser = require('body-parser')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});


// ----------DEFINE MONGOOSE SCHEMA----------------------
const contactSchema = new mongoose.Schema({
    name: String,
    gender: String,
    address: String,
    age: String,
    phone: String,
  });

//   COMPLILING OUR SCHEMA INTO A MODEL
//   const Kitten = mongoose.model('Kitten', kittySchema);
  const contact = mongoose.model('Contact', contactSchema);

// STARTING A NEW APP
const app = express();
const port = 8000;
// EXPRESS SPECIFIC STUFFS
app.use('/static', express.static('static'));
app.use(express.urlencoded())

// PUG SPECIFIC STUFFS
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))  //set the views directory

// ENDPOINTS
app.get("/home", (req, res)=>{
   
    const params = { }
    res.status(200).render('home.pug', params);
})
app.get("/contact", (req, res)=>{
   
    const params = { }
    res.status(200).render('contact.pug', params);
})

app.post('/submit', (req, res)=>{

//--------THIS WHAT PREVIOUSLY I WAS DOING ONLY TAKING THE DATA AND SAVING LOGGING IT IN THE TERMINAL----BUT BELOW I HAVE DONE THE PROCESS HOW TO SAVE THE DATA TO THE DATA BASE
      
    // Req.body.here it get by name
//     NAME = req.body.name;
//     AGE = req.body.age;
//     GENDER = req.body.gender;
//     ADDRESS = req.body.address;
//     PHONE =  req.body.phone;
//   console.log(req.body);
//   let OutputToWrite = `the name of the client is ${NAME} age is ${AGE} gender is ${GENDER} lives in ${ADDRESS} you can contact at ${PHONE}` 
//   fs.writeFileSync('COOL.txt',OutputToWrite )
//     const params = {'message':'YOUR FORM HAS BEEN SUBMITTED SUCCESSFULLY'}


// here we have created a new object which saves the data that is extracted by req.body 
// and then when myData.save() it save sthe data and it returns a promise 
// and .catch() is for error
var myData = new contact(req.body);
myData.save().then(()=>{
    const params = {'message':'YOUR FORM HAS BEEN SUBMITTED SUCCESSFULLY AND DATA IS  SAVED TO THE DATABASE'}
    res.status(200).render('submitpage.pug', params);
    //    res.send("THIS ITEMS IS SAVED TO THE DATABASE")
}).catch(()=>{
    res.status(400).send("ITEM WAS NOT SAVED TO THE DATABASE")
});
    // res.status(200).render('submitpage.pug', params);
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
