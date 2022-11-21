import { ErrorResponse, Photo, PhotosWithTotalResults, Video, Videos } from 'pexels';
import { PexelsClient } from '../index';
import Logger from '../logger';

require('dotenv').config();

const DOMAIN = 'PexelsService'
export default class PexelsService {
  public getPictures(query: string, perPage: number = 5, page: number = 1): Promise<string[]> {
    return PexelsClient.photos.search({ per_page: perPage, page, query }).then((res: PhotosWithTotalResults) => {
      return res.photos.map((photo: Photo) => photo.url)
    }).catch((err: ErrorResponse) => {
      Logger.error(err.error, DOMAIN)
      return []
    })
  }

  public getVideos(query: string, perPage: number = 5, page: number = 1): Promise<string[]> {
    return PexelsClient.videos.search({ per_page: perPage, page, query }).then(({ videos }: Videos) => {
      const result: string[] = videos.flatMap((video: Video) => video.video_files[0]).map(videoFile => videoFile.link)
      return result
    }).catch((err: ErrorResponse) => {
      console.log(err)
      return []
    })
  }
}