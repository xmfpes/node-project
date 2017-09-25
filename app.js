var express = require('express')
var app = express();
var port = 3000;

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//auto-increment를 위한 패키지
var autoIncrement = require('mongoose-auto-increment');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
//passport 로그인 관련
var passport = require('passport');
var session = require('express-session');

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    console.log("mongo db Connection");
});
var connect = mongoose.connect('mongodb://127.0.0.1:27017/myDbName', { useMongoClient: true });
autoIncrement.initialize(connect);

//admin module get
var admin = require('./routes/admin');
var accounts = require('./routes/accounts');
var auth = require('./routes/auth');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
app.use(session({
    secret: 'fastcampus',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 2000 * 60 * 60 //지속시간 2시간
    }
}));

//passport 적용
app.use(passport.initialize());
app.use(passport.session());

//플래시 메시지 관련
app.use(flash());

app.get('/', function(req, res){
    res.send("Hello, Node.js");
});

//routes add
app.use('/admin', admin);
app.use('/accounts', accounts);
app.use('/auth', auth);

app.listen(port, function(){
    console.log("server start!");
});