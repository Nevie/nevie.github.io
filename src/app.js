class MainComponent extends HTMLElement {
    constructor() {
        super();
        this.addEventListener('click',
            this.loadApp()
        );
    }

    connectedCallback() {
        this.innerHTML = `
        <div id = "showContent" class="btn btn-primary">
           Click me
        </div>
        <div id="content"></div>`
    }

    async loadApp() {
        this.removeEventListener('click',this.loadApp,false);
        const Controller = await import(/* webpackChunkName: "NewsComponent" */ './controller/NewsController.js');
        await import(/* webpackChunkName: "css" */ './styles/style.css');

        document.getElementById("showContent").style.display='none';
        let controllers = new Controller.NewsController(document.getElementById("content"));
        await controllers.init();
    }
}

window.customElements.define('main-component', MainComponent);