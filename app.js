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
const archivingBoxRouter = require('./routes/archivingBox');
const leafletRouter = require('./routes/leaflet');
const measurementRouter = require('./routes/measurement');
const homesweethomeRouter = require('./routes/homesweethome');
const booksRouter = require('./routes/books');
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
app.use('/archivingBox', archivingBoxRouter);       //! http://localhost:3000/archivingBox
app.use('/leaflet', leafletRouter);       //! http://localhost:3000/leaflet
app.use('/measurement', measurementRouter);       //! http://localhost:3000/measurement
app.use('/homesweethome', homesweethomeRouter);       //! http://localhost:3000/homesweethome
app.use('/books', booksRouter);       //! http://localhost:3000/books

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
        // Reading html
        const headerData = await fs.readFile('views/header.html', 'utf8');
        const footerData = await fs.readFile('views/footer.html', 'utf8');
        const mainData = await fs.readFile('views/main.html', 'utf8');
        const layoutData = await fs.readFile('views/layout.html', 'utf8');

        let renderedLayout = layoutData.replace('{% block layout %}', layoutData);
        renderedLayout = renderedLayout.replace('{% block header %}', headerData);
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
        // Reading html
        const headerData = await fs.readFile('views/header.html', 'utf8');
        const brandingIntroData = await fs.readFile('views/brandingIntro.html', 'utf8');
        const footerData = await fs.readFile('views/footer.html', 'utf8');
        const footer2Data = await fs.readFile('views/footer2.html', 'utf8');
        const brandingData = await fs.readFile('views/branding.html', 'utf8');
        const layoutData = await fs.readFile('views/layout.html', 'utf8');

        let renderedLayout = layoutData.replace('{% block layout %}', layoutData);
        renderedLayout = renderedLayout.replace('{% block header %}', headerData);
        renderedLayout = renderedLayout.replace('{% block brandingIntroData %}', brandingIntroData);
        renderedLayout = renderedLayout.replace('{% block footer %}', footerData);
        renderedLayout = renderedLayout.replace('{% block footer2Data %}', footer2Data);
        renderedLayout = renderedLayout.replace('{% block main %}', brandingData);

        res.send(renderedLayout);
    } catch (err) {
        console.error("Error reading file:", err);
        next(err);
    }
});

//* '/archivingBox' 경로에 대한 라우터 설정 - 비동기 처리
app.get('/archivingBox', async (req, res, next) => {
    try {
        // Reading html
        const headerData = await fs.readFile('views/header.html', 'utf8');
        const footerData = await fs.readFile('views/footer.html', 'utf8');
        const footer2Data = await fs.readFile('views/footer2.html', 'utf8');
        const layoutData = await fs.readFile('views/layout.html', 'utf8');
        const archivingBoxIntroData = await fs.readFile('views/archivingBoxIntro.html', 'utf8');
        const archivingBoxData = await fs.readFile('views/archivingBox.html', 'utf8');


        let renderedLayout = layoutData.replace('{% block layout %}', layoutData);
        renderedLayout = renderedLayout.replace('{% block header %}', headerData);
        renderedLayout = renderedLayout.replace('{% block footer %}', footerData);
        renderedLayout = renderedLayout.replace('{% block footer2Data %}', footer2Data);
        renderedLayout = renderedLayout.replace('{% block archivingBox %}', archivingBoxData);
        renderedLayout = renderedLayout.replace('{% block archivingBoxIntro %}', archivingBoxIntroData);

        res.send(renderedLayout);
    } catch (err) {
        console.error("Error reading file:", err);
        next(err);
    }
});

//* '/leaflet' 경로에 대한 라우터 설정 - 비동기 처리
app.get('/leaflet', async (req, res, next) => {
    try {
        // Reading html
        const headerData = await fs.readFile('views/header.html', 'utf8');
        const footerData = await fs.readFile('views/footer.html', 'utf8');
        const footer2Data = await fs.readFile('views/footer2.html', 'utf8');
        const layoutData = await fs.readFile('views/layout.html', 'utf8');
        const leafletIntroData = await fs.readFile('views/leafletIntro.html', 'utf8');
        const leafletData = await fs.readFile('views/leaflet.html', 'utf8');


        let renderedLayout = layoutData.replace('{% block layout %}', layoutData);
        renderedLayout = renderedLayout.replace('{% block header %}', headerData);
        renderedLayout = renderedLayout.replace('{% block footer %}', footerData);
        renderedLayout = renderedLayout.replace('{% block footer2Data %}', footer2Data);
        renderedLayout = renderedLayout.replace('{% block reaflet %}', leafletData);
        renderedLayout = renderedLayout.replace('{% block reafletIntro %}', leafletIntroData);

        res.send(renderedLayout);
    } catch (err) {
        console.error("Error reading file:", err);
        next(err);
    }
});

