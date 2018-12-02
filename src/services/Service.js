import {appConfig} from "../../config.js";
import {Channel} from "../models/Channel";
import {Error} from "../view/Error";
import {News} from "../models/News";

export class Service {
    constructor(){
        this.error = Error.getInstance();
    }

    static availableChannels = [];

    async executeQuery(query) {
        let response = await fetch(query);
        return response.ok ? response.json() : Promise.reject("");
    }

    async getChannels() {
        const path = `${appConfig.apiUrl}/sources?ap  wiKey=${appConfig.apiKey}`;
        let result = [];
        await this.executeQuery(path).then(data => {
                result = this.createChannelsModel(data)
            },
            () => {
                this.error.drawDataError()
            });

        return result;
    }

    async getNews(chanel) {
        const path = `${appConfig.apiUrl}/top-headlines?sources=${chanel}&apiKey=${appConfig.apiKey}`;
        let result = [];
        await this.executeQuery(path).then(data => {
                result = this.createNewsModel(data)
            },
            () => {
                this.error.drawDataError()
            });

        return result;
    }

    createChannelsModel({sources}) {
        let data;
        data = sources.map(item => {
            return new Channel(item.id, item.name, item.description);
        });
        Service.availableChannels = data;
        return data.sort(() => .5 - Math.random()).slice(0, appConfig.numberOfChannels);
    }

    createNewsModel({articles}) {
        let data;
        data = articles.map(item => {
            return new News(item.author, item.description, item.publishedAt, item.title, item.url, item.urlToImage);
        });

        return data.sort(() => .5 - Math.random()).slice(0, appConfig.numberOfNews);
    }
}