import Logger, { LogLevel } from './logger';
import NudeBot from './NudeBot';
import { createClient, PhotosWithTotalResults } from 'pexels';

export const PexelsClient = createClient(process.env.PEXELS_API_KEY)

require('dotenv').config();


Logger.init(LogLevel.DEBUG);
const nudeBot = new NudeBot();
nudeBot.commands();
nudeBot.launch();
