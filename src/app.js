class MainComponent extends HTMLElement {
    constructor() {
        super(); // always call super() first in the ctor.
        this.addEventListener('click', () => {
            this.loadApp();
        });
    }

    connectedCallback() {
        this.innerHTML = `
        <div class="btn btn-primary">
           Click me
        </div>
        `
    }

    async loadApp() {
        this.style.display = 'none';
        const {NewsComponent: NewsComponent} = await import(/* webpackChunkName: "NewsComponent" */ './components/NewsComponent.js');
        const {default: css} = await import(/* webpackChunkName: "css" */ './styles/style.css');

        let controllers = new NewsComponent(document.getElementById("content"));
        controllers.init();
    }
}

window.customElements.define('main-component', MainComponent);