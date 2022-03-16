import { createLogger, format, transports, addColors } from 'winston'

// https://github.com/winstonjs/winston#logging
// { error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6 }
const level = process.env.NODE_ENV !== 'production' ? 'debug' : 'error'

function formatParams(info) {
	const { timestamp, level, message, ...args } = info
	const ts = timestamp.slice(0, 19).replace('T', ' ')

	return `${ts} ${level}: ${message} ${
		Object.keys(args).length ? JSON.stringify(args, '', '') : ''
	}`
}

addColors({
	error: 'red',
	warn: 'yellow',
	info: 'green',
	http: 'magenta',
	debug: 'white',
})

const logFormat = format.combine(
	format.colorize({ all: true }),
	format.timestamp(),
	format.align(),
	format.printf(formatParams)
)

let Logger

if (process.env.NODE_ENV !== 'production') {
	Logger = createLogger({
		level: level,
		format: logFormat,
		transports: [new transports.Console()],
	})
} else {
	Logger = createLogger({
		level: level,
		format: logFormat,
		transports: [
			new transports.Console(),
			// new transports.File({ filename: '../logs/error.log', level: 'error' }),
			// new transports.File({ filename: '../logs/combined.log' }),
		],
	})
}

export default Logger