//* '/measurement' 경로에 대한 라우터 설정 - 비동기 처리
app.get('/measurement', async (req, res, next) => {
    try {
        // Reading html
        const headerData = await fs.readFile('views/header.html', 'utf8');
        const footerData = await fs.readFile('views/footer.html', 'utf8');
        const footer2Data = await fs.readFile('views/footer2.html', 'utf8');
        const layoutData = await fs.readFile('views/layout.html', 'utf8');
        const measurementIntroData = await fs.readFile('views/measurementIntro.html', 'utf8');
        const measurementData = await fs.readFile('views/measurement.html', 'utf8');

        let renderedLayout = layoutData.replace('{% block layout %}', layoutData);
        renderedLayout = renderedLayout.replace('{% block header %}', headerData);
        renderedLayout = renderedLayout.replace('{% block footer %}', footerData);
        renderedLayout = renderedLayout.replace('{% block footer2Data %}', footer2Data);
        renderedLayout = renderedLayout.replace('{% block measurement %}', measurementData);
        renderedLayout = renderedLayout.replace('{% block measurementIntro %}', measurementIntroData);

        res.send(renderedLayout);
    } catch (err) {
        console.error("Error reading file:", err);
        next(err);
    }
});

//* '/homesweethome' 경로에 대한 라우터 설정 - 비동기 처리
app.get('/homesweethome', async (req, res, next) => {
    try {
        // Reading html
        const headerData = await fs.readFile('views/header.html', 'utf8');
        const footerData = await fs.readFile('views/footer.html', 'utf8');
        const footer2Data = await fs.readFile('views/footer2.html', 'utf8');
        const layoutData = await fs.readFile('views/layout.html', 'utf8');
        const homesweethomeIntroData = await fs.readFile('views/homesweethomeIntro.html', 'utf8');
        const homesweethomeData = await fs.readFile('views/homesweethome.html', 'utf8');

        let renderedLayout = layoutData.replace('{% block layout %}', layoutData);
        renderedLayout = renderedLayout.replace('{% block header %}', headerData);
        renderedLayout = renderedLayout.replace('{% block footer %}', footerData);
        renderedLayout = renderedLayout.replace('{% block footer2Data %}', footer2Data);
        renderedLayout = renderedLayout.replace('{% block homesweethome %}', homesweethomeData);
        renderedLayout = renderedLayout.replace('{% block homesweethomeIntro %}', homesweethomeIntroData);

        res.send(renderedLayout);
    } catch (err) {
        console.error("Error reading file:", err);
        next(err);
    }
});

//* '/books' 경로에 대한 라우터 설정 - 비동기 처리
app.get('/books', async (req, res, next) => {
    try {
        // Reading html
        const headerData = await fs.readFile('views/header.html', 'utf8');
        const footerData = await fs.readFile('views/footer.html', 'utf8');
        const footer2Data = await fs.readFile('views/footer2.html', 'utf8');
        const layoutData = await fs.readFile('views/layout.html', 'utf8');
        const booksIntroData = await fs.readFile('views/booksIntro.html', 'utf8');
        const bookseData = await fs.readFile('views/books.html', 'utf8');

        let renderedLayout = layoutData.replace('{% block layout %}', layoutData);
        renderedLayout = renderedLayout.replace('{% block header %}', headerData);
        renderedLayout = renderedLayout.replace('{% block footer %}', footerData);
        renderedLayout = renderedLayout.replace('{% block footer2Data %}', footer2Data);
        renderedLayout = renderedLayout.replace('{% block books %}', bookseData);
        renderedLayout = renderedLayout.replace('{% block booksIntro %}', booksIntroData);

        res.send(renderedLayout);
    } catch (err) {
        console.error("Error reading file:", err);
        next(err);
    }
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

