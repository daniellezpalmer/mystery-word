const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const session = require('express-session')
const expressValidator = require('express-validator');
const app = express();

const wordsArray = require('./words')
console.log('wordsarray', wordsArray)

//Selects word at random from word array
let randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
console.log('rw', randomWord)

// let blanks = randomWord.replace(/[a-z]/gi, '_ ')
// console.log('blanks',typeof blanks, blanks);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');


app.get('/', function(req, res) {
  let lettersArray = [];
  function createLettersArray(){
  console.log('randonwordsplit',randomWord.split(''));
    let arrayOfLetters = randomWord.split('');
    // console.log('arrayOfLetters',arrayOfLetters);
    arrayOfLetters.forEach((letterPoop) => {
      //Show the number of letters in the word
      lettersArray.push({
        letterKey:letterPoop,
        guessed:false
      })
    })
    console.log('lettersArray',lettersArray);
  }
  createLettersArray();
  // console.log('letters with object', lettersArray);
  // Store the word in session
  req.session.lettersArray = lettersArray;
  // console.log('req.session.lettersArray',req.session.lettersArray);
  res.render('game', {lettersArray: req.session.lettersArray});
})

app.post('/post', function(req, res){
  //Validate that its not empty
  req.checkBody("guesses", "You must enter SOMETHING!").notEmpty();

  let errors = req.validationErrors();
  console.log('errors',errors);
      if (errors) {
        // Render validation error messages

      } else {
        let guesses = req.body.guesses;
        let html = '<p>Your guess is: </p>' + guesses;
        res.send(html);
      }

  console.log(req.body.guesses);
  if (!req.session.letters){
    req.session.letters = [];
  }
  // lettersArray.letter = req.body.guesses;
  //lettersArray.guessed = true;

  req.session.letters.push(req.body.guesses);
  console.log('letters', req.session.letters);
          res.render('game', {lettersArray: req.session.lettersArray, letters: req.session.letters, errors: errors});
})

app.listen(3000, function() {
  console.log('Successfully started express application!');
})

//Validate to make sure only one lette is sent

//The letter can be upper or lower case

//If they enter more than one letter than the input is invalid and they need to try again

//Let user know if their guess appears in the computers words

//Store the users guess in the session

//Display the partially guessed word

//The user is allowed 8 guesses

//Remind the user how many guesses they have at the end of each round

//User loses guess if they guess incorrectly

//If the user guesses the same letter twice dont take away a guess

//Display a message letting the know theyve already guessed thta letter and to try again

//The game should end when the user makes the full word or runs out of guesses

//if player runs out of guesses reveal the word to the user

//When the game ends ask the player if they wold like to play again
