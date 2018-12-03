import {NewsComponent} from "../components/NewsComponent";

export class ChannelView {
    constructor(element){
        this.page = element;
        this.component = new NewsComponent();
    }

    drawChannels(data, isClear = false) {
        if (!Array.isArray(data)) {
            return "No data"
        }

        let html = ``;
        data.forEach(item => {
            html += `<li class="list-group-item">
                    <span>${item.name}</span>
                    <div id="${item.id}">${item.description}</div>
                 </li>`;


        });
        isClear ?
            this.page.querySelector("#channelsBlock ul").innerHTML = html :
            this.page.querySelector("#channelsBlock ul").insertAdjacentHTML('beforeend', html);

        this.attachEventsToChanel();
    }

    attachEventsToChanel() {
        this.page.querySelector("div#channelsBlock").addEventListener('click',($event) => this.onChanelSelect($event));
        let btn = document.querySelector("#nextChannels");
        btn.addEventListener('click',() => this.component.onNextClick());
    }

    onChanelSelect(event) {
        this.component.getNewsByChanel(event.target.id);
    }
}