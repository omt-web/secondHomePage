const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');   // html파일 연결시 추가
const exp = require('constants');
const nunjucks = require('nunjucks');

dotenv.config();
const indexRouter = require('./routes');
const userRouter = require('./routes/user');
const app = express();
app.set('port', process.env.PORT || 3000);

//* nunjucks 이용
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});

app.use(
    morgan('dev'),
    //* 특정 주소의 요청에만 미들웨어가 실행되게
    // express.static('/', path.join(__dirname, 'public')),
    // express.json(),
    // express.urlencoded({ extended: false }),
    // cookieParser(process.env.COOKIE_SECRET),
);

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie',
}));



// app.use((req, res, next) => {
//     console.log('모든 요청에서 다 실행됩니다.');
//     next();
// });

// app.get('/', (req, res, next) => {
//     console.log('get / 요청에서만 실행됩니다.');
//     // res.send('Hello, Express');
//     // res.sendFile(path.join(__dirname, '/index.html'));
//     next();
// }, (req, res) => {
//     throw new Error('에러는 에러 처리 미들웨어로 갑니다.')
//     // res.sendFile(path.join(__dirname, '/index.html'));

// });

//* routes 폴더 내 내용 사용
app.use('/', indexRouter);          //! http://localhost:3000/
app.use('/user', userRouter);       //! http://localhost:3000/user

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    
    error.status = 404;
    next(error);
    // res.status(404).send('Not Found');
});

app.use(express.static(path.join(__dirname, 'views')));


app.use((err, req, res, next) => {
    console.error(err);
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
    // res.status(500).send(err.message);
})

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});