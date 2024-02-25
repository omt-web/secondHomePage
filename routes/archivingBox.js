const express = require('express');
const Page = require('../models/page');

const router = express.Router();

router.route('/')      
    // * 일부 내용만 추출해 brandingRouter.html파일로 연결
    .get(async (req, res, next) => {
    
    res.locals.title = 'Archiving Box';      // * Set the title

    try {
        const pages = await Page.findAll({ where: { id: 6 } });
        const page = pages[0]; 
        res.render('archivingBoxRouter', { page });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;