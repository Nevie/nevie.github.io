export class Error {
    static instance;

    constructor() {
        if (Error.instance) {
            return Error.instance;
        }
        Error.instance = this;
        return Error.instance;
    }

    drawDataError(error) {
        let html = `<div class="alert alert-danger" id="alertDanger">
                <strong>Fail.</strong>
                ${error}
            </div>`;
        document.querySelector("#newsBlock ul").innerHTML = html;
    }
}