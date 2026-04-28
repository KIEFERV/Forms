const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//GET /submit - logs query parameters
app.get('/submit',(req,res)=> {
    console.log('---GET REQUEST RECEIVED ---');
    console.log('Query Parameters:', req.query);
    Object.entries(req.query).forEach(([key, value]) => {
        console.log(`${key}:${value}`);
    });
    console.log('--------------------');
    res.send('<h2>GET request received!</h2><pre>' + JSON.stringify(req.query,null,2)+ '</pre>');
});

app.post('/submit', (req,res) =>{
    console.log('-----POST REQUEST RECEIVED-----');
    console.log('Body:', req.body)
       Object.entries(req.body).forEach(([key, value]) =>{
        console.log(` ${key}: ${value}`);
    });
    console.log('---------------------')
    res.send('<h2>POST request received!</h2><pre>'+ JSON.stringify(req.body,null,2)+ '</pre>')
});
app.listen(3030), () =>{
    console.log('Server running on http://localhost:3030')
};