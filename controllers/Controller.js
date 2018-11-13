import {Channel} from "../models/Channel.js";
import {NewsService} from "../services/NewsService.js";
import {NewsChannelView} from "../view/NewsChannelView.js";
import {Error} from "../view/Error.js";
import {News} from "../models/News.js";

const numberOfChannels = 10;
const numberOfNews = 10;

class Controller {
    constructor() {
        this.newsService = new NewsService();
        this.avalibleChanels = [];
        this.newsList = [];
    }

    receiveChannels(channels) {
        let data = [];
        if (channels.sources) {
            channels.sources.forEach(item => {
                data.push(new Channel(item.id, item.name, item.description))
            })
        }
        this.avalibleChanels = data;
        let randomChannels = data.sort(() => .5 - Math.random()).slice(0, numberOfChannels);

        NewsChannelView.drawChannelList(randomChannels);
        this.attachChanelEvents();
    }

    receiveNews(posts) {
        let data = [];
        if (posts.articles) {
            posts.articles.forEach(item => {
                data.push(new News(item.author, item.description, item.publishedAt, item.title, item.url, item.urlToImage));
            })
        }
        debugger
        this.newsList = data;
        let channels = data.slice(0, numberOfNews);
        NewsChannelView.drawNewsList(channels);
    }

    getNewsChannels() {
        let that = this;
        this.newsService.getData('https://newsapi.org/v2/sources?').then((result) => {
            that.receiveChannels(result);
        }).catch(function (error) {
            Error.drawDataError();
        });
    }

    getNewsByChanel(chanel = "mashable") {
        let that = this;
        let chn = document.getElementById("currentChanel");
        chn.innerText= chanel;

        this.newsService.getData('https://newsapi.org/v1/articles?source=' + chanel + '&').then((result) => {
            that.receiveNews(result);
        }).catch(function (error) {
            Error.drawDataError();
        });
    }

    attachChanelEvents() {
        let el = document.querySelectorAll("div#channelsBlock li");
        el.forEach(item => {
            item.addEventListener('click', this.onChanelSelect.bind(this));
        });
        let btn = document.getElementById("nextChannels");
        btn.addEventListener('click', this.onNextClick.bind(this));
    }

    onNextClick() {
        let el = document.getElementById("channelsBlock");
        el.innerText="";
        let randomChannels = this.avalibleChanels.sort(() => .5 - Math.random()).slice(0, numberOfChannels);
        NewsChannelView.drawChannelList(randomChannels);
        this.attachChanelEvents();
        window.scrollTo(0,0);
    }

    onChanelSelect(event) {
        event.stopPropagation();
        document.getElementById("newsBlock").innerHTML = '';
        try {
            this.getNewsByChanel(event.currentTarget.id);
        }
        catch (e) {
            Error.drawDataError();
        }
    }
}

export {Controller as default}
