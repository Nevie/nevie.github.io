export class MainView {
    constructor(element){
        this.page = element;
    }

    draw() {
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
            </section>
            <div id="error"></div>`;

        this.page.innerHTML = html;
    }
}