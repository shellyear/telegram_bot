import Telegraf, { ContextMessageUpdate } from 'telegraf';
import CommandMiddleware from './middleware/commands';
import Logger from './logger';

const DOMAIN = 'NudeBot';

export default class NudeBot {
  private bot: Telegraf<ContextMessageUpdate>;
  private commandMiddleware: CommandMiddleware;

  constructor() {
    try {
      this.bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
      this.commandMiddleware = new CommandMiddleware(this.bot);
      this.bot.start((ctx) => {
        Logger.info(`Client ${ctx.from.username} has been joined`)
        ctx.reply('Welcome')
      })
    } catch (err) {
      Logger.error(err.message, DOMAIN);
      throw err;
    }
  }

  public launch(): Promise<boolean> {
    return this.bot.launch()
      .then(() => {
        Logger.info('Bot was started', DOMAIN);
        return true;
      })
      .catch((err) => {
        Logger.error(err.message, DOMAIN);
        return Promise.reject(err);
      });
  }

  public commands() {
    try {
      this.commandMiddleware.onGetPictures();
      this.commandMiddleware.onGetVideos();
      this.commandMiddleware.onGetTutorials();
      return true;
    } catch (err) {
      Logger.error(err.message, DOMAIN)
      throw err;
    }
  }
}
