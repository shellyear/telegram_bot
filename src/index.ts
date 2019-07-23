import Logger, { LogLevel } from './logger';
import NudeBot from './NudeBot';
import MyDB from './db/mydb';

require('dotenv').config();


Logger.init(LogLevel.DEBUG);
MyDB.init();
const nudeBot = new NudeBot();
nudeBot.commands();
nudeBot.launch();
