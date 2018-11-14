import {Channel} from "../models/Channel.js";
import {NewsService} from "../services/NewsService.js";
import {NewsChannelView} from "../view/NewsChannelView.js";
import {Error} from "../view/Error.js";
import {News} from "../models/News.js";
import config from "../config.js";

export class Controller {
    constructor() {
        this.avalibleChanels = [];
    }

    receiveChannels(channels) {
        let data = [];
        if (channels["sources"]) {
            channels["sources"].map(item => {
                data.push(new Channel(item.id, item.name, item.description))
            })
        }
        this.avalibleChanels = data;
        let randomChannels = [] = data.sort(() => .5 - Math.random()).slice(0, config.numberOfChannels);
        this.getNewsByChanel(randomChannels[0].id);
        NewsChannelView.drawChannelList(randomChannels);
        this.attachChanelEvents();
    }

    receiveNews(posts) {
        let data = [];
        if (posts["articles"]) {
            posts["articles"].map(item => {
                data.push(new News(item.author, item.description, item.publishedAt, item.title, item.url, item.urlToImage));
            })
        }
<<<<<<< HEAD
        let channels = data.slice(0, config.numberOfNews);
=======
    
        this.newsList = data;
        let channels = data.slice(0, numberOfNews);
>>>>>>> 12363fbc1091add8d99950777dd7149118c01a3e
        NewsChannelView.drawNewsList(channels);
    }

    getNewsChannels() {
        NewsService.getChannels()
            .then(this.receiveChannels.bind(this))
            .catch(Error.drawDataError());
    }

    getNewsByChanel(chanel) {
        if(!chanel) return;

        let chn = document.getElementById("currentChanel");
        chn.innerText = chanel;
        NewsService.getNews(chanel)
            .then(this.receiveNews.bind(this))
            .catch(Error.drawDataError());
    }

    attachChanelEvents() {
        document.querySelector("div#channelsBlock").addEventListener('click', this.onChanelSelect.bind(this));
        let btn = document.getElementById("nextChannels");
        btn.addEventListener('click', this.onNextClick.bind(this));
    }

    onNextClick() {
        let el = document.querySelector("#channelsBlock ul");
        el.innerText = "";
        let randomChannels = this.avalibleChanels.sort(() => .5 - Math.random()).slice(0, config.numberOfChannels);
        NewsChannelView.drawChannelList(randomChannels);
        window.scrollTo(0, 0);
    }

    onChanelSelect(event) {
        event.stopPropagation();
        document.querySelector("#newsBlock ul").innerHTML = '';
        this.getNewsByChanel(event.target.id);
    }
}
