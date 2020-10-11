var express = require('express')
var bodyParser = require('body-parser')
var session = require('cookie-session');
var urlencodedParser = bodyParser.urlencoded({extended: false})
var app = express()

app.use(session({ secret: 'topsecret'}))

app.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = []
    }
    next()
})

app.get('/', function(req,res) {
    res.render('todo.ejs', {todolist: req.session.todolist})
    // console.log(req.session)
})
app.post('/add', urlencodedParser, function(req, res){
    if(req.body.newTask != ""){
        var value = req.session.todolist
        value.push(req.body.newTask)
    }
    console.log(value)
    res.redirect('/')
})
app.get('/suppr/:id'), function(req, res){
    if(req.params.id != ""){
        var value = req.session.todolist
        value.splice(req.params.id, 1)
    }
    console.log(value)
    res.redirect('/')
}

app.use(function(req, res, next){
    res.redirect('/');
})

.listen(8080, console.log('portail 8080 en marche'))
