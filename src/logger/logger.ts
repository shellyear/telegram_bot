const loglevels = {
    none: 'none',
    error: 'error',
    warn: 'warn',
    info: 'info',
    debug: 'debug'
}


export default class Logger {
    constructor () {}

    public init (logLevel: string) {
        switch() {
            
        }
    }

    public info (msg: any) {
        console.log([new Date()], ['INFO'], [module.parent.filename], [msg])
    }

    public error (msg: any) {
        console.log([new Date()], ['ERROR'], [module.parent.filename], [msg]);
    }

    public warn (msg: any) {
        console.log([new Date()], ['WARN'], [module.parent.filename], [msg]);
    }

    public debug(msg: any) {
        console.log([new Date()], ['DEBUG'], [module.parent.filename], [msg])
    }
}



