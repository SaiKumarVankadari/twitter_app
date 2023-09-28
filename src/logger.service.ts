import { Injectable } from "@nestjs/common";
import { createLogger, format, transports } from "winston";

@Injectable()
export class LoggerService {
  private logger = createLogger({
    level: 'silly', // Set the lowest log level to capture all log levels
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.printf(({ timestamp, level, message }) => {
        const colors = {
          error: '\x1b[31m', // Red for error
          warn: '\x1b[33m',  // Yellow for warn
          info: '\x1b[32m',  // Green for info
          verbose: '\x1b[36m', // Cyan for verbose
          debug: '\x1b[35m',   // White for debug
          silly: '\x1b[35m',   // Magenta for silly (custom color)
        };

        const color = colors[level] || ''; // Apply the color based on the log level
        const resetColor = '\x1b[0m'; // Reset color after the message

        return `${color}[${timestamp}] [${level.toUpperCase()}]: ${message}${resetColor}`;
      }),
    ),
    transports: [
      new transports.Console(),
    ]
  });

  log(message: string) {
    this.logger.log('info', message);
  }

  error(message: string) {
    this.logger.error(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  info(message: string) {
    this.logger.info(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }

  silly(message: string) {
    this.logger.silly(message);
  }
}
