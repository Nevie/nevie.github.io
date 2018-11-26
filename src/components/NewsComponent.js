import {Service} from "../services/Service.js";
import {NewsChannelView} from "../view/NewsChannelView.js";
import {appConfig} from "../../config.js";
import {MainTemplateView} from "../view/MainTemplateView";

export class NewsComponent {
    constructor(element) {
        this.page = element;
    }

    init() {
        this.page.insertAdjacentHTML('beforeend', MainTemplateView.getTemplate());
        this.drawNewsChannels();
    }

    async drawNewsChannels() {
        let channels = await Service.getChannels();
        this.attachEventsToChannels(channels);
        await this.drawNewsByChanel(channels[0].id);
    }

    async drawNewsByChanel(chanel) {
        if(!chanel) return;
        let articles = await Service.getNews(chanel);
        this.attachEventsToNews(articles)
    }

    attachEventsToChannels(channels) {
        let chn = this.page.querySelector("#currentChanel");
        chn.innerText = channels[0].name;
        this.page.querySelector("#channelsBlock ul").insertAdjacentHTML('beforeend', NewsChannelView.drawChannelList(channels));
        this.attachEventsToChanel();
    }

    attachEventsToNews(articles) {
        let chn = this.page.querySelector("#currentChanel");
        chn.innerText = articles[0].author;
        this.page.querySelector("#newsBlock ul").insertAdjacentHTML('beforeend', NewsChannelView.drawNewsList(articles));
    }

    attachEventsToChanel() {
        this.page.querySelector("div#channelsBlock").addEventListener('click',() => this.onChanelSelect());
        let btn = document.querySelector("#nextChannels");
        btn.addEventListener('click',() => this.onNextClick());
    }

    onNextClick() {
        let randomChannels = Service.availableChannels.sort(() => .5 - Math.random()).slice(0, appConfig.numberOfChannels);
        this.page.querySelector("#channelsBlock ul").innerHTML = NewsChannelView.drawChannelList(randomChannels);
        window.scrollTo(0, 0);
    }

    onChanelSelect(event) {
        event.stopPropagation();
        this.page.querySelector("#newsBlock ul").innerHTML = '';
        this.drawNewsByChanel(event.target.id).then(()=>{});
    }
}
