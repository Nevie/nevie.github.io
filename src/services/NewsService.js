import {appConfig} from "../../config.js";
import {Channel} from "../models/Channel";
import {News} from "../models/News";

export class NewsService {
    constructor(executeQuery) {
        this.executeQuery = executeQuery;
    }

    static availableChannels = [];

    async getChannels() {
        const path = `${appConfig.apiUrl}/sources?apiKey=${appConfig.apiKey}`;
        let data = await this.executeQuery(path);
        return this.createChannelsModel(data);
    }

    async getNews(chanel) {
        const path = `${appConfig.apiUrl}/top-headlines?sources=${chanel}&apiKey=${appConfig.apiKey}`;
        let data = await this.executeQuery(path);

        return this.createNewsModel(data);
    }

    createChannelsModel({sources}) {
        let data;
        data = sources.map(item => {
            return new Channel(item.id, item.name, item.description);
        });
        NewsService.availableChannels = data;
        return data.sort(() => .5 - Math.random()).slice(0, appConfig.numberOfChannels);
    }

    createNewsModel({articles}) {
        let data;
        data = articles.map(item => {
            return new News(item.author, item.description, item.publishedAt, item.title, item.url, item.urlToImage, item.source);
        });

        return data.sort(() => .5 - Math.random()).slice(0, appConfig.numberOfNews);
    }
}