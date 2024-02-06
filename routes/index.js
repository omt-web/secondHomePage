const express = require('express');

const router = express.Router();

// GET / 라우터
router.get('/', (req, res) => {
    // res.send('Hello, Express. router folder test');
    res.render('index');    //* views 내의 index.html 파일로 연결
});

module.exports = router;