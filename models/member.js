const Sequelize = require('sequelize');

class Member extends Sequelize.Model {
    // * 테이블에 대한 설정
    static initiate(sequelize) {
        Member.init({
            name: {
                type: Sequelize.STRING(45),
                allowNull: false,
            },
            responsibility: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            questionA: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            answerA: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            questionB: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            answerB: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            questionC: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            answerC: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            questionD: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            answerD: {
                type: Sequelize.TEXT,
                allowNull: false,
            },

        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Member',
            tableName: 'member',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    // * 다른 모델과의 관계. (없으므로 공백)
    static associate(db) { }
};

module.exports = Member;