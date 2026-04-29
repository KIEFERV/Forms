const express = require('express');
const { readFile } = require('fs').promises;
const router = express.Router();


router.get("/",async(req,res)=>{
 let chosenWords = await getWords();
 console.log("Chosen Words: ", chosenWords);
 res.render('quiz',{chosenWords: chosenWords});
});
router.post("/", async(req,res)=>{
console.log(req.body);
let {userChoice, correctDef, totalQuestion, totalCorrect} = req.body;
let totalQuestions = parseInt(totalQuestion) + 1;
let score = parseInt(totalCorrect);

let isCorrect = userChoice === correctDef;
if(isCorrect){
    score +=1;
}
let chosenWords = await getWords();

res.render('quiz', {

    chosenWords: chosenWords,
    totalQuestions:totalQuestions,
    totalCorrect:score,
    isCorrect: isCorrect,
    correctDef: correctDef
});
});

let getWords = async() =>{
    console.log("Getting random Part!")
let randomPart = getRandomPart();
console.log("Random part: ", randomPart)
let allWords = await readFile('resources/allwords.txt', 'utf8');
let wordArray = allWords.split('\n');
shuffle(wordArray);

let choices = [];
while(choices.length < 5) {
    let line = wordArray.pop();
    let [word,part,def] = line.split('\t');
    //let tokens = line.split('\t');
   // let word = tokens[0];
    //let part = tokens[1];
    //let def = tokens[2];
    if(part === randomPart){
        choices.push(line);
    }
}
return choices;
}
let getRandomPart = ()=>{
    let parts = ['noun','verb','adjective'];
    let randomIndex = Math.floor(Math.random()*parts.length);
    let randomPart = parts[randomIndex];
    return randomPart;
}
let shuffle = (array)=>{
    //fisher Yates algorithm
    for(let i = array.length-1; i>0; i--)
    {
        let randomNumber = Math.floor(Math.random()*(i+1));
        [array[i], array[randomNumber]] = [array[randomNumber], array[i]];
    }
    console.log("Array shuffled");
}



module.exports = router;