import Telegraf, { ContextMessageUpdate, Composer } from "telegraf";
import CommandsControllers from "../controllers/commands";
import commands from '../helpers/commandTypes';
import Logger from "../logger";

const commandsController = new CommandsControllers();
const DOMAIN = 'middleware/commands.ts';

export default class CommandMiddleware {
  private _bot: Telegraf<ContextMessageUpdate>;

  constructor(bot: Telegraf<ContextMessageUpdate>) {
    this._bot = bot;
  }

  public onGetPictures(): Composer<ContextMessageUpdate> {
    return this._bot.command(commands.PICTURE, commandsController.getPictures);
  }

  public onGetVideos() {
    return this._bot.command(commands.VIDEO, commandsController.getVideos);
  }

  public onGetTutorials() {
    return this._bot.command(commands.TUTORIAL, commandsController.getTutorials);
  }
}