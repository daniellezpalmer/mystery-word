const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressSession = require('express-session')
const expressValidator = require('express-validator');
const app = express();

const words = require('./words')
const wordsArray = words;
console.log(wordsArray)

let randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
console.log(randomWord)

let blanks = randomWord.replace(/[a-z]/gi, '_')
console.log(blanks);

let alphaGuesses = blanks.replace(randomWord)
console.log(alphaGuesses);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.get('/', function(req, res) {
  res.render('game', {hint: blanks});
})

app.listen(3000, function() {
  console.log('Successfully started express application!');
})
