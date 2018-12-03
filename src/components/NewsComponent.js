import {GetDataModel} from "../services/GetDataModel.js";
import {NewsView} from "../view/NewsView.js";
import {appConfig} from "../../config.js";
import {MainTemplate} from "../view/MainTemplate";
import {Factory} from "../factory/Factory";
import {RequestsType} from "../models/RequestsTypes";
import {traceMethodCalls} from "./proxy";
import {ChannelView} from "../view/ChannelsView";

export class NewsComponent {
    static instance;

    constructor(element) {
        if(NewsComponent.instance){
            return NewsComponent.instance;
        }
        NewsComponent.instance = this;

        this.page = element;
        this.serv = Factory.requestService(RequestsType.GET);
        this.service = traceMethodCalls(this.serv);

        this.channelView = new ChannelView(this.page);
        this.newsView = new NewsView(this.page);

        return NewsComponent.instance;
    }

    init() {
        MainTemplate.drawTemplate(this.page);
        this.getChannels().then((channels) => {
            this.getNewsByChanel(channels[0].id);
        });
    }

    async getChannels() {
        let channels = await this.service.getChannels();
        this.initChannels(channels);
        return channels;
    }

    async getNewsByChanel(chanel) {
        let articles = await this.service.getNews(chanel);
        this.initNews(articles);
    }

    initChannels(channels) {
        this.channelView.drawChannels(channels);
    }

    initNews(articles) {
        this.newsView.drawNews(articles);
    }

    onNextClick() {
        let randomChannels = GetDataModel.availableChannels.sort(() => .5 - Math.random()).slice(0, appConfig.numberOfChannels);
        this.channelView.drawChannels(randomChannels, true);
        window.scrollTo(0, 0);
    }
}
