

const express = require('express');
const bodyParser = require('body-parser')
const mc = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const path = require('path')
var db;

const app = express();
app.use(bodyParser.json())
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}
app.use('/public', express.static(path.join(__dirname, 'public')))


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

//READ
app.get('/quote', (req, res, next) => {
    var cursor = db.collection('myquotes').find().toArray((err, result) => {
        console.log(result)
        res.send(result)
    })

})

//CREATE
app.post('/quote', (req, res, next) => {
    var item = req.body;
    db.collection('myquotes').save(item, (err, xx) => {
        if (err) return console.log(err)
        console.log(item)
        res.send(item)
    })
})

//UPDATE
app.put('/quote', (req, res, next) => {

    db.collection('myquotes').update(
        { _id: ObjectID(req.body._id) },
        {
            who: req.body.who,
            says: req.body.says
        },
        (err, exx) => {
            if (err) return console.log(err)
            res.send(exx)
        }
    )
})

//REMOVE
app.delete('/quote/:id', (req, res, next) => {
    let id2 = req.params.id;
    let id = ObjectID(id2);

    // db.collection('myquotes'). find({_id: id}).toArray((err, xxx) =>
    // {
    //     res.send(xxx)
    // })
    db.collection('myquotes').remove(
         { _id: id },
        (err, exx) => {
            if (err) return console.log(err)
            res.send(exx)
        }
    )
})

mc.connect('mongodb://admin:1@ds023540.mlab.com:23540/myquotes', (err, database) => {
    if (err) return console.log(err);
    console.log('connected to Mongo')
    db = database;
    app.listen(5001, function() { console.log('listening :5001 ***') })
})