const data = require('./data.json');
const express = require('express');
const app = express();
app.use(express.json()); //Adding Middleware and using that Middleware
app.use(express.urlencoded({ extended: true }));  //Can send key=value&key=value

app.use(function(req, res, next) {
    console.log('Logging...');
    next();
});

app.use(function(req, res, next) {
    console.log('Authenticating...');
    next();
});

/***** API Endpoints *****/
app.get('/', (req, res) => {
    res.send(['Hello World']);
});

app.get('/data', (req, res) => {
    res.send(data);
});

app.get('/data/:id', (req, res) => {
    const id = req.params.id;
    const exist = data.find(x => x.id == id);
    if(exist) {
        res.send(data[id-1])
    } else {
        res.status(404).send("No, this product doesn't exist!")
    }
});

/***** Make the API go online *****/
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});