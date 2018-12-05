import {NewsService} from "../services/NewsService.js";
import {NewsView} from "../view/NewsView.js";
import {appConfig} from "../../config.js";
import {MainView} from "../view/MainView";
import {HTTPRequestFactory} from "../factory/HTTPRequestFactory";
import {RequestsType} from "../models/RequestsTypes";
import {traceMethodCalls} from "../helpers/proxy";
import {ChannelView} from "../view/ChannelsView";

export class NewsController {

    constructor(element) {
        this.page = element;

        this.service = traceMethodCalls(new NewsService(HTTPRequestFactory.requestService(RequestsType.GET)));

        this.mainView = new MainView(this.page);
        this.channelView = new ChannelView(this.page);
        this.newsView = new NewsView(this.page);

        this.addSubscriptions();
    }

    async init() {
        this.mainView.draw(this.page);
        try {
           const channels = await this.refreshChannels();
           if(channels.length){
               await this.refreshNews(channels[0].id);
           }
        } catch (e) {
            await this.showError(e)
        }
    }

    addSubscriptions() {
        this.channelView.subscribe('getNewsByChanel', this.refreshNews.bind(this));
        this.channelView.subscribe('onNextClick', this.onNextClick.bind(this));
        this.channelView.subscribe('scrollTop', this.scrollTop.bind(this));
    }

    async refreshNews(id) {
        try {
            const news = await this.service.getNews(id);
            this.initNews(news);
        } catch (e) {
            await this.showError(e)
        }
    }

    async refreshChannels() {
        let channels;
        try {
            channels = await this.service.getChannels();
            this.initChannels(channels);
        } catch (e) {
            await this.showError(e)
        }
        return channels;
    }

    initChannels(channels) {
        this.channelView.draw(channels);
    }

    initNews(articles) {
        this.newsView.draw(articles);
    }

    scrollTop() {
        window.scrollTo(0, 0);
    }

    onNextClick() {
        let randomChannels = NewsService.availableChannels.sort(() => .5 - Math.random()).slice(0, appConfig.numberOfChannels);
        this.channelView.draw(randomChannels, true);
    }

    async showError(err) {
        const {Error} = await import(/* webpackChunkName: "Error" */ '../view/Error.js');
        this.error = new Error(this.page);
        this.error.draw(err);
    }
}
