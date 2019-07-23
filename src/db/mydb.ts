import * as mongoose from 'mongoose';
import * as moment from 'moment';
import Logger from '../logger';
import { Query } from './models';
import { ContextMessageUpdate } from 'telegraf';

// const changeDbPath = 'mongod --dbpath C:\Users\Нурбек\projectsJavascript\nodeJS\telegram_bot\src\mongodb\data';
const DOMAIN = 'src/db/mydb';

interface objResponse {
    _id: number,
    query: string,
    queryKey: string,
    userID: number,
    date: string,
    _v: number
}
export default class MyDB {
    
    public static init(hostname: string = 'mongodb://localhost:27017/MyDB'): void {
        mongoose.connect(hostname);
        mongoose.connection.once('open', () => {
        Logger.info('connection has been made', DOMAIN); 
        }).on('error', (err) => {
            Logger.error(err.message, DOMAIN);
        });
    }

    public static saveSearch(searchName: string, searchKey: string, userID: number): void {
        const query = new Query({
            query: searchName,
            queryKey: searchKey,
            userID: userID, 
            date: moment().format('L')
        })
        query.save().then(() => {
            Logger.debug(`${query} has been saved to MyDB to queries`, DOMAIN);
        });
    }

    public static getHistory(ctx: ContextMessageUpdate): void {
        Query.find({ userID: ctx.from.id })
        .then((res: {}[]) => {
            // ctx.reply(`${res.queryKey}: ${res.query}`);
            res.forEach((obj: objResponse) => {
                return ctx.reply(`${obj.queryKey} ${obj.query} ${obj.date}`);
            })
        })
        .catch((err: Error) => {
            Logger.debug(err.message, DOMAIN);
        });
    }

}