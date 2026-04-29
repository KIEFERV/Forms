const express = require('express');
const router = express.Router();
const{readFile} = require('fs').promises;

router.get("/",(req,res)=>{

});

let getWords = async() =>{
let randomPart = getRandomPart();
}
let getRandomPart = ()=>{
    let parts = ['noun','verb','adjective'];
    let randomIndex = (Math.random()*parts.length);
    let randomPart = part[randomIndex];
    return randomPart;
}
let shuffle = (array)=>{
    //fisher Yates algorithm
    for(let i = 0; i<array.length-1; i--)
    {
        let randomNumber = Math.floor(Math.random()*(i+1))
        [array[i].array[randomNumber]] = [array[randomNumber], array[i]];
    }
}



module.exports = router;