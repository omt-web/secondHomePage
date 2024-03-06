const express = require('express');

const router = express.Router();

// GET / 라우터
router.get('/', async (req, res) => {
    res.locals.title = 'Work';      // * Set the title

    res.render('index');    //* views 내의 index.html 파일로 연결

});

module.exports = router;