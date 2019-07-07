import Telegraf, { ContextMessageUpdate } from "telegraf";
import CommandsController from "../controllers/commands";
import commands from '../helpers/commandTypes';

const commandsController = new CommandsController();

export default class CommandMiddleware {
  private _bot: Telegraf<ContextMessageUpdate>;

  constructor(bot: Telegraf<ContextMessageUpdate>) {
    this._bot = bot;
  }

  public onGetPictures() {
    this._bot.command(commands.PICTURE, commandsController.getPictures);
  }
  public onGetVideos() {
    this._bot.command(commands.VIDEO, commandsController.getVideos);
  }
  public onGetTutorials() {
    this._bot.command(commands.TUTORIAL, commandsController.getTutorials);
  }
}