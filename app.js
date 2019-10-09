const express= require("express");
const exphbs  = require('express-handlebars');
const  bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();



app.use(bodyParser.urlencoded({ extended: false }));
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');



//This code is used to connect mongoose to our MONGODB in the Cloud
const DBURL= "mongodb+srv://kbest:web322_c2019!@cluster0-z6oiq.mongodb.net/testApp?retryWrites=true&w=majority";
mongoose.connect(DBURL, {useNewUrlParser: true})
//The then block will only be executed if the above-mentioned line is successful
.then(()=>{
    console.log(`Database is connected`)
})
//The catch block will only be executed if the connection failed
.catch(err=>{
    console.log(`Something went wrong : ${err}`);
})


//This route handler will be called when the user navigates to the home page
app.get("/",(req,res)=>{
    res.render("home");
});


//This route Handler will be callled when the form is submitted
app.post("/",(req,res)=>{


    
  const Schema = mongoose.Schema;

  const taskSchema = new Schema({
    title:  String,
    description: String
  });

    //This creates a Model called Tasks. This model represents our Collection in our database
    const Tasks = mongoose.model('Tasks', taskSchema);

    const formData ={
        title:req.body.title,
        description:req.body.description
    }
    //To create a  Task document we have to call the Model constructor
    const ta = new Tasks(formData);
    ta.save()
    .then(() => 
    {
        console.log('Task was inserted into database')
    })
    .catch((err)=>{
        console.log(`Task was not inserted into the database because ${err}`)
    })

    res.redirect("/");




});


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`The web server is connected at ${PORT}`);
})




