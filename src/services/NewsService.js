import {appConfig} from "../../config.js";

export class NewsService {

    static async getChannels() {
        const path = `${appConfig.apiUrl}/sources?apiKey=${appConfig.apiKey}`;
        try {

            let response = await fetch(path);
            return response.ok ? await response.json() : Promise.reject();

        }catch (e) {
            return Promise.reject();
        }
    }

    static async getNews(chanel) {
        const path = `${appConfig.apiUrl}/top-headlines?sources=${chanel}&apiKey=${appConfig.apiKey}`;
        try {
            let response = await fetch(path);
            return response.ok ? await response.json() : Promise.reject();
        }
        catch (e) {
            return Promise.reject();
        }
    }
}