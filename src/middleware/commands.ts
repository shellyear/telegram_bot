import Telegraf, { ContextMessageUpdate, Composer } from "telegraf";
import CommandsControllers from "../controllers/commands";
import commands from '../helpers/commandTypes';

const commandsController = new CommandsControllers();

export default class CommandMiddleware {
  private _bot: Telegraf<ContextMessageUpdate>;

  constructor(bot: Telegraf<ContextMessageUpdate>) {
    this._bot = bot;
  }

  public onGetPictures(): Composer<ContextMessageUpdate> {
    try {
      return this._bot.command(commands.PICTURE, commandsController.getPictures);
    } catch (err) {
      // log /
      throw new Error('error description')
    }
  }
  public onGetVideos() {
    return this._bot.command(commands.VIDEO, commandsController.getVideos);
  }
  public onGetTutorials() {
    return this._bot.command(commands.TUTORIAL, commandsController.getTutorials);
  }
}