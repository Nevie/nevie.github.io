import {GetDataModel} from "../services/GetDataModel";
import {appConfig} from "../../config";

export class MainTemplate {
    constructor(element){
        this.page = element;
    }

    drawTemplate() {
       let html = `
            <section id="newsApplication">
                <div class="column left">
                     <h2>Channels</h2>
                     <div id="channelsBlock">
                         <ul class="list-group"></ul>
                     </div>
                     <input id="nextChannels" type="button" class="btn btn-info btn-lg" value="Get other channels">
                </div>

                <div class="column right">
                    <h2 id="newsBlockHeader">News from
                          <span id="currentChanel"></span></h2>
                    <div id="newsBlock">
                        <ul class="list-group"></ul>
                    </div>
                </div>
            </section>`;

        this.page.insertAdjacentHTML('beforeend', html);
    }
}