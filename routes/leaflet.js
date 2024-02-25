const express = require('express');
const Page = require('../models/page');

const router = express.Router();

router.route('/')      
    .get(async (req, res, next) => {
    
    res.locals.title = 'Leaflet';

    try {
        const page = await Page.findAll({ where: { id: 2 }});
        const modifiedPages = page.map(page => {
            return {
                ...page._doc,
                participants: page.participants.replace(/,/g,  '\n')
            };
        });
        res.render('leafletRouter', { page, modifiedPages });

        //   res.json({ modifiedPages, pages });
        } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
