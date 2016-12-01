var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cookieSession = require('cookie-session');
var router_app = require('./routes_app');
var session_middleware = require('./middlewares/session');
var methodOverride = require('method-override');
var User = require('./models/user').User;
var formidable = require('express-formidable');
var fs = require('fs');

var app = express();

mongoose.connect('mongodb://localhost/fotos');

app.use('/static', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
app.use(methodOverride('_method'))
/*/app*/
/*/ */
app.use(cookieSession({
  name:'session',
  keys:['llave1', 'llave2']
}));




app.set('view engine', 'jade');

app.get('/', function (req, res) {
  console.log(req.session.user_id);
  res.render('index');
});


app.get('/signup', function (req, res) {
  User.find(function(err,doc){
    console.log(doc);
    res.render('signup');
  });
});

app.get('/login', function (req, res) {
    res.render('login');
});


app.post('/users',function(req,res){
  var user = new User({
    email: req.body.email,
    password: req.body.password,
    password_confirmation: req.body.password_confirmation,
    username:req.body.username
  });
  user.save().then(function(us){
    res.send('guardamos el usuario exitosamente')
  },
  function(err){
    if(err){
      console.log(String(err));
      res.send('no pudimos guardar la info')
    }
  });

});
app.post('/sessions',function(req,res){
  User.findOne({email:req.body.email,password:req.body.password},function(err,user){
    req.session.user_id = user._id;
    res.redirect('/app');

  });

});
app.use('/app',session_middleware);
app.use('/app',router_app);
app.listen(3000, function () {
  console.log('listening on port 3000!');
});
