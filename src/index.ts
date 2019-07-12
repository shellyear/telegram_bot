import Logger, { LogLevel } from './logger';
import NudeBot from './NudeBot';

require('dotenv').config();

Logger.init(LogLevel.DEBUG);
const nudeBot = new NudeBot();
nudeBot.commands();
nudeBot.launch();
