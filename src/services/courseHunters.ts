import axios from 'axios'
import * as cheerio from 'cheerio';

const SEARCH_URL = 'https://coursehunters.net/search?q=';

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
      console.log(err.message);
      return [];
    });
  }
}
