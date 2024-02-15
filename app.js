const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');   // html파일 연결시 추가
const exp = require('constants');
const nunjucks = require('nunjucks');
const fs = require('fs');


dotenv.config();
const indexRouter = require('./routes');
const userRouter = require('./routes/user');
const brandingRouter = require('./routes/branding');
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

//* // 정적 파일 제공을 위한 미들웨어
app.use('/', express.static(path.join(__dirname, 'public')));

//* body-parser 미들웨어 사용
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//* cookie-parser 미들웨어 사용
app.use(cookieParser(process.env.COOKIE_SECRET));

//* express-session 미들웨어 사용
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
app.use('/branding', brandingRouter);       //! http://localhost:3000/branding

//* 404
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    
    error.status = 404;
    next(error);
    // res.status(404).send('Not Found');
});

app.use(express.static(path.join(__dirname, 'views')));

//* 기존 내용
// app.use((err, req, res, next) => {
//     console.error(err);
//     res.locals.message = err.message;
//     res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
//     res.status(err.status || 500);
//     res.render('error');
//     // res.status(500).send(err.message);
// })

//* header.html, footer.html, main.html을 layout.html에 삽입하는 내용
app.use((req, res, next) => {
    // Reading header.html
    fs.readFile('views/header', 'utf8', (err, headerData) => {
        if (err) {
            console.error("Error reading header file:", err);
            return next(err);
        }
        
        // Reading footer.html
        fs.readFile('views/footer.html', 'utf8', (err, footerData) => {
            if (err) {
                console.error("Error reading footer file:", err);
                return next(err);
            }

            // Reading main.html
            fs.readFile('views/main.html', 'utf8', (err, mainData) => {
                if (err) {
                    console.error("Error reading main file:", err);
                    return next(err);
                }

                // Reading layout.html
                fs.readFile('views/layout.html', 'utf8', (err, layoutData) => {
                    if (err) {
                        console.error("Error reading layout file:", err);
                        return next(err);
                    }

                    // Replace '{% block header %}' with the contents of header.html
                    let renderedLayout = layoutData.replace('{% block header %}', headerData);
                    // Replace '{% block footer %}' with the contents of footer.html
                    renderedLayout = renderedLayout.replace('{% block footer %}', footerData);
                    // Replace '{% block main %}' with the contents of main.html
                    renderedLayout = renderedLayout.replace('{% block main %}', mainData);
                    
                    // Set the layout as the response
                    res.locals.layout = renderedLayout;
                    next();
                });
            });
        });
    });
});

//* '/branding' 경로에 대한 라우터 설정
app.get('/branding', (req, res, next) => {
    // Reading header.html
    fs.readFile('views/header.html', 'utf8', (err, headerData) => {
        if (err) {
            console.error("Error reading header file:", err);
            return next(err);
        }

        // Reading footer.html
        fs.readFile('views/footer.html', 'utf8', (err, footerData) => {
            if (err) {
                console.error("Error reading footer file:", err);
                return next(err);
            }

            // Reading branding.html
            fs.readFile('views/branding.html', 'utf8', (err, brandingData) => {
                if (err) {
                    console.error("Error reading branding file:", err);
                    return next(err);
                }

                // Reading layout.html
                fs.readFile('views/layout.html', 'utf8', (err, layoutData) => {
                    if (err) {
                        console.error("Error reading layout file:", err);
                        return next(err);
                    }

                    // Replace '{% block header %}' with the contents of header.html
                    let renderedLayout = layoutData.replace('{% block header %}', headerData);
                    // Replace '{% block footer %}' with the contents of footer.html
                    renderedLayout = renderedLayout.replace('{% block footer %}', footerData);
                    // Replace '{% block main %}' with the contents of branding.html
                    renderedLayout = renderedLayout.replace('{% block main %}', brandingData);
                    
                    // Set the layout as the response
                    res.send(renderedLayout);
                });
            });
        });
    });
});


// * main.html 내용이 가져와 질 때에는 해당 title 변수를 Works로 둔다. 
// '/' 경로에 대한 라우터 설정
app.get('/', (req, res) => {
    res.render('main.html', { title: 'Works' }); // Works로 초기화
});



app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});

