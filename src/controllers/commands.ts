import { ContextMessageUpdate } from "telegraf";
import PexelsService from "../services/pexelsService";
import CourseHunters from "../services/courseHunters";
import commands from '../helpers/commandTypes';

const pexelsService = new PexelsService();
const courseHunters = new CourseHunters();

export default class CommandsControllers {
  constructor() {}

  public getPictures(ctx: ContextMessageUpdate) {
    const text = this.clearCommandFromRequest(ctx.update.message.text, commands.PICTURE);
    pexelsService.getPictures(text) 
    .then((photos: string[]) => {
      if (!photos) {
        ctx.reply('NO PHOTOS :(');    
      } else {
        photos.forEach((photo) => {
          ctx.replyWithPhoto(photo)
        });
      }
    })
    .catch((e: Error) => {
      console.log(e.message);
      ctx.reply('NO PHOTOS :(');    
    });
  }
  
  public getVideos(ctx: ContextMessageUpdate) {
    const text = this.clearCommandFromRequest(ctx.update.message.text, commands.VIDEO);
  
    pexelsService.getVideos(text) 
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
      console.log(err.message);
      ctx.reply('NO VIDEOS :(');    
    });
  }
  
  public getTutorials(ctx: ContextMessageUpdate) {
    const text = this.clearCommandFromRequest(ctx.update.message.text, commands.TUTORIAL);
  
    courseHunters.getTutorial(text)
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
