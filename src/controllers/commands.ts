import { ContextMessageUpdate } from "telegraf";
import PexelsService from "../services/pexelsService";
import CourseHunters from "../services/courseHunters";
import commands from '../helpers/commandTypes';
import Logger from '../logger';

const DOMAIN = 'CommandControllers'
export default class CommandsControllers {
  private pexelsService: PexelsService;
  private courseHunters: CourseHunters;

  constructor() {
    this.pexelsService = new PexelsService();
    this.courseHunters = new CourseHunters();
    this.getPictures = this.getPictures.bind(this)
    this.getTutorials = this.getTutorials.bind(this)
    this.getVideos = this.getVideos.bind(this)
  }
  

  public getPictures(ctx: ContextMessageUpdate) {
    const text = this.clearCommandFromRequest(ctx.update.message.text, commands.PICTURE);
    this.pexelsService.getPictures(text) 
    .then((photos: string[]) => {
      Logger.debug(`found photos: ${photos.length}`, DOMAIN)
      if (!photos) {
        ctx.reply('NO PHOTOS :(');    
      } else {
        photos.forEach((photo) => {
          ctx.replyWithPhoto(photo)
        });
      }
    })
    .catch((err: Error) => {
      console.log(err.message);
      ctx.reply('NO PHOTOS :(');
    });
  }
  
  public getVideos(ctx: ContextMessageUpdate) {
    const text = this.clearCommandFromRequest(ctx.update.message.text, commands.VIDEO);
  
    return this.pexelsService.getVideos(text) 
    .then((videos: string[]) => {
      if (!videos) {
        ctx.reply('NO VIDEOS :(');    
      } else {
        videos.forEach((video) => {
          ctx.replyWithVideo(video)
        });
      }
    })
    .catch((err: Error) => {
      ctx.reply('NO VIDEOS :(');    
      console.log(err.message);
    });
  }
  
  public getTutorials(ctx: ContextMessageUpdate) {

    const text = this.clearCommandFromRequest(ctx.update.message.text, commands.TUTORIAL);
  
    this.courseHunters.getTutorial(text)
    .then((data) => {       
      if (!data) {
        ctx.reply('NO TUTORIALS :(');
      } else {
        data.forEach(tutorial => {
          ctx.replyWithHTML(tutorial);
        })
      }
    })
    .catch((err) => {
      console.log(err.message);
      ctx.reply('NO TUTORIALS :(');
    });
  }  
    
  private clearCommandFromRequest(requestString: string, command: string): string {
    return requestString.replace(new RegExp(`\/${command}\\s\+`), '');
  }

}
