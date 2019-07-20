import axios from 'axios'
import * as cheerio from 'cheerio';
import Logger from '../logger';

const SEARCH_URL = 'https://coursehunters.net/search?q=';
const DOMAIN = 'services/courseHunters.ts'

export default class CourseHunters {
  public getTutorial (query: string): Promise<string[]> {
    return axios.get(`${SEARCH_URL}${encodeURI(query)}`)
    .then(({data}) => {
        const $: CheerioStatic = cheerio.load(data);
        const links: string[] = [];
        $('.course-details-bottom a').each((index: number, element: CheerioElement) => {
            links[index] = $(element).attr('href');
        });
        return links;
    }).catch((err) => {
      Logger.error(err.message, DOMAIN);
      return [];
    });
  }
}
