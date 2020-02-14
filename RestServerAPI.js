const express = require('express');
const app = express();
const request = require('request');
app.use(express.json());

let cityInfo = {};

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept',
	);
	res.header(
		'Access-Control-Allow-Methods',
		'OPTIONS, GET, PUT, POST, PATCH, DELETE, HEAD',
	);
	res.header('Access-Control-Allow-Credentials', 'true');

	if ('OPTIONS' === req.method) {
		res.sendStatus(204);
	} else {
		next();
	}
});


app.get('/', (req, res)=>{
    if(!cityInfo.name){
        res.status(400).send('No city selected');
        return;
    }
    res.status(200).send(cityInfo);
});

app.get('/hiyou', (req, res)=>{
    console.log(req.query);
    if(req.query.name){
        res.status(200).send("Hi, "+req.query.name+"!");
    }else{
        res.status(200).send("Hi, unnamed person!");
    }
});

app.post('/fuckyou', (req, res)=>{
    res.status(200).send("Hi, "+req.body.name+"!");
});

app.put('/', (req, res)=>{
    console.log(req.body);
    cityInfo = {
        "name" : req.body.name,
        "temp" : req.body.temp,
        "low" : req.body.low,
        "high" : req.body.high,
        "humidity" : req.body.humidity,
        "weather": req.body.weather
    };
    res.status(200).send(cityInfo);
});

app.post('/', (req, res)=>{
    if(!req.body.name){
        res.status(400).send('Name required');
        return;
    }else if(!req.body.units){
        res.status(400).send('Units required');
        return;
    }
    request('http://api.openweathermap.org/data/2.5/weather?units=' + req.body.units + '&q=' + req.body.name + '&appid=601470ee4c2f0ffd5c320da7bb68b3e1', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let json = JSON.parse(body);
            console.log(json);
            cityInfo = {
                "name" : json.name,
                "temp" : json.main.temp,
                "low" : json.main.temp_min,
                "high" : json.main.temp_max,
                "humidity" : json.main.humidity,
                "weather": json.weather[0].main
              };
              res.status(200).send(cityInfo);
        }else {
            console.log(res);
            if(body===undefined){
                res.status(202).send({"name" : "Error",
                "weather" : res})
            }else{
                let json = JSON.parse(body);
                cityInfo = {
                    "name" : json.message,
                    "weather" : json.cod
                }
                res.status(201).send(cityInfo);
            }
        }
    })
});

const port = process.env.PORT || 3000;
app.listen(port,()=> console.log(`Listening on port ${port}...`));