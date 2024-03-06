const express = require('express');
const Page = require('../models/page');

const router = express.Router();

router.route('/')      
    .get(async (req, res, next) => {
    
    res.locals.title = 'Books';

    try {
        const page = await Page.findAll({ where: { id: 5 } });
        const modifiedPages = page.map(page => {
            return {
                ...page._doc,
                participants: page.participants.replace(/,/g,  '\n')
            };
        });
        res.render('booksRouter', { page, modifiedPages });

    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/', async (req, res) => {
    const pageId = req.body.pageId; // 페이지 ID를 요청에서 가져옴

    try {
        const page = await Page.findByPk(pageId);
        if (!page) {
            res.status(404).send('Page not found');
            return;
        }
        page.heart += 1;
        await page.save();
        console.log('Heart count updated successfully');
    } catch (err) {
        console.error('Error updating heart count: ' + err.stack);
    }
});

module.exports = router;