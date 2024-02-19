const express = require('express');
const Page = require('../models/page');

const router = express.Router();

router.route('/')      
    // * 일부 내용만 추출해 brandingRouter.html파일로 연결
.get(async (req, res, next) => {
    try {
        const pages = await Page.findAll({ where: { id: 2 } });
        const page = pages[0]; 
        res.render('brandingRouter', { page });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;