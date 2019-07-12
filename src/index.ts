import Telegraf from 'telegraf';
import CommandMiddleware from './middleware/commands';
const debug = require('debug')('index');

require('dotenv').config();


const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const commandMiddleware = new CommandMiddleware(bot);

bot.start((ctx) => ctx.reply('Welcome'));

commandMiddleware.onGetPictures();
commandMiddleware.onGetTutorials();
commandMiddleware.onGetVideos();

bot.launch()
  .then(() => {
    console.log('Bot was started');
  })
  .catch(e => console.log(e.message));
