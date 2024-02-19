const Sequelize = require('sequelize');

class Page extends Sequelize.Model {
    // * 테이블에 대한 설정
    static initiate(sequelize) {
        Page.init({
            name: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            date: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            participants: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            version: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            explanation: {
                type: Sequelize.TEXT,
                allowNull: false,
                defaultValue: null,
            },
            heart: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false, // heart 컬럼은 null 값을 허용하지 않음
                defaultValue: 0, // heart 컬럼의 기본값은 0
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Page',
            tableName: 'page',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    // * 다른 모델과의 관계. (없으므로 공백)
    static associate(db) {       
    }
};

module.exports = Page;