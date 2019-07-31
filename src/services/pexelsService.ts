import axios from 'axios';
import Logger from '../logger';

require('dotenv').config();

const PEXELS_PICTURE_API_URL = 'https://api.pexels.com/v1/search?';
const PEXELS_VIDEO_API_URL = 'https://api.pexels.com/videos/search?';
const DOMAIN = 'services/pexelsService.ts';

type VideoSrc = { 
  video_files: { link: string }[]
}

export default class PexelsService {
  private TOKEN: string;
  
  constructor() {
    this.TOKEN = process.env.PEXELS_API_KEY;
  }

  public getPictures(query: string, perPage: number = 5, page: number = 1): Promise<string[]> {
    return axios.get(`${PEXELS_PICTURE_API_URL}query=${encodeURI(query)}&per_page=${perPage}&page=${page}`, {
      headers:{
        'Authorization': this.TOKEN
      }
    })
    .then(({data}) => {
      Logger.debug(`Founded pictures: ${data.photos}`, DOMAIN);
      const {photos} = data;
      return photos.map(({src: {medium}}: { src: { medium: string } }) => {
        return medium;
      });
    })
    .catch((err) => {
      Logger.error(err.message, DOMAIN);
      return Promise.reject(err);
    });
  }

  public getVideos(query: string, perPage: number = 5, page: number = 1): Promise<string[]> {
    return axios.get(`${PEXELS_VIDEO_API_URL}query=${encodeURI(query)}&per_page=${perPage}&page=${page}`, {
      headers:{
        'Authorization': this.TOKEN
      }
    })
    .then(({data}) => {
      Logger.debug(`Founded videos: ${data.length}`);
      const {videos} = data;
      return videos.map((src: VideoSrc) => {
        return src.video_files[0].link;
      });
    })
    .catch((err) => {
      Logger.error(err.message, DOMAIN);
      return Promise.reject(err);
    });
  }
}