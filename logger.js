const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: 'info',
    format: format.json(),
    transports: [
        new transports.File({ filename: 'combined.log' }),
    ],
});

if (process.env.NODE_ENV !== 'projuction') {
    logger.add(new transports.Console({ format: format.simple() }));
}

module.exports = logger;