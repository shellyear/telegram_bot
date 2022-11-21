import Telegraf, { Context, Composer } from "telegraf";
import CommandsControllers from "../controllers/commands";
import commands from '../helpers/commandTypes';
import Logger from "../logger";

const commandsController = new CommandsControllers();

const DOMAIN = 'CommandMiddleware'
export default class CommandMiddleware {
  private _bot: Telegraf<Context>;

  constructor(bot: Telegraf<Context>) {
    this._bot = bot;
  }

  public onGetPictures(): Composer<Context> {
    try {
      return this._bot.command(commands.PICTURE, commandsController.getPictures);
    } catch (err) {
      Logger.error(err.message, DOMAIN)
    }
  }
  public onGetVideos() {
    return this._bot.command(commands.VIDEO, commandsController.getVideos);
  }
  public onGetTutorials() {
    return this._bot.command(commands.TUTORIAL, commandsController.getTutorials);
  }
}