const express = require('express');
const Member = require('../models/member');

const router = express.Router();

router.route('/')      
    // * 일부 내용만 추출해 brandingRouter.html파일로 연결
    .get(async (req, res, next) => {
    
    res.locals.title = 'Members Interview';      // * Set the title

    try {
        const members = await Member.findAll({ where: {} });
        const member1 = members[0]; 
        const member2 = members[1]; 
        const member3 = members[2]; 
        const member4 = members[3]; 
        const member5 = members[4]; 
        const member6 = members[5]; 
        const member7 = members[6]; 
        const member8 = members[7]; 
        const member9 = members[8]; 
        const member10 = members[9]; 
        const member11 = members[10]; 
        res.render('interviewRouter', { member1, member2, member3, member4, member5, member6, member7, member8, member9, member10, member11 });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;