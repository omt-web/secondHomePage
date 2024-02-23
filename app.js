const express = require('express');
const fs = require('fs').promises;

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');   // html파일 연결시 추가
const exp = require('constants');
const nunjucks = require('nunjucks');
const indexRouter = require('./routes');
const userRouter = require('./routes/user');
const brandingRouter = require('./routes/branding');
const { sequelize } = require('./models');
const Page = require('./models/page');
const Member = require('./models/member');

const app = express();

dotenv.config();

app.set('port', process.env.PORT || 3000);

//* nunjucks 이용
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});

app.use(
    morgan('dev'),
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

//* routes 폴더 내 내용 사용
app.use('/', indexRouter);          //! http://localhost:3000/
app.use('/user', userRouter);       //! http://localhost:3000/user
app.use('/branding', brandingRouter);       //! http://localhost:3000/branding

//* 404
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    
    error.status = 404;
    next(error);
});

app.use(express.static(path.join(__dirname, 'views')));

//* header.html, footer.html, main.html을 layout.html에 삽입하는 내용
app.use(async (req, res, next) => {
    try {
        // Reading header.html
        const headerData = await fs.readFile('views/header.html', 'utf8');
        // Reading footer.html
        const footerData = await fs.readFile('views/footer.html', 'utf8');
        // Reading main.html
        const mainData = await fs.readFile('views/main.html', 'utf8');
        // Reading layout.html
        const layoutData = await fs.readFile('views/layout.html', 'utf8');

        let renderedLayout = layoutData.replace('{% block header %}', headerData);
        renderedLayout = renderedLayout.replace('{% block footer %}', footerData);
        renderedLayout = renderedLayout.replace('{% block main %}', mainData);

        // Set the layout as the response
        res.locals.layout = renderedLayout;
        next();
    } catch (err) {
        console.error("Error reading file:", err);
        next(err);
    }
});


//* '/branding' 경로에 대한 라우터 설정 - 비동기 처리
app.get('/branding', async (req, res, next) => {
    try {
        // Reading header.html
        const headerData = await fs.readFile('views/header.html', 'utf8');
        // Reading brandingIntro.html
        const brandingIntroData = await fs.readFile('views/brandingIntro.html', 'utf8');
        // Reading footer.html
        const footerData = await fs.readFile('views/footer.html', 'utf8');
        // Reading 2.html
        const footer2Data = await fs.readFile('views/footer2.html', 'utf8');
        // Reading branding.html
        const brandingData = await fs.readFile('views/branding.html', 'utf8');
        // Reading layout.html
        const layoutData = await fs.readFile('views/layout.html', 'utf8');


        let renderedLayout = layoutData.replace('{% block header %}', headerData);
        renderedLayout = renderedLayout.replace('{% block brandingIntroData %}', brandingIntroData);
        renderedLayout = renderedLayout.replace('{% block footer %}', footerData);
        renderedLayout = renderedLayout.replace('{% block footer2Data %}', footer2Data);
        renderedLayout = renderedLayout.replace('{% block main %}', brandingData);
    

        // Set the layout as the response
        res.send(renderedLayout);
    } catch (err) {
        console.error("Error reading file:", err);
        next(err);
    }
});

// * main.html 내용이 가져와 질 때에는 해당 title 변수를 Works로 둔다. 
// '/' 경로에 대한 라우터 설정
app.get('/', (req, res) => {
    res.render('main.html', { title: 'Works' }); // Works로 초기화
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});

// * mysql 연결
sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.log(err);
    });

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

