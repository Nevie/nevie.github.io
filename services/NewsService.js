import {Error} from "../view/Error.js";
import config from "../config.js";

export class NewsService {

    static getChannels() {
        const path = `${config.apiUrl}/sources?apiKey=${config.apiKey}`;
        return fetch(path)
            .then(function (response) {
                return response.ok ? response.json() : Promise.reject(response);
            })
            .catch(Error.drawDataError());
    }

    static getNews(chanel) {
        const path = `${config.apiUrl}/top-headlines?sources=${chanel}&apiKey=${config.apiKey}`;
        return fetch(path)
            .then(function (response) {
                return response.ok ? response.json() : Promise.reject(response);
            })
            .catch(Error.drawDataError());
    }
}