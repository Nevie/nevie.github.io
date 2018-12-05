import {BaseView} from "./BaseView";

export class Error extends BaseView{
    static instance;

    constructor(element) {
        super();
        this.page = element;
        if (Error.instance) {
            return Error.instance;
        }
        Error.instance = this;
        return Error.instance;
    }

    draw(error) {
        let html = `<div class="alert alert-danger" id="alertDanger">
                <strong>Fail.</strong>
                ${error}
            </div>`;
        this.page.querySelector("#error").innerHTML = html;
    }
}