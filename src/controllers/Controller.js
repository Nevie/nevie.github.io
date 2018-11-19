import {Channel} from "../models/Channel.js";
import {NewsService} from "../services/NewsService.js";
import {NewsChannelView} from "../view/NewsChannelView.js";
import {Error} from "../view/Error.js";
import {News} from "../models/News.js";
import config from "../../config.js";

export class Controller {
    constructor(element) {
        this.page = element;
        this.avalibleChanels = [];
    }

    receiveChannels(channels) {
        let data = [];
        if (channels["sources"]) {
            data = channels["sources"].map(item => {
                return new Channel(item.id, item.name, item.description);
            });
        }
        this.avalibleChanels = data;
        let randomChannels = [] = data.sort(() => .5 - Math.random()).slice(0, config.numberOfChannels);
        this.getNewsByChanel(randomChannels[0].id);
        this.page.querySelector("#channelsBlock ul").insertAdjacentHTML('beforeend', NewsChannelView.drawChannelList(randomChannels));
        this.attachChanelEvents();
    }

    receiveNews(posts) {
        let data = [];
        if (posts["articles"]) {
            data = posts["articles"].map(item => {
               return new News(item.author, item.description, item.publishedAt, item.title, item.url, item.urlToImage);
            });
        }
        let channels = data.slice(0, config.numberOfNews);
        this.page.querySelector("#newsBlock ul").insertAdjacentHTML('beforeend', NewsChannelView.drawNewsList(channels));
    }

    getNewsChannels() {
        NewsService.getChannels()
            .then(this.receiveChannels.bind(this))
            .catch(Error.drawDataError());
    }

    getNewsByChanel(chanel) {
        if(!chanel) return;

        let chn = this.page.querySelector("#currentChanel");
        chn.innerText = chanel;
        NewsService.getNews(chanel)
            .then(this.receiveNews.bind(this))
            .catch(Error.drawDataError());
    }

    attachChanelEvents() {
        this.page.querySelector("div#channelsBlock").addEventListener('click', this.onChanelSelect.bind(this));
        let btn = document.querySelector("#nextChannels");
        btn.addEventListener('click', this.onNextClick.bind(this));
    }

    onNextClick() {
        let el = this.page.querySelector("#channelsBlock ul");
        el.innerText = "";
        let randomChannels = this.avalibleChanels.sort(() => .5 - Math.random()).slice(0, config.numberOfChannels);
        NewsChannelView.drawChannelList(randomChannels);
        window.scrollTo(0, 0);
    }

    onChanelSelect(event) {
        event.stopPropagation();
        this.page.querySelector("#newsBlock ul").innerHTML = '';
        this.getNewsByChanel(event.target.id);
    }
}
