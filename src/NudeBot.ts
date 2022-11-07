import { Telegraf, Context } from 'telegraf';
import CommandMiddleware from './middleware/commands';
import Logger from './logger';

const DOMAIN = 'NudeBot';

export default class NudeBot {
  private bot: Telegraf<Context>;
  private commandMiddleware: CommandMiddleware;

  constructor() {
    try {
      this.bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
      this.commandMiddleware = new CommandMiddleware(this.bot);
      this.bot.start((ctx) => {
        Logger.info(`Client ${ctx.from.username} has been joined`)
        ctx.reply('Welcome')
      });
    } catch(err) {
      Logger.error(err.message, DOMAIN);
      throw new Error(err.message);
    }
  }

  public launch(): Promise<boolean> {
    return this.bot.launch()
      .then(() => {
        Logger.info('Bot was started', DOMAIN);
        return true;
      })
      .catch(err => {
        console.log(err.message);
        throw new Error(err)
      });
  }

  public commands() {
    this.commandMiddleware.onGetPictures();
    this.commandMiddleware.onGetTutorials();
    this.commandMiddleware.onGetVideos();
  }
}
