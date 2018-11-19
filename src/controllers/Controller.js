import {Channel} from "../models/Channel.js";
import {NewsService} from "../services/NewsService.js";
import {NewsChannelView} from "../view/NewsChannelView.js";
import {Error} from "../view/Error.js";
import {News} from "../models/News.js";
import {appConfig} from "../../config.js";

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
        let randomChannels = [] = data.sort(() => .5 - Math.random()).slice(0, appConfig.numberOfChannels);
        this.getNewsByChanel(randomChannels[0].id);
        let chn = this.page.querySelector("#currentChanel");
        chn.innerText = randomChannels[0].name;
        this.page.querySelector("#channelsBlock ul").insertAdjacentHTML('beforeend', NewsChannelView.drawChannelList(randomChannels));
        this.attachChanelEvents();
    }

    receiveNews(posts) {
        let data = [];
        if (posts["articles"]) {
            let chn = this.page.querySelector("#currentChanel");
            chn.innerText = posts["articles"][0].author;

            data = posts["articles"].map(item => {
                return new News(item.author, item.description, item.publishedAt, item.title, item.url, item.urlToImage);
            });
        }
        let channels = data.slice(0, appConfig.numberOfNews);
        this.page.querySelector("#newsBlock ul").insertAdjacentHTML('beforeend', NewsChannelView.drawNewsList(channels));
    }

    getNewsChannels() {
        NewsService.getChannels()
            .then(this.receiveChannels.bind(this))
            .catch(Error.drawDataError.bind(this, this.page));
    }

    getNewsByChanel(chanel) {
        if(!chanel) return;
        NewsService.getNews(chanel)
            .then(this.receiveNews.bind(this))
            .catch(Error.drawDataError.bind(this, this.page));
    }

    attachChanelEvents() {
        this.page.querySelector("div#channelsBlock").addEventListener('click', this.onChanelSelect.bind(this));
        let btn = document.querySelector("#nextChannels");
        btn.addEventListener('click', this.onNextClick.bind(this));
    }

    onNextClick() {
        let el = this.page.querySelector("#channelsBlock ul");
        let randomChannels = this.avalibleChanels.sort(() => .5 - Math.random()).slice(0, appConfig.numberOfChannels);
        el.innerText = NewsChannelView.drawChannelList(randomChannels);
        window.scrollTo(0, 0);
    }

    onChanelSelect(event) {
        event.stopPropagation();
        this.page.querySelector("#newsBlock ul").innerHTML = '';
        this.getNewsByChanel(event.target.id);
    }
}
