import {BaseView} from "./BaseView";

export class ChannelView extends BaseView{
    constructor(element){
        super();
        this.page = element;
    }

    draw(data) {
        if (!Array.isArray(data)) {
            return "No data"
        }

        let html = data.reduce((accumulator, item) => {
            accumulator += `<li class="list-group-item">
                    <span>${item.name}</span>
                    <div id="${item.id}">${item.description}</div>
                 </li>`;

            return accumulator
        }, '');

        this.page.querySelector("#channelsBlock ul").innerHTML = html;

        this.attachEventsToChanel();
    }

    attachEventsToChanel() {
        this.page.querySelector("div#channelsBlock").addEventListener('click',($event) =>  this.dispatch('getNewsByChanel',$event.target.id));
        this.page.querySelector("#nextChannels").addEventListener('click',($event) => this.dispatch('onNextClick', $event));
        this.dispatch('scrollTop', {});
    }
}