export enum LogLevel {
    ERROR = 1,
    WARN,
    INFO,
    DEBUG,
} 

export default class Logger {
    private static logLevel: LogLevel;

    public static init(logLevel: LogLevel): void {
        this.logLevel = logLevel
    }

    public static debug(msg: string, domain?: string): void {
        if (!this.logLevel) {
            throw new Error('log level has not been initialized');
        } else if (this.logLevel >= LogLevel.DEBUG) {
            console.log(`[${this.getCurrentTime()}]:[DEBUG]${domain ? `:[${domain}]` : ''}: ${msg}`)
        }
    }

    public static info(msg: string, domain?: string): void {
        if (!this.logLevel) {
            throw new Error('log level has not been initialized')
        } else if (this.logLevel >= LogLevel.INFO) {
            console.log(`[${this.getCurrentTime()}]:[INFO]${domain ? `:[${domain}]` : ''}: ${msg}`)
        }
    }
    
    public static warn(msg: string, domain?: string): void {
        if (!this.logLevel) {
            throw new Error('log level has not been initialized')
        } else if ((this.logLevel >= LogLevel.WARN)) {
            console.log(`[${this.getCurrentTime()}]:[WARN]${domain ? `:[${domain}]` : ''}: ${msg}`);
        }
    }

    public static error(msg: string, domain?: string): void {
        if (!this.logLevel) {
            throw new Error('log level has not been initialized')
        } else if ((this.logLevel >= LogLevel.ERROR)) {
            console.log(`[${this.getCurrentTime()}]:[ERROR]${domain ? `:[${domain}]` : ''}: ${msg}`);
        }
    }

    private static getCurrentTime(): string {
        const date = new Date();
        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }
}
