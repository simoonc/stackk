/**** External libraries ****/
const path = require('path');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');


/**** Configuration ****/
const appName = "Some";
const port = (process.env.PORT || 8080);
const app = express();
app.use(bodyParser.json()); // Parse JSON from the request body
app.use(morgan('combined')); // Log all requests to the console
app.use(express.static(path.join(__dirname, '../build')));
app.use(bodyParser.json());

let mongoose = require('mongoose');
let dbUrl = 'mongodb+srv://admin:admin@stack-k71yv.mongodb.net/stack?retryWrites=true';

// Additional headers for the response to avoid trigger CORS security
// errors in the browser
// Read more here: https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

    // intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
      // respond with 200
      console.log("Allowing OPTIONS");
      res.send(200);
    }
    else {
      // move on
      next();
    }
});

/****** Data *****/
let commentsSchema = new mongoose.Schema({
    comment: String,
    vote: Number
});
let qSchema = new mongoose.Schema({
    title: String,
    question: String,
    comments: [commentsSchema]
});

let Comment = mongoose.model('Comment', commentsSchema)
let Question = mongoose.model('Question', qSchema );



/**** Routes ****/

app.get('/api/questions', (req, res) =>{
    Question.find({}, (err, Question) =>{
        res.send(Question)
    })
});



app.get('/api/question/:id', (req, res) => {
    Question.findOne({_id:req.params.id}, (err, Question) => {
        if(err) {
            console.log(err);
        }
            else{
                res.send(Question)
            }
    })

});
    app.post('/api/questions' ,(req, res) => {
    let newQuestion = new Question({
        title: req.body.title,
        question: req.body.question

    })

    newQuestion.save((error, question) =>{
        if(error)
            return console.log(error)
        else(console.log('question saved', question))
    });

    res.json({
        msg: `You have posted this data: ${req.body.title}`,
        newQuestion: newQuestion});
    res.send();
});

    /***** COMMENT ******/

app.post('/api/question/comment/:id' ,(req, res) => {
    let newComment = new Comment({
        comment: req.body.comment,
        vote: 0

    })
    Question.findOne({_id:req.params.id}, (err, Question) => {
        if(err) {
            console.log(err);
        }
        else{

            Question.comments.push(newComment)
            Question.save();
        }
    });

    res.json({
        msg: `You have posted this data: ${req.body}`,
        newComment: newComment});
    res.send();
});

app.put('/api/question/:id/comment/:commentId', (req, res) => {
    Question.findOne({ _id: req.params.id }).exec(function (err, question) {
        question.comments.find((elem) => elem._id == req.params.commentId).vote = req.body.vote;
        question.save();
    })
});


/**** Reroute all unknown requests to the React index.html ****/
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

mongoose.connect(dbUrl, (error) => {
    console.log('mongo connect', error)
});

/**** Start! ****/
app.listen(port, () => console.log(`${appName} API running on port ${port}!`));




