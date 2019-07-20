import { ContextMessageUpdate } from "telegraf";
import PexelsService from "../services/pexelsService";
import CourseHunters from "../services/courseHunters";
import commands from '../helpers/commandTypes';
import Logger from '../logger';

const DOMAIN = 'controllers/CommandControllers'
export default class CommandsControllers {
  private pexelsService: PexelsService;
  private courseHunters: CourseHunters;

  constructor() {
    try {
      this.pexelsService = new PexelsService();
      this.courseHunters = new CourseHunters();
      this.getPictures = this.getPictures.bind(this)
      this.getTutorials = this.getTutorials.bind(this)
      this.getVideos = this.getVideos.bind(this)
    } catch(err) {
      Logger.error(err.message, DOMAIN);
    }
  }
  

  public getPictures(ctx: ContextMessageUpdate) : Promise <boolean> {
    const text = this.clearCommandFromRequest(ctx.update.message.text, commands.PICTURE);
    return this.pexelsService.getPictures(text) 
    .then((photos: string[]) => {
      Logger.debug(`found photos: ${photos.length}`, DOMAIN);
      if (!photos || photos.length === 0) {
        Logger.debug(`No photo founded ${photos.length}`, DOMAIN);
        ctx.reply('NO PHOTOS :(');    
        return false;
      } else {
        photos.forEach((photo) => {
          ctx.replyWithPhoto(photo)
        });
        Logger.debug(`photos sended to user ${photos}`, DOMAIN);
        return true;
      }
    })
    .catch((err: Error) => {
      Logger.error(err.message, DOMAIN);
      ctx.reply('NO PHOTOS :(');
      return false;
    });
  }
  
  public getVideos(ctx: ContextMessageUpdate) : Promise <boolean> {
    const text = this.clearCommandFromRequest(ctx.update.message.text, commands.VIDEO);
  
    return this.pexelsService.getVideos(text) 
    .then((videos: string[]) => {
      Logger.debug(`Founded videos: ${videos.length}`, DOMAIN);
      if (!videos || videos.length === 0) {
        Logger.debug(`No videos founded ${videos.length}`, DOMAIN);
        ctx.reply('NO VIDEOS :(');
        return false;
      } else {
        Logger.debug(`videos sended to user ${videos}`, DOMAIN);
        videos.forEach((video) => {
          ctx.replyWithVideo(video)
        });
        return true;
      }
    })
    .catch((err: Error) => {
      Logger.error(err.message, DOMAIN);
      ctx.reply('NO VIDEOS :(');    
      return false;
    });
  }
  
  public getTutorials(ctx: ContextMessageUpdate) : Promise <boolean> {

    const text = this.clearCommandFromRequest(ctx.update.message.text, commands.TUTORIAL);
  
    return this.courseHunters.getTutorial(text)
    .then((data) => {       
      Logger.debug(`Founded tutorials: ${data.length}`, DOMAIN);
      if (!data.length) {
        Logger.debug(`No founded tutotials`, DOMAIN);
        ctx.reply('NO TUTORIALS :(');
        return false;
      } else {
        Logger.debug(`Tutorials sended to user: ${data}`, DOMAIN);
        data.forEach(tutorial => {
          ctx.replyWithHTML(tutorial);
        })
        return true;
      }
    })
    .catch((err) => {
      Logger.error(err.message, DOMAIN);
      ctx.reply('NO TUTORIALS :(');
      return false;
    });
  }  
    
  private clearCommandFromRequest(requestString: string, command: string): string {
    return requestString.replace(new RegExp(`\/${command}\\s\+`), '');
  }

}
