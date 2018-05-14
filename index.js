const express = require('express');
const bodyParser = require('body-parser');
const app = express();
let randomItem = require('random-item');
const allSkills = ["paper", "rock", "scissors"];
let userWin;

// Use Pug to render views
app.set('view engine', 'pug');

// Serve assets from the public folder
app.use(express.static('public'));

// Decode form data
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON body
app.use(bodyParser.json());

// Render the home page
app.get('/', (req, res) => {
    // Express will look for a page named homepage.pug
    // in the "views" folder so you should have a "views/homepage.pug" file
    res.render('homepage');
});

// Render the signup page
app.get('/fight/:skill', (req, res) => {
    // See above comment about render
    const skillUser = {skill:req.params.skill};

    let skillBot = randomItem(allSkills);

    if(skillUser == skillBot){
        userWin = 0;
    }
    else
    {
        userWin = whoWin(skillBot, skillUser);
    }

    res.render('fight', skillUser, userWin, skillBot);
});

// Add a route to handle signup form submission
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    // Here should go the code to create an user record
    // Once that is done, you can redirect to the relevant page:
    // res.redirect(path)
});

app.listen(3000);

function whoWin(choiceBot, choicePlayer){
    let whoWins;
    if(choicePlayer == "paper"){
        if(choiceBot == "rock"){
            whoWins = 1;
        }
        else if(choiceBot == "scissors"){
            whoWins = -1;
        }
    }
    if(choicePlayer == "rock"){
        if(choiceBot == "scissors"){
            whoWins = 1;
        }
        else if(choiceBot == "paper"){
            whoWins = -1;
        }
    }
    if(choicePlayer == "scissors"){
        if(choiceBot == "paper"){
            whoWins = 1;
        }
        else if(choiceBot == "rock"){

            whoWins = -1;

        }
    }

    return whoWins;
}
