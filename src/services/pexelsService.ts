import axios from 'axios';
import { PhotosWithTotalResults } from 'pexels';
import { PexelsClient } from '../index';

require('dotenv').config();

const PEXELS_PICTURE_API_URL = 'https://api.pexels.com/v1/search?'
const PEXELS_VIDEO_API_URL = 'https://api.pexels.com/videos/'

type VideoSrc = { 
  video_files: { link: string }[]
}

export default class PexelsService {
  private TOKEN: string;
  
  constructor() {
    this.TOKEN = process.env.PEXELS_API_KEY;
  }

  public getPictures(query: string, perPage: number = 5, page: number = 1): any {
    console.log({ query, queryString: `${PEXELS_PICTURE_API_URL}query=${encodeURI(query)}&per_page=${perPage}&page=${page}` })
    return PexelsClient.photos.search({ per_page: perPage, page, query }).then(res => {
      console.log({ res })
      return res
    }).catch(err => {
      console.log({ err })
    })
  }

  public getVideos(query: string, perPage: number = 5, page: number = 1): Promise<string[]> {
    return axios.get(`${PEXELS_VIDEO_API_URL}query=${encodeURI(query)}&per_page=${perPage}&page=${page}`, {
      headers:{
        'Authorization': this.TOKEN
      }
    })
    .then(({data}) => {
      const {videos} = data;
      return videos.map((src: VideoSrc) => {
        return src.video_files[0].link;
      });
    })
    .catch((err) => {
      console.log(err.message);
      return [];
    });
  }
}