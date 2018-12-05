export class Error {
    static instance;

    constructor(element) {
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
        this.page.querySelector("#newsBlock ul").innerHTML = html;
    }
}