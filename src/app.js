class MainComponent extends HTMLElement {
    constructor() {
        super(); // always call super() first in the ctor.
        this.addEventListener('click', () => {
            this.loadApp();
        });
    }

    connectedCallback() {
        this.innerHTML = `
        <div>
           Click me
        </div>
        `
    }

    async loadApp() {
        const {NewsComponent: NewsComponent} = await import(/* webpackChunkName: "NewsComponent" */ './components/NewsComponent.js');
        const {default: css} = await import(/* webpackChunkName: "css" */ './styles/style.css');

        let controllers = new NewsComponent(document.getElementById("content"));
        controllers.init();
    }
}

window.customElements.define('main-component', MainComponent);