'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};
const Page = require('./page');
const Member = require('./member');

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.Page = Page;
db.Member = Member;

Page.initiate(sequelize);
Member.initiate(sequelize);

// * 두 모델 간의 관계 설정
// Page.associate(db);
// Member.associate(db);

module.exports = db;